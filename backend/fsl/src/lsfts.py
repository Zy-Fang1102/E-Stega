from collections import defaultdict
from traceback import print_tb
from sklearn.utils import shuffle
from transformers import TFBertModel, BertConfig
from sklearn.metrics import precision_recall_fscore_support
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score


import logging
import math
import models
import numpy as np
import os
import sys
import sampler
import tensorflow as tf
import tensorflow.python.keras as K
from sklearn.metrics import confusion_matrix

GLOBAL_SEED = 42
def set_global_seed(seed):
    random.seed(seed)
    np.random.seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    tf.random.set_seed(seed)

set_global_seed(GLOBAL_SEED)
logger.info(f"Global seed set to {GLOBAL_SEED}")

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
physical_devices = tf.config.list_physical_devices('GPU')
if physical_devices:
    for gpu in physical_devices:
        tf.config.experimental.set_memory_growth(gpu, True)
    logger.info(f"Detected {len(physical_devices)} GPU(s). Memory growth enabled.")
else:
    logger.info("No GPU detected. Running on CPU.")

logger = logging.getLogger('LSFTS')

# def create_learning_rate_scheduler(max_learn_rate=5e-5,
#                                    end_learn_rate=1e-7,
#                                    warmup_epoch_count=10,
#                                    total_epoch_count=90):
#
#     def lr_scheduler(epoch):
#         if epoch < warmup_epoch_count:
#             res = (max_learn_rate/warmup_epoch_count) * (epoch + 1)
#         else:
#             res = max_learn_rate*math.exp(math.log(end_learn_rate/max_learn_rate)*(
#                 epoch-warmup_epoch_count+1)/(total_epoch_count-warmup_epoch_count+1))
#         return float(res)
#     learning_rate_scheduler = tf.keras.callbacks.LearningRateScheduler(
#         lr_scheduler, verbose=1)
#
#     return learning_rate_scheduler


def mc_dropout_evaluate(model, gpus, classes, x, T=30, batch_size=64, training=True):

    y_T = np.zeros((T, len(x['input_ids']), classes))
    acc = None

    logger.info("Yielding predictions looping over ...")
    strategy = tf.distribute.MirroredStrategy()
    data = tf.data.Dataset.from_tensor_slices(x).batch(batch_size * gpus)
    dist_data = strategy.distribute_datasets_from_function(lambda _: data)
    # perform T stochastic forward passes for each sample in the large unlabeled pool
    for i in range(T):
        print(i)

        y_pred = []
        with strategy.scope():
            def eval_step(inputs):
                return model(inputs, training=training).logits.numpy()

            def distributed_eval_step(dataset_inputs):
                # return strategy.experimental_run_v2(eval_step, args=(dataset_inputs,))
                return strategy.run(eval_step, args=(dataset_inputs,))

            for batch in dist_data:
                pred = distributed_eval_step(batch)
                for gpu in range(gpus):
                    # y_pred.extend(pred.values[gpu])
                    y_pred.extend(pred)

        # converting logits to probabilities
        y_T[i] = tf.nn.softmax(np.array(y_pred))

    #logger.info (y_T)

    # compute mean
    y_mean = np.mean(y_T, axis=0)
    assert y_mean.shape == (len(x['input_ids']), classes)

    # compute majority prediction
    # aggregation predictions from T passes.
    y_pred = np.array([np.argmax(np.bincount(row))
                      for row in np.transpose(np.argmax(y_T, axis=-1))])
    logger.info("y_pred")
    logger.info(y_pred)
    assert y_pred.shape == (len(x['input_ids']),)

    # compute variance
    y_var = np.var(y_T, axis=0)
    assert y_var.shape == (len(x['input_ids']), classes)

    return y_mean, y_var, y_pred, y_T


def train_model(max_seq_length, X, y, X_test, y_test, X_unlabeled, model_dir, tokenizer, sup_batch_size=4, unsup_batch_size=32, unsup_size=4096, sample_size=16384, TFModel=TFBertModel, Config=BertConfig, pt_teacher_checkpoint='bert-base-uncased', sample_scheme='easy_bald_class_conf', T=30, alpha=0.1, valid_split=0.5, sup_epochs=70, unsup_epochs=25, N_base=10, dense_dropout=0.5, attention_probs_dropout_prob=0.3, hidden_dropout_prob=0.3):
    logger.info("unsup_size {}".format(unsup_size))
    logger.info("sample_size {}".format(sample_size))
    labels = set(y)
    logger.info("Class labels {}".format(labels))

    # split X and y to train and dev with valid_split
    if valid_split > 0:
        train_size = int((1. - valid_split)*len(X["input_ids"]))
        X_train, y_train = {"input_ids": X["input_ids"][:train_size], "token_type_ids": X["token_type_ids"]
                            [:train_size], "attention_mask": X["attention_mask"][:train_size]}, y[:train_size]

        X_dev, y_dev = {"input_ids": X["input_ids"][train_size:], "token_type_ids": X["token_type_ids"]
                        [train_size:], "attention_mask": X["attention_mask"][train_size:]}, y[train_size:]
    else:
        X_train, y_train = X, y
        X_dev, y_dev = X_test, y_test

    logger.info(f"Y Train shape: {y_train.shape}, Sum: {y_train.sum()}")
    logger.info(f"Y Dev shape: {y_dev.shape}, Sum: {y_dev.sum()}")
    logger.info("X Train Shape: {} {}".format(
        X_train["input_ids"].shape, y_train.shape))
    logger.info("X Dev Shape: {} {}".format(
        X_dev["input_ids"].shape, y_dev.shape))
    logger.info("X Test Shape: {} {}".format(
        X_test["input_ids"].shape, y_test.shape))
    logger.info("X Unlabeled Shape: {}".format(X_unlabeled["input_ids"].shape))

    strategy = tf.distribute.MirroredStrategy()

    gpus = strategy.num_replicas_in_sync
    logger.info('Number of devices: {}'.format(gpus))

    # run the base model n times with different initialization to select best base model based on validation loss
    best_base_model = None
    best_validation_loss = np.inf
    bert_acc = []
    bert_f1 = []
    bert_pre = []
    bert_recall = []
    for counter in range(N_base):
        with strategy.scope():
            print(pt_teacher_checkpoint)
            model = models.construct_teacher(TFModel, Config, pt_teacher_checkpoint, max_seq_length, len(
                labels), dense_dropout=dense_dropout, attention_probs_dropout_prob=attention_probs_dropout_prob, hidden_dropout_prob=hidden_dropout_prob)
            model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=3e-5, epsilon=1e-08), loss=tf.keras.losses.SparseCategoricalCrossentropy(
                from_logits=True), metrics=[tf.keras.metrics.SparseCategoricalAccuracy(name="acc")])
            if counter == 0:
                logger.info(model.summary())

        os.makedirs(model_dir, exist_ok=True)
        model_file = os.path.join(model_dir, "model.h5")
        logger.info(f"Model directory verified/created: {model_dir}")
        logger.info("Model file is {}".format(model_file))
        # 如果之前已经完成了循环选择最优模型，那么直接加载最优模型，就不用执行下述操作了
        if os.path.exists(model_file):
            model.load_weights(model_file)
            best_base_model = model
            logger.info(f"Model file loaded from {model_file}. Training will resume.")
            break
        else:
            logger.info(f"No existing model file found at {model_file}. Starting training from scratch.")

        #model.fit(x=X_train, y=y_train, shuffle=True, epochs=sup_epochs, validation_data=(X_dev, y_dev), batch_size=sup_batch_size*gpus, callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_acc', patience=5, restore_best_weights=True)])
        model.fit(x=X_train, y=y_train, shuffle=True, epochs=sup_epochs, validation_data=(X_dev, y_dev), batch_size=sup_batch_size *
                  gpus, callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)])

        val_loss = model.evaluate(X_dev, y_dev)
        logger.info("Validation loss for run {} : {}".format(
            counter, val_loss))
        if val_loss[0] < best_validation_loss:
            best_base_model = model
            best_validation_loss = val_loss[0]
        logger.info("best_validation_loss {}".format(best_validation_loss))
        predictions = (model.predict(X_test, verbose=0)).round()
        y_pred = np.argmax(predictions, axis=1)
        C = confusion_matrix(y_test, y_pred)
        logger.info("confusion_matrix: {}".format(C))
        acc = accuracy_score(y_test, y_pred)
        bert_acc.append(acc)
        logger.info("Test accuracy: {}".format(acc))
        logger.info("Test macro_f1: {}".format(
            f1_score(y_test, y_pred, average="macro")))
        pre = precision_score(y_test, y_pred, pos_label=1)
        bert_pre.append(pre)
        logger.info("Test precision: {}".format(pre))
        recall = recall_score(y_test, y_pred, pos_label=1)
        bert_recall.append(recall)
        logger.info("Test recall: {}".format(recall))
        f1 = f1_score(y_test, y_pred, pos_label=1)
        bert_f1.append(f1)
        logger.info("Test f1 score: {}".format(f1))
    model = best_base_model
    logger.info("Best validation loss for base model {}: {}".format(
        best_validation_loss, model.evaluate(X_dev, y_dev)))

    # 循环后，选择最好的模型
    if not os.path.exists(model_file):
        model.save_weights(model_file)
        logger.info("Model file saved to {}".format(model_file))
    logger.info("Test bert accuracy: {}".format(np.mean(bert_acc)))
    logger.info("Test bert precision: {}".format(np.mean(bert_pre)))
    logger.info("Test bert recall: {}".format(np.mean(bert_recall)))
    logger.info("Test bert f1 score: {}".format(np.mean(bert_f1)))

    best_val_acc = 0.
    best_test_acc = 0.
    max_test_acc = 0.

    for epoch in range(25):

        logger.info("Starting loop {}".format(epoch))

        test_acc = model.evaluate(X_test, y_test, verbose=0)[-1]
        logger.info(model.evaluate(X_test, y_test))
        predictions = (model.predict(X_test, verbose=0)).round()

        y_pred = np.argmax(predictions, axis=1)

        accuracy = accuracy_score(y_test, y_pred)
        precision, recall, f1 = precision_recall_fscore_support(
            y_test, y_pred, average='macro')[:-1]
        C = confusion_matrix(y_test, y_pred)
        print("accuracy: ", accuracy)
        print("precision: ", precision)
        print("recall: ", recall)
        print("f1: ", f1)
        logger.info("macro accuracy:{}".format(accuracy))
        logger.info("macro precision:{}".format(precision))
        logger.info("macro recall:{}".format(recall))
        logger.info("macro f1:{}".format(f1))

        logger.info("confusion_matrix: {}".format(C))
        logger.info("Test accuracy: {}".format(accuracy_score(y_test, y_pred)))
        logger.info("Test macro_f1: {}".format(
            f1_score(y_test, y_pred, average="macro")))
        logger.info("Test precision: {}".format(
            precision_score(y_test, y_pred, pos_label=1)))
        logger.info("Test recall: {}".format(
            recall_score(y_test, y_pred, pos_label=1)))
        logger.info("Test f1 score: {}".format(
            f1_score(y_test, y_pred, pos_label=1)))

        val_acc = model.evaluate(X_dev, y_dev, verbose=0)[-1]
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            best_test_acc = test_acc
        if test_acc > max_test_acc:
            max_test_acc = test_acc

        logger.info("Test acc {}".format(test_acc))

        model_file = os.path.join(
            model_dir, "model_{}_{}.h5".format(epoch, sample_scheme))

        if os.path.exists(model_file):
            model.load_weights(model_file)
            logger.info("Model file loaded from {}".format(model_file))
            continue

        # compute confidence on the unlabeled set
        if sample_size < len(X_unlabeled["input_ids"]):
            logger.info("Evaluating uncertainty on {} number of instances sampled from {} unlabeled instances".format(
                sample_size, len(X_unlabeled["input_ids"])))
            indices = np.random.choice(
                len(X_unlabeled["input_ids"]), sample_size, replace=False)
            X_unlabeled_sample = {'input_ids': X_unlabeled["input_ids"][indices], 'token_type_ids': X_unlabeled[
                "token_type_ids"][indices], 'attention_mask': X_unlabeled["attention_mask"][indices]}
        else:
            logger.info("Evaluating uncertainty on {} number of instances".format(
                len(X_unlabeled["input_ids"])))
            X_unlabeled_sample = X_unlabeled

        logger.info(X_unlabeled_sample["input_ids"][:5])

        if 'uni' in sample_scheme:
            y_mean, y_var, y_T = None, None, None
        elif 'bald' in sample_scheme:  # using BALD  len(labels)是类别数
            y_mean, y_var, y_pred, y_T = mc_dropout_evaluate(
                model, gpus, len(labels), X_unlabeled_sample, T=T)
        else:
            logger.info(
                "Error in specifying sample_scheme: One of the 'uni' or 'bald' schemes need to be specified")
            sys.exit(1)

        if 'soft' not in sample_scheme:
            y_pred = model.predict(X_unlabeled_sample, batch_size=64)
            y_pred = np.argmax(y_pred, axis=-1).flatten()

        # sample from unlabeled set
        if 'conf' in sample_scheme:
            conf = True
        else:
            conf = False

        if 'bald' in sample_scheme and 'eas' in sample_scheme:
            f_ = sampler.sample_by_bald_easiness

        if 'bald' in sample_scheme and 'eas' in sample_scheme and 'clas' in sample_scheme:
            f_ = sampler.sample_by_bald_class_easiness

       
        X_batch, y_batch, X_conf = f_(
            tokenizer, X_unlabeled_sample, y_mean, y_var, y_pred, unsup_size, len(labels), y_T=y_T)
            
        if not conf:
            logger.info("Not using confidence learning.")
            X_conf = np.ones(len(X_batch['input_ids']))
            logger.info("Weights ".format(X_conf[:10]))
        else:
            logger.info("Using confidence learning ".format(X_conf[:10]))
            X_conf = -np.log(X_conf+1e-10)*alpha
            logger.info("Weights ".format(X_conf[:10]))

        #model.fit(x=X_batch, y=y_batch, shuffle=True, epochs=unsup_epochs, validation_data=(X_dev, y_dev), batch_size=unsup_batch_size*gpus, sample_weight=X_conf, callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_acc', patience=5, restore_best_weights=True)])
        model.fit(x=X_batch, y=y_batch, shuffle=True, epochs=unsup_epochs, validation_data=(X_dev, y_dev), batch_size=unsup_batch_size*gpus,
                  sample_weight=X_conf, callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)])

        if not os.path.exists(model_file):
            model.save_weights(model_file)
            logger.info("Model file saved to {}".format(model_file))

    logger.info(
        "Test accuracy based on best validation loss {}".format(best_test_acc))
    logger.info(
        "Best test accuracy across all self-training iterations {}".format(max_test_acc))

    #model.load_weights(os.path.join(
     #       model_dir, "model_24_easy_bald_class_conf.h5"))

    #testString = "ddddd"
    #print(model(testString, training=True).numpy())
import numpy as np
import os
import random
import tensorflow as tf
from tensorflow.python.keras.layers import Input, Dropout, Dense
from tensorflow.python.keras.models import Model

# 总的来说，这个函数的目的是构建一个用于分类任务的神经网络模型，该模型基于一个预训练的Transformer模型，
# 并通过添加Dropout和全连接层来进行微调。这样的模型可以用于各种NLP任务，如情感分析、文本分类等。
def construct_teacher(TFModel, Config, pt_teacher_checkpoint, max_seq_length, classes, dense_dropout=0.5, attention_probs_dropout_prob=0.2, hidden_dropout_prob=0.2):
    print(Config,pt_teacher_checkpoint)
    config = Config.from_pretrained(pt_teacher_checkpoint, num_labels=classes)
    config.attention_probs_dropout_prob = attention_probs_dropout_prob
    config.hidden_dropout_prob = hidden_dropout_prob
    print(TFModel)
    print(config)
    encoder = TFModel.from_pretrained(pt_teacher_checkpoint, from_pt=True, config=config,name="teacher")

    input_ids = Input(shape=(max_seq_length,), dtype=tf.int32, name="input_ids")
    attention_mask = Input(shape=(max_seq_length,), dtype=tf.int32, name="attention_mask")
    token_type_ids = Input(shape=(max_seq_length,), dtype=tf.int32, name="token_type_ids")

    # input_ids1= Input(shape=(max_seq_length,), dtype=tf.int32, name="input_ids")
    # attention_mask1 = Input(shape=(max_seq_length,), dtype=tf.int32, name="attention_mask")
    # token_type_ids1 = Input(shape=(max_seq_length,), dtype=tf.int32, name="token_type_ids")

    output = encoder(input_ids, token_type_ids=token_type_ids,  attention_mask=attention_mask)
    output = Dropout(dense_dropout)(output[0][:,0])
    output = Dense(classes, kernel_initializer=tf.keras.initializers.TruncatedNormal(stddev=config.initializer_range))(output)
    model = tf.keras.Model(inputs=[input_ids, token_type_ids, attention_mask], outputs=output)
    return model


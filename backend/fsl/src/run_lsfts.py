import logging
from preprocessing import generate_sequence_data#, generate_sequence_unlabededdata
from lsfts import train_model
from transformers import AutoTokenizer
import argparse

import numpy as np
import os
import random
import sys
from transformers import TFBertModel, BertConfig, BertTokenizer
from sklearn.utils import shuffle
import faulthandler
faulthandler.enable()

PRETRAINED_VOCAB_ARCHIVE_MAP = {
    'bert-base-uncased': "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-uncased-vocab.txt",
    'bert-large-uncased': "https://s3.amazonaws.com/models.huggingface.co/bert/bert-large-uncased-vocab.txt",
    'bert-base-cased': "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-cased-vocab.txt",
    'bert-large-cased': "https://s3.amazonaws.com/models.huggingface.co/bert/bert-large-cased-vocab.txt",
    'bert-base-multilingual-uncased': "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-multilingual-uncased-vocab.txt",
    'bert-base-multilingual-cased': "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-multilingual-cased-vocab.txt",
    'bert-base-chinese': "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-chinese-vocab.txt",
}


# logging
print(os.getenv("PYTHONHASHSEED"))
logger = logging.getLogger('LSFTS')
# logging.basicConfig(level = logging.INFO)
logging.basicConfig(level=logging.DEBUG,  # 控制台打印的日志级别
                    filename='news_328/output_news_ac_n_base5——valloss15Nbase5.log',
                    filemode='w',  # 模式，有w和a，w就是写模式，每次都会重新写日志，覆盖之前的日志
                    # a是追加模式，默认如果不写的话，就是追加模式
                    format='%(asctime)s - %(pathname)s[line:%(lineno)d] - %(levelname)s: %(message)s'
                    # 日志格式
                    )
GLOBAL_SEED = 42
#GLOBAL_SEED = int(os.getenv("PYTHONHASHSEED"))

logger.info("Global seed {}".format(GLOBAL_SEED))


if __name__ == '__main__':

    # construct the argument parse and parse the arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("--task", required=True,
                        help="path of the task directory containing train, test and unlabeled data files")   # 数据集文件夹路径
    parser.add_argument("--model_dir", required=True,
                        help="path to store model files")   # 模型文件夹路径
    parser.add_argument("--seq_len", required=True,
                        type=int, help="sequence length")   # 序列长度

    parser.add_argument("--sup_batch_size", nargs="?", type=int, default=4,
                        help="batch size for fine-tuning base model")   # 微调基础模型用到的batch size
    parser.add_argument("--unsup_batch_size", nargs="?", type=int, default=32,
                        help="batch size for self-training on pseudo-labeled data")   # 伪标签数据用于自训练的batch size

    parser.add_argument("--sample_size", nargs="?", type=int, default=4096,
                        help="number of unlabeled samples for evaluating uncetainty on in each self-training iteration")    # 每次自训练迭代中用于评估不确定性的无标签样本数
    parser.add_argument("--unsup_size", nargs="?", type=int, default=1024,
                        help="number of pseudo-labeled instances drawn from sample_size and used in each self-training iteration")   # 在每次自训练迭代中从sample_size中抽取的伪标签实例数

    parser.add_argument("--sample_scheme", nargs="?",
                        default="easy_bald_class_conf", help="Sampling scheme to use")   # 使用的采样方案

    parser.add_argument("--sup_labels", nargs="?", type=int, default=150,
                        help="number of labeled samples per class for training and validation (total)")   # 用于训练和验证的每个类别的有标记样本总数
    parser.add_argument("--T", nargs="?", type=int, default=30,
                        help="number of masked models for uncertainty estimation")   # 用于不确定性估计的掩码模型数（也就是MC Dropout的次数）
    parser.add_argument("--alpha", nargs="?", type=float, default=0.1,
                        help="hyper-parameter for confident training loss")   # 置信训练损失的超参数
    parser.add_argument("--valid_split", nargs="?", type=float, default=0.5,
                        help="percentage of sup_labels to use for validation for each class")   # 在每个类别中用于验证的占sup_labels的比重

    parser.add_argument("--sup_epochs", nargs="?", type=int, default=100,
                        help="number of epochs for fine-tuning base model")   # 微调基础模型的轮数
    parser.add_argument("--unsup_epochs", nargs="?", type=int,
                        default=25, help="number of self-training iterations")   # 自训练迭代轮数
    parser.add_argument("--N_base", nargs="?", type=int, default=5,
                        help="number of times to randomly initialize and fine-tune few-shot base encoder to select the best starting configuration")   # 随机初始化并微调少样本基础编码器以选择最佳起始配置所用到的次数

    parser.add_argument("--pt_teacher", nargs="?",
                        default="TFBertModel", help="Pre-trained teacher model")   # 预训练教师模型
    parser.add_argument("--pt_teacher_checkpoint", nargs="?", default="bert-base-uncased",
                        help="teacher model checkpoint to load pre-trained weights")   # 用于加载预训练权重的教师模型检查点
    parser.add_argument("--do_pairwise", action="store_true", default=False,
                        help="whether to perform pairwise classification tasks like MNLI")   # 是否执行成对分类任务，如MNLI
    parser.add_argument("--hidden_dropout_prob", nargs="?", type=float, default=0.2,
                        help="dropout probability for hidden layer of teacher model")   # 教师模型隐藏层中的dropout比重
    parser.add_argument("--attention_probs_dropout_prob", nargs="?", type=float, default=0.2,
                        help="dropout probability for attention layer of teacher model")   # 教师模型注意力层中的dropout比重
    parser.add_argument("--dense_dropout", nargs="?", type=float, default=0.5,
                        help="dropout probability for final layers of teacher model")   # 教师模型最终层的dropout比重

    args = vars(parser.parse_args())
    logger.info(args)

    task_name = args["task"]
    max_seq_length = args["seq_len"]
    sup_batch_size = args["sup_batch_size"]
    unsup_batch_size = args["unsup_batch_size"]
    unsup_size = args["unsup_size"]
    sample_size = args["sample_size"]
    model_dir = args["model_dir"]
    sample_scheme = args["sample_scheme"]
    sup_labels = args["sup_labels"]
    T = args["T"]
    alpha = args["alpha"]
    valid_split = args["valid_split"]
    sup_epochs = args["sup_epochs"]
    unsup_epochs = args["unsup_epochs"]
    N_base = args["N_base"]
    pt_teacher = args["pt_teacher"]
    pt_teacher_checkpoint = args["pt_teacher_checkpoint"]
    do_pairwise = args["do_pairwise"]
    dense_dropout = args["dense_dropout"]
    attention_probs_dropout_prob = args["attention_probs_dropout_prob"]
    hidden_dropout_prob = args["hidden_dropout_prob"]

    
    tokenizer = BertTokenizer.from_pretrained(
        "bert-base-uncased")
    X_train_all, y_train_all = generate_sequence_data(max_seq_length, task_name + "/IMDB+AC/train.csv", tokenizer,
                                                      do_pairwise=do_pairwise)

    X_test, y_test = generate_sequence_data(
        max_seq_length, task_name + "/IMDB+AC/test.csv", tokenizer, do_pairwise=do_pairwise)
    X_unlabeled, _ = generate_sequence_data(
        max_seq_length, task_name + "/IMDB+AC/transfer.csv", tokenizer, unlabeled=True, do_pairwise=do_pairwise)

    logger.info(X_train_all["input_ids"].shape)
    logger.info(y_train_all.shape)
    for i in range(3):
        logger.info("***Train***")
        logger.info("Example {}".format(i))
        logger.info("Token ids {}".format(X_train_all["input_ids"][i]))
        logger.info(tokenizer.convert_ids_to_tokens(
            X_train_all["input_ids"][i]))
        logger.info("Token type ids {}".format(X_train_all["token_type_ids"][i]))
        logger.info("Token mask {}".format(X_train_all["attention_mask"][i]))
        logger.info("Label {}".format(y_train_all[i]))

    for i in range(3):
        logger.info("***Test***")
        logger.info("Example {}".format(i))
        logger.info("Token ids {}".format(X_test["input_ids"][i]))
        logger.info(tokenizer.convert_ids_to_tokens(X_test["input_ids"][i]))
        logger.info ("Token type ids {}".format(X_test["token_type_ids"][i]))
        logger.info("Token mask {}".format(X_test["attention_mask"][i]))
        logger.info("Label {}".format(y_test[i]))

    for i in range(3):
        logger.info("***Unlabeled***")
        logger.info("Example {}".format(i))
        logger.info("Token ids {}".format(X_unlabeled["input_ids"][i]))
        logger.info(tokenizer.convert_ids_to_tokens(
            X_unlabeled["input_ids"][i]))
        logger.info ("Token type ids {}".format(X_unlabeled["token_type_ids"][i]))
        logger.info("Token mask {}".format(X_unlabeled["attention_mask"][i]))

    # labels indexed from 0 （其实有点小问题，因为不能一定保证标签从0开始，但在本项目中无伤大雅）
    labels = set(y_train_all)
    if 0 not in labels:
        y_train_all -= 1
        y_test -= 1
    labels = set(y_train_all)
    logger.info("Labels {}".format(labels))

    # if sup_labels < 0, then use all training labels in train file for learning
    if sup_labels < 0:
        X_train = X_train_all
        y_train = y_train_all
    else:
        X_input_ids, X_token_type_ids, X_attention_mask, y_train = [], [], [], []
        for i in labels:
            # get sup_labels from each class
            indx = np.where(y_train_all == i)[0]
            random.Random(GLOBAL_SEED).shuffle(indx)
            indx = indx[:sup_labels]
            X_input_ids.extend(X_train_all["input_ids"][indx])
            X_token_type_ids.extend(X_train_all["token_type_ids"][indx])
            X_attention_mask.extend(X_train_all["attention_mask"][indx])
            y_train.extend(np.full(sup_labels, i))

    X_input_ids, X_token_type_ids, X_attention_mask, y_train = shuffle(X_input_ids, X_token_type_ids, X_attention_mask,
                                                                       y_train, random_state=GLOBAL_SEED)

    X_train = {"input_ids": np.array(X_input_ids), "token_type_ids": np.array(X_token_type_ids),
               "attention_mask": np.array(X_attention_mask)}
    y_train = np.array(y_train)

    train_model(max_seq_length, X_train, y_train, X_test, y_test, X_unlabeled, model_dir, tokenizer,
                sup_batch_size=sup_batch_size, unsup_batch_size=unsup_batch_size, unsup_size=unsup_size,
                sample_size=sample_size, TFModel=TFBertModel, Config=BertConfig, pt_teacher_checkpoint=pt_teacher_checkpoint,
                sample_scheme=sample_scheme, T=T, alpha=alpha, valid_split=valid_split, sup_epochs=sup_epochs,
                unsup_epochs=unsup_epochs, N_base=N_base, dense_dropout=dense_dropout,
                attention_probs_dropout_prob=attention_probs_dropout_prob, hidden_dropout_prob=hidden_dropout_prob)
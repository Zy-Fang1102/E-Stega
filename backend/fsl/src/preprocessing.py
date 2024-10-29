from collections import defaultdict

import csv
import logging
import numpy as np
import six
import tensorflow as tf


logger = logging.getLogger('LSFTS')

def convert_to_unicode(text):
  """Converts `text` to Unicode (if it's not already), assuming utf-8 input."""
  if six.PY3:
    if isinstance(text, str):
      return text
    elif isinstance(text, bytes):
      return text.decode("utf-8", "ignore")
    else:
      raise ValueError("Unsupported string type: %s" % (type(text)))
  elif six.PY2:
    if isinstance(text, str):
        return text.decode("utf-8", "ignore")
    elif isinstance(text, unicode):  # noqa: F821 - Python 3中不存在unicode
        return text
    else:
      raise ValueError("Unsupported string type: %s" % (type(text)))
  else:
    raise ValueError("Not running on Python2 or Python 3?")


def generate_sequence_data(MAX_SEQUENCE_LENGTH, input_file, tokenizer, unlabeled=False, do_pairwise=False):

    X1 = []
    X2 = []
    y = []

    label_count = defaultdict(int)
    if not tf.io.gfile.exists(input_file):
        logger.error(f"Input file not found: {input_file}")
        raise FileNotFoundError(f"Input file '{input_file}' does not exist.")

    with tf.io.gfile.GFile(input_file, "r") as f:
      reader=csv.DictReader(f)
      for line in reader:
  
      #reader = csv.reader(f, delimiter="\t", quotechar="|")
      #for line in reader:
       # print(line)
        #print(line[0])
        #print(line[0][1])
        if len(line) == 0:
            logger.warning("Encountered an empty line in the input file. Skipping.")
            continue
        X1.append(convert_to_unicode(line["sentence"]))
        if do_pairwise:
          X2.append(convert_to_unicode(line[1]))
        if not unlabeled:
            if do_pairwise:
              label = int(convert_to_unicode(line[2]))
            else:
              try:
                  label = int(convert_to_unicode(line["label"]))
              except ValueError as e:
                  logger.error(f"Failed to convert label '{line['label']}' to integer: {e}")
                  continue
            y.append(label)
            label_count[label] += 1
        else:
            y.append(-1)
            #label = line["from"]
            #y.append(label)


    if do_pairwise:
      X =  tokenizer(X1, X2, padding=True, truncation=True, max_length = MAX_SEQUENCE_LENGTH)
    else:
      X =  tokenizer(X1, padding=True, truncation=True, max_length = MAX_SEQUENCE_LENGTH)


    total_samples = sum(label_count.values())
    for key, count in label_count.items():
        logger.info(f"Count of instances with label {key}: {count}")
    logger.info(f"Total number of samples processed: {total_samples}")

    #logger.info ("X[token_type_ids]{}".format(X["token_type_ids"]))
    if "token_type_ids" not in X:
        token_type_ids = np.zeros_like(X["input_ids"], dtype=np.int32)
        logger.info("token_type_ids not found in tokenizer output. Initialized to zeros.")
        logger.info ("token_type_ids  is {}".format(token_type_ids.shape))
    else:
        token_type_ids = np.array(X["token_type_ids"])
        logger.info ("token_type_ids  is {}".format(token_type_ids.shape))
  


    return {"input_ids": np.array(X["input_ids"]), "token_type_ids": token_type_ids, "attention_mask": np.array(X["attention_mask"])}, np.array(y)




# def generate_sequence_unlabededdata(MAX_SEQUENCE_LENGTH, input_file, tokenizer, unlabeled=False, do_pairwise=False):
#
#     X1 = []
#     X2 = []
#     y = []
#     y_unlabeled=[]
#
#     label_count = defaultdict(int)
#     with tf.io.gfile.GFile(input_file, "r") as f:
#       reader=csv.DictReader(f)
#       for line in reader:
#
#       #reader = csv.reader(f, delimiter="\t", quotechar="|")
#       #for line in reader:
#        # print(line)
#         #print(line[0])
#         #print(line[0][1])
#         if len(line) == 0:
#           continue
#         X1.append(convert_to_unicode(line["sentence"]))
#         if do_pairwise:
#           X2.append(convert_to_unicode(line[1]))
#         if not unlabeled:
#             if do_pairwise:
#               label = int(convert_to_unicode(line[2]))
#             else:
#               label = int(convert_to_unicode(line["label"]))
#             y.append(label)
#             label_count[label] += 1
#         else:
#             #y.append(-1)
#             dataset = line["from"]
#             y.append(dataset)
#             label = int(convert_to_unicode(line["label"]))
#             y_unlabeled.append(label)
#
#
#
#     if do_pairwise:
#       X =  tokenizer(X1, X2, padding=True, truncation=True, max_length = MAX_SEQUENCE_LENGTH)
#     else:
#       X =  tokenizer(X1, padding=True, truncation=True, max_length = MAX_SEQUENCE_LENGTH)
#
#     for key in label_count.keys():
#         logger.info ("Count of instances with label {} is {}".format(key, label_count[key]))
#
#     #logger.info ("X[token_type_ids]{}".format(X["token_type_ids"]))
#     if "token_type_ids" not in X:
#         token_type_ids = np.zeros((len(X["input_ids"]), MAX_SEQUENCE_LENGTH))
#         logger.info ("token_type_ids  is {}".format(token_type_ids.shape))
#     else:
#         token_type_ids = np.array(X["token_type_ids"])
#         logger.info ("token_type_ids  is {}".format(token_type_ids.shape))
#
#
#
#     return {"input_ids": np.array(X["input_ids"]), "token_type_ids": token_type_ids, "attention_mask": np.array(X["attention_mask"])},np.array(y_unlabeled) ,np.array(y)


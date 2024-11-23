# #### 三、案例步骤：
# #### 1 加载数据集
# #### 2 构建BERT的输入语料格式
# #### 3 获取BERT的分词器 tokenizer进行分词和转换
# #### 4 数据集进行分离：train 和 eval
# #### 5 数据类型转换，全部转换为 tensor
# #### 6 数据打包，便于进行批量训练
# #### 7 模型训练
# #### 8 模型测试


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import io
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.sequence import pad_sequences

import torch
from torch.utils.data import DataLoader, TensorDataset, RandomSampler, SequentialSampler
from torch.optim.lr_scheduler import ExponentialLR

from transformers import BertTokenizer, BertConfig, BertModel
from transformers import AdamW, BertForSequenceClassification, get_linear_schedule_with_warmup

from tqdm import tqdm, trange

import warnings
warnings.filterwarnings("ignore")


# # 检查本机GPU是否可用
# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# # gpu的数量
# gpu_num = torch.cuda.device_count()
# # GPU型号
# torch.cuda.get_device_name()

# 选择第三块GPU
torch.cuda.set_device(3)
device = 'cuda:3'


# ### 1 加载数据集
# 读取数据
df = pd.read_csv("train.tsv", delimiter='\t', header=None, names=['label', 'sentence'])
df.head()
df['label'].value_counts()


# ### 2 构建BERT的输入语料格式
# 语料
sentences = df.sentence.values
# BERT的输入语料格式： [CLS] + sentence + [SEP]
sentences = ["[CLS] " + sen + " [SEP]" for sen in sentences]
# 标签
labels = df.label.values


# ### 3 获取BERT的分词器 tokenizer进行分词和转换
# 1 从 hugging face 获取预训练分词模型
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased", do_lower_case=True) # 全部转换为小写
# 2 对语料进行分词
sentence_tokens = [tokenizer.tokenize(sen) for sen in sentences]
print(sentence_tokens[0])
# 3 将token转换为id，并固定每个语句的长度
max_len = 128
sentence_ids = [tokenizer.convert_tokens_to_ids(sen) for sen in sentence_tokens]
print(sentence_ids[0])
# 4 将所有语句的长度固定到 max_len
sentence_ids = pad_sequences(sentence_ids, maxlen=max_len, dtype='long', truncating='post', padding='post')
print(sentence_ids[0])
# 5 根据 sentence_ids 创建 attention mask
attention_mask = [[1 if id > 0 else 0 for id in sen] for sen in sentence_ids]
print(attention_mask[0])


''' 以上5步，可以用一句话实现，如下：

temp_ids = tokenizer(sentences, padding=True, truncation=True, max_length=max_len, return_tensors='pt')
# API链接：https://huggingface.co/transformers/v4.7.0/main_classes/tokenizer.html#transformers.PreTrainedTokenizer.__call__


print(temp_ids.keys())
# dict_keys(['input_ids', 'token_type_ids', 'attention_mask'])

print(temp_ids["input_ids"][0])

print(temp_ids['token_type_ids'][0])

print(temp_ids['attention_mask'][0])
'''


# ### 4 数据集进行分离：train 和 eval
X_train, X_eval, y_train, y_eval = train_test_split(sentence_ids, labels, test_size=0.2, random_state=666)
train_masks, eval_masks, _, _ = train_test_split(attention_mask, sentence_ids, test_size=0.2, random_state=666)
type(X_train)
type(train_masks)


# ### 5 数据类型转换，全部转换为 tensor
X_train = torch.tensor(X_train)
X_eval = torch.tensor(X_eval)
y_train = torch.tensor(y_train)
y_eval = torch.tensor(y_eval)
train_masks = torch.tensor(train_masks)
eval_masks = torch.tensor(eval_masks)


# ### 6 数据打包，便于进行批量训练
batch_size = 128
# 1 训练集
# 数据打包
train_dataset = TensorDataset(X_train, train_masks, y_train)
# 一批一批地读取
train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
#2 验证集
# 数据打包
eval_dataset = TensorDataset(X_eval, eval_masks, y_eval)
# 一批一批地读取
eval_dataloader = DataLoader(eval_dataset, batch_size=batch_size, shuffle=True)
sentences = df.sentence.values # 语句
labels = df.label.values # 语句


# ### 7 模型训练
# 支持多GPU训练
model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)
if torch.cuda.device_count() > 1:
    model = torch.nn.DataParallel(model)  # 包装为 DataParallel 模型
model.to(device)
params = list(model.named_parameters())
# 训练轮次
EPOCHS = 10
# 优化器
optimizer = AdamW(model.parameters(), lr=2e-5, eps=1e-8)
# 学习率
scheduler = get_linear_schedule_with_warmup(optimizer, 
                                            num_warmup_steps=0, 
                                            num_training_steps=len(train_dataloader)*EPOCHS)

# 计算 真值labels 与 预测值preds 的 accuracy
def accuracy(labels, preds):
    preds = np.argmax(preds, axis=1).flatten()  # shape = (1, :)
    labels = labels.flatten()
    if len(preds) != len(labels):  # 增加数据长度一致性检查
        logging.warning("Mismatch in predictions and labels length.")
        return 0.0
    acc = np.sum(preds == labels) / len(preds)  # 准确率
    return acc

train_loss = []
for i in tqdm(range(EPOCHS), desc='Epoch'):
    
    model.train()
    
    tr_loss = 0
    tr_examples = 0
    tr_steps = 0
    
    for i, batch_data in enumerate(train_dataloader):
        # 一批一批的读取数据
        batch_data = tuple(data.to(device) for data in batch_data) # 部署到gpu
        # 解析
        inputs_ids, inputs_masks, inputs_labels = batch_data
        # 梯度置零
        optimizer.zero_grad()
        # 前向传播
        outputs = model(inputs_ids, token_type_ids=None, attention_mask=inputs_masks, labels=inputs_labels)
        #print("keys : ", outputs.keys())  # ['loss', 'logits']
        # 获取loss
        loss = outputs['loss']
        # 保存loss
        train_loss.append(loss.item())
        # 累计loss
        tr_loss += loss.item()
        # 累计样本量
        tr_examples += inputs_ids.size(0)
        # 多少批次
        tr_steps += 1
        # 反向传播
        loss.backward()
        # 梯度裁剪，防止梯度爆炸
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        # 更新参数
        optimizer.step()
        # 更新学习率
        scheduler.step()
        
    
    logging.info(f"Epoch {i + 1}/{EPOCHS} - Training Loss: {tr_loss / tr_steps}")
    
    
    # 模型验证
    model.eval()
    eval_acc = 0.0, 0.0
    eval_steps, eval_examples = 0.0, 0.0
    
    for batch in eval_dataloader:
        # 部署到GPU
        batch = tuple(data.to(device) for data in batch)  # 修正为 batch
        # 解析
        inputs_ids, inputs_masks, inputs_labels = batch
        # 验证阶段不需要计算梯度
        with torch.no_grad():
            preds = model(inputs_ids, token_type_ids=None, attention_mask=inputs_masks)
        # 将 preds 和 labels 部署到cpu计算
        preds = preds['logits'].detach().to('cpu').numpy() # 将preds从计算图剥离，不计算梯度
        labels = inputs_labels.to('cpu').numpy()
        # 计算 accuracy
        from sklearn.metrics import confusion_matrix
        import seaborn as sns

        # 在计算验证准确率后加入混淆矩阵绘制
        eval_acc += accuracy(labels, preds)
        cm = confusion_matrix(labels, np.argmax(preds, axis=1))  # 计算混淆矩阵
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
        plt.title("Confusion Matrix")
        plt.xlabel("Predicted Labels")
        plt.ylabel("True Labels")
        plt.show()
        
        eval_steps += 1
    
    print("Eval Accuracy : {}".format(eval_acc / eval_steps))
    
    print("\n\n")

# # 可视化 train loss
# plt.figure(figsize=(12,10))
# plt.title("Training Loss")
# plt.xlabel("Batch")
# plt.ylabel("Loss")
# plt.plot(train_loss)
# plt.show()


# ### 8 模型测试
# 加载测试集
df = pd.read_csv("test.tsv", delimiter='\t', header=None, names=['label', 'sentence'])
df.head()

sentences = df.sentence.values # 语句
labels = df.label.values # 语句

# 构造输入格式
sentences = ["[CLS] " + sen + " [SEP]" for sen in sentences]
# 分词
sentences_tokens = [tokenizer.tokenize(sen) for sen in sentences]
# token --> id
sentence_ids = [tokenizer.convert_tokens_to_ids(sen) for sen in sentences_tokens]
encoded_data = tokenizer(sentences, padding="max_length", truncation=True, max_length=max_len, return_tensors="pt")
sentence_ids = encoded_data["input_ids"]
attention_mask = encoded_data["attention_mask"]
print(attention_mask[0])
# 数据类型转换，全部转换为 tensor
sentence_ids = torch.tensor(sentence_ids)
attention_mask = torch.tensor(attention_mask)
labels = torch.tensor(labels)
# 数据打包
# Create a new labels tensor with the same number of samples as sentence_ids and attention_mask
test_dataset = TensorDataset(sentence_ids, attention_mask, labels)
# 一批一批地读取数据
test_dataloader = DataLoader(test_dataset, batch_size, shuffle=True)

# 模型测试
model.eval()

test_loss, test_acc = 0.0, 0.0
steps = 0
num = 0

for batch in test_dataloader:
    # 部署到 GPU
    batch = tuple(data.to(device) for data in batch)
    # 数据解包
    inputs_ids, inputs_masks, inputs_labels = batch
    # 验证阶段不需要计算梯度
    with torch.no_grad():
        preds = model(inputs_ids, token_type_ids=None, attention_mask=inputs_masks) # 模型预测
    # 将preds从计算图剥离，不计算梯度
    preds = preds['logits'].detach().to('cpu').numpy()
    inputs_labels = inputs_labels.to('cpu').numpy()
    # 计算 acc
    acc = accuracy(inputs_labels, preds)
    # 累计 acc
    test_acc += acc
    # 累计轮次
    steps += 1
    # 累计 test 样本数量
    num += len(inputs_ids)
    
print("steps = ", steps)
print("test number = ", num)
print("test acc : {}".format(test_acc / steps))
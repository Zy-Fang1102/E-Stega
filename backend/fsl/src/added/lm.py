import torch
import torch.nn as nn
from transformers import PreTrainedModel,GPT2PreTrainedModel


class LM(GPT2PreTrainedModel):
	def __init__(self, config, cell, my_vocab_size, embed_size, hidden_dim, num_layers, dropout_rates):
		super().__init__(config)
		self._cell = cell
		self.vocab_size = my_vocab_size
		self.embedding = nn.Embedding(my_vocab_size, embed_size)
		if cell == 'rnn':
			self.rnn = nn.RNN(embed_size, hidden_dim, num_layers, dropout=dropout_rates)

		elif cell == 'lstm':
			self.rnn = nn.LSTM(embed_size, hidden_dim, num_layers, dropout=dropout_rates)
		else:
			raise Exception('no such rnn cell')

		self.output_layer = nn.Linear(hidden_dim, my_vocab_size)
		self.log_softmax = nn.LogSoftmax(dim=2)
		self.criteration = nn.NLLLoss()
		# self.init_weights()

	def forward(self, input_ids, attention_mask=None, labels=None, is_training=True):
		# 将输入转换为长整型
		input_ids = input_ids.long()

		# 通过嵌入层进行处理
		embeddings = self.embedding(input_ids)
		embeddings = embeddings.permute(1, 0, 2)  # 调整维度顺序以适配 RNN 的输入

		# 训练模式下，计算损失并返回 logits 和损失
		if is_training:
			loss = self.criteration(logits.view(-1, self.vocab_size), labels.view(-1))
			return logits, loss

		# 推理模式下，仅返回 logits
		return logits

	def sample(self, input_ids, attention_mask=None, labels=None):
		# 获取模型的 log 概率输出（推理模式）
		log_prob = self.forward(input_ids, is_training=False)
		
		# 计算最后一个时间步的概率分布
		prob = torch.exp(log_prob)[:, -1, :]  # shape: [batch_size, vocab_size]
		
		# 按概率从高到低排序
		p, indices = prob.sort(descending=True)
		self.p = p  # 保存排序后的概率以供调试或分析

		# 设置特殊处理：将索引 1 的概率置为 0（可根据实际需求调整）
		prob[:, 1] = 0

		# 归一化概率分布，使其总和为 1
		prob = prob / prob.sum(dim=-1, keepdim=True)

		# 根据归一化概率分布进行采样，返回采样结果
		return torch.multinomial(prob, 1)  # shape: [batch_size, 1]


class Old_LM(nn.Module):
	def __init__(self, cell, vocab_size, embed_size, hidden_dim, num_layers, dropout_rates):
		super(Old_LM, self).__init__()

		# 保存 RNN 单元类型
		self._cell = cell

		# 词嵌入层：将词汇表中的索引映射到稠密向量空间
		self.embedding = nn.Embedding(vocab_size, embed_size)

		# 根据指定的 RNN 单元类型（RNN 或 GRU）初始化循环神经网络
		if cell == 'rnn':
			self.rnn = nn.RNN(embed_size, hidden_dim, num_layers, dropout=dropout_rates, batch_first=True)
		elif cell == 'gru':
			self.rnn = nn.GRU(embed_size, hidden_dim, num_layers, dropout=dropout_rates, batch_first=True)
		else:
			raise ValueError(f"Unsupported RNN cell type: '{cell}'. Supported types are 'rnn' and 'gru'.")

		# 输出层：将 RNN 的隐藏状态映射到词汇表大小的 logits
		self.output_layer = nn.Linear(hidden_dim, vocab_size)

		# Log-Softmax 层：将 logits 转换为对数概率分布
		self.log_softmax = nn.LogSoftmax(dim=2)

	def forward(self, x):
		x = x.long()
		_ = self.embedding(x)
		_ = _.permute(1, 0, 2)
		h_all, __ = self.rnn(_)
		h_all = h_all.permute(1, 0, 2)
		_ = self.output_layer(h_all)
		_ = self.log_softmax(_)
		return _

	def sample(self, x, forbidden=[1]):
		log_prob = self.forward(x)
		prob = torch.exp(log_prob)[:, -1, :]
		p, i = prob.sort(descending=True)

		prob = torch.exp(log_prob)[:, -1, :]
		p, i = prob.sort(descending=True)
		self.p = p
		if forbidden is not None:
			for forbidden_ind in forbidden:
				prob[:, forbidden_ind] = 0
		prob = prob / prob.sum()
		# BOS let us go hiking 2 276 172 144 17552
		return torch.multinomial(prob, 1)

	def topp_sample(self, x, topp=0.99, forbidden=[1]):
		log_prob = self.forward(x)
		prob = torch.exp(log_prob)[:, -1, :]
		p, i = prob.sort(descending=True)
		self.p = p
		if forbidden is not None:
			for forbidden_ind in forbidden:
				prob[:, forbidden_ind] = 0
		prob, ids = prob.sort(descending=True)
		prob = prob/prob.sum()
		log_prob = self.forward(x)
		prob = torch.exp(log_prob)[:, -1, :]
		p, i = prob.sort(descending=True)
		cum_prob = prob.cumsum(1)
		cum_prob_flags = cum_prob > topp
		stop_id = cum_prob_flags.nonzero(as_tuple=True)[1][0]
		if stop_id == 0 :
			stop_id += 1
		return ids[0][torch.multinomial(prob[:stop_id]/prob[:stop_id].sum(),1)]
		# return torch.multinomial(prob, 1)
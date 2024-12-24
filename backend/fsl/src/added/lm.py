import torch
import torch.nn as nn
from transformers import PreTrainedModel,GPT2PreTrainedModel


class LM(GPT2PreTrainedModel):
	def __init__(self, config, cell, my_vocab_size, embed_size, hidden_dim, num_layers, dropout_rates):
		super().__init__(config)

		# 输入参数验证
		if cell not in ['rnn', 'lstm']:
			raise ValueError(f"Invalid RNN cell type: {cell}. Supported types are 'rnn' and 'lstm'.")
		if my_vocab_size <= 0:
			raise ValueError(f"Vocabulary size must be positive, but got {my_vocab_size}.")
		if embed_size <= 0 or hidden_dim <= 0:
			raise ValueError("Embed size and hidden dimension must be positive.")
		if num_layers <= 0:
			raise ValueError("Number of layers must be positive.")
		if not (0.0 <= dropout_rates <= 1.0):
			raise ValueError("Dropout rate must be between 0 and 1.")
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
			# RNN 前向传播
			output, _ = self.rnn(embeddings)

			# 计算 logits
			logits = self.output_layer(output)

			# 计算损失（仅在训练模式下）
			if is_training and labels is not None:
				loss = self.criteration(logits.view(-1, self.vocab_size), labels.view(-1))
				return logits, loss

			# 返回 logits（推理模式）
			return logits

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

		# 将索引 1 的概率置为 0（可用于屏蔽特定 token，例如特殊符号）
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
			if not hasattr(self.rnn, "batch_first") or not self.rnn.batch_first:
				raise ValueError("The RNN implementation must support `batch_first=True`.")
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
		# 修复归一化逻辑，确保每个样本的概率分布独立归一化
		prob = prob / prob.sum(dim=-1, keepdim=True)
		# BOS let us go hiking 2 276 172 144 17552
		return torch.multinomial(prob, 1)

	def topp_sample(self, x, topp=0.99, forbidden=None):
		if forbidden is None:
			forbidden = [1]  # 默认屏蔽索引 1
		if not (0.0 < topp <= 1.0):
			raise ValueError("`topp` must be in the range (0, 1].")
		# 获取 log 概率并计算概率分布
		log_prob = self.forward(x, is_training=False)
		prob = torch.exp(log_prob)[:, -1, :]  # 获取最后一个时间步的概率分布

		# 按概率从高到低排序
		sorted_prob, sorted_indices = prob.sort(descending=True, dim=-1)

		if forbidden:
			for forbidden_ind in forbidden:
				prob[:, forbidden_ind] = 0

		# 在屏蔽后重新归一化概率分布
		prob = prob / prob.sum(dim=-1, keepdim=True)

		# 按概率重新排序（避免屏蔽后概率分布不一致）
		sorted_prob, sorted_indices = prob.sort(descending=True, dim=-1)

		# 计算累积概率，并找到超过 `topp` 的截断位置
		cum_prob = sorted_prob.cumsum(dim=-1)  # shape: [batch_size, vocab_size]
		cutoff_mask = cum_prob > topp  # 标记超过 `topp` 的位置
		cutoff_index = cutoff_mask.nonzero(as_tuple=True)  # 获取截断位置
		if cutoff_index[1].numel() > 0:
			stop_id = cutoff_index[1][0]  # 获取第一个超过 `topp` 的索引
		else:
			stop_id = sorted_prob.size(1)  # 如果没有超过 `topp` 的 token，使用所有 token

		# 如果 `stop_id` 为 0，至少保留一个 token
		if stop_id == 0:
			stop_id = 1

		# 选取截断后的 token 和概率
		truncated_prob = sorted_prob[:, :stop_id]
		truncated_indices = sorted_indices[:, :stop_id]

		# 归一化概率分布
		truncated_prob = truncated_prob / truncated_prob.sum(dim=-1, keepdim=True)

		# 根据归一化后的概率分布进行采样
		sampled_indices = torch.multinomial(truncated_prob, 1)  # shape: [batch_size, 1]

		# 返回采样的 token
		return truncated_indices.gather(1, sampled_indices).squeeze(dim=-1)

	def sample(self, input_ids, attention_mask=None, labels=None, temperature=1.0):
		"""
		进行基于温度缩放的采样，返回采样结果。

		Args:
			input_ids (torch.Tensor): 输入 token IDs，形状为 [batch_size, seq_length]。
			attention_mask (torch.Tensor, optional): 用于掩盖无效 token 的 attention mask（未使用，保留接口）。
			labels (torch.Tensor, optional): 标签张量（未使用，保留接口）。
			temperature (float): 温度系数，用于调整分布的平滑程度。

		Returns:
			torch.Tensor: 采样的 token 索引，形状为 [batch_size, 1]。
		"""
		# 前向传播，获取 log 概率
		log_prob = self.forward(input_ids, is_training=False)  # 输出形状: [batch_size, seq_length, vocab_size]

		# 获取最后一个时间步的概率分布，并应用温度缩放
		prob = torch.exp(log_prob[:, -1, :] / temperature)  # 形状: [batch_size, vocab_size]

		# 归一化概率分布（确保概率总和为 1）
		prob = prob / prob.sum(dim=-1, keepdim=True)

		# 根据概率分布进行采样，返回结果
		sampled_indices = torch.multinomial(prob, num_samples=1)  # 形状: [batch_size, 1]
		return sampled_indices
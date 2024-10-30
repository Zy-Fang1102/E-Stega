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
		x = input_ids.long()
		_ = self.embedding(x)
		_ = _.permute(1, 0, 2)
		h_all, __ = self.rnn(_)
		h_all = h_all.permute(1, 0, 2)
		_ = self.output_layer(h_all)
		_ = self.log_softmax(_)
		if is_training:
			loss = self.criteration(_.reshape(-1, self.vocab_size), labels.reshape(-1))
			# return {"logits":_, "loss":loss}
			return _,loss
		else:
			return _

	def sample(self, input_ids, attention_mask=None, labels=None):
		log_prob = self.forward(input_ids,is_training=False)
		prob = torch.exp(log_prob)[:, -1, :]
		p, i = prob.sort(descending=True)
		self.p = p
		prob[:, 1] = 0
		prob = prob / prob.sum()
		return torch.multinomial(prob, 1)


class Old_LM(nn.Module):
	def __init__(self, cell, vocab_size, embed_size, hidden_dim, num_layers, dropout_rates):
		super(Old_LM, self).__init__()
		self._cell = cell

		self.embedding = nn.Embedding(vocab_size, embed_size)
		if cell == 'rnn':
			self.rnn = nn.RNN(embed_size, hidden_dim, num_layers, dropout=dropout_rates)
		elif cell == 'gru':
			self.rnn = nn.GRU(embed_size, hidden_dim, num_layers, dropout=dropout_rates)

		else:
			raise Exception('no such rnn cell')

		self.output_layer = nn.Linear(hidden_dim, vocab_size)
		self.log_softmax = nn.LogSoftmax(dim=2)

	# def forward(self, x):
	# 	x = x.long()
	# 	_ = self.embedding(x)
	# 	_ = _.permute(1, 0, 2)
	# 	h_all, __ = self.rnn(_)
	# 	h_all = h_all.permute(1, 0, 2)
	# 	_ = self.output_layer(h_all)
	# 	_ = self.log_softmax(_)
	# 	return _

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

	def example(self,x):
		log_prob = self.forward(x)
		prob = torch.exp(log_prob)[:, -1, :]
		p, i = prob.sort(descending=True)
		self.p = p
		prob = prob / prob.sum()
		# BOS let us go hiking 2 276 172 144 17552
		return prob
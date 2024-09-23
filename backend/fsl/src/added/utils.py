import collections
import random
import numpy as np
import configparser
import json
import datasets
#
class MyConfigParser(configparser.ConfigParser):
	def optionxform(self, optionstr):
		return optionstr

class MyDict(dict):
	__setattr__ = dict.__setitem__
	__getattr__ = dict.__getitem__


class RemovedConfig(object):
	def __init__(self, config_path):
		config = MyConfigParser()
		config.read(config_path, encoding="utf-8")
		self.configs = self.dictobj2obj(config.__dict__["_sections"])


	def dictobj2obj(self, dictobj):
		if not isinstance(dictobj, dict):
			return dictobj
		d = MyDict()
		for k,v in dictobj.items():
			d[k] = self.dictobj2obj(v)
		return d

	def get_configs(self):
		return self.configs


class Config(object):
	def __init__(self, config_path):
		configs = json.load(open(config_path, "r", encoding="utf-8"))
		self.configs = self.dictobj2obj(configs)

	def dictobj2obj(self, dictobj):
		if not isinstance(dictobj, dict):
			return dictobj
		d = MyDict()
		for k,v in dictobj.items():
			d[k] = self.dictobj2obj(v)
		return d

	def get_configs(self):
		return self.configs


class Vocabulary(object):
	def __init__(self, data_path, max_len=200, min_len=5, word_drop=5, encoding='utf8'):
		if type(data_path) == str:
			data_path = [data_path]
		self._data_path = data_path
		self._max_len = max_len
		self._min_len = min_len
		self._word_drop = word_drop
		self._encoding = encoding
		self.token_num = 0
		self.vocab_size_raw = 0
		self.vocab_size = 0
		self.w2i = {}
		self.i2w = {}
		self.start_words = []
		self._build_vocabulary()

	def _build_vocabulary(self):
		self.w2i['_PAD'] = 0
		self.w2i['_UNK'] = 1
		self.w2i['_BOS'] = 2
		self.w2i['_EOS'] = 3
		self.i2w[0] = '_PAD'
		self.i2w[1] = '_UNK'
		self.i2w[2] = '_BOS'
		self.i2w[3] = '_EOS'
		words_all = []
		start_words = []
		for data_path in self._data_path:
			with open(data_path, 'r', encoding=self._encoding) as f:
				sentences = f.readlines()
			for sentence in sentences:
				# _ = list(filter(lambda x: x not in [None, ''], sentence.split()))
				_ = sentence.split()
				if (len(_) >= self._min_len) and (len(_) <= self._max_len):
					words_all.extend(_)
					start_words.append(_[0])
		self.token_num = len(words_all)
		word_distribution = sorted(collections.Counter(words_all).items(), key=lambda x: x[1], reverse=True)
		self.vocab_size_raw = len(word_distribution)
		for (word, value) in word_distribution:
			if value > self._word_drop:
				self.w2i[word] = len(self.w2i)
				self.i2w[len(self.i2w)] = word
		self.vocab_size = len(self.i2w)
		start_word_distribution = sorted(collections.Counter(start_words).items(), key=lambda x: x[1], reverse=True)
		self.start_words = [_[0] for _ in start_word_distribution]


class UNK_Vocabulary(object):
	def __init__(self, data_path, max_len=200, min_len=5, word_drop=5, encoding='utf8'):
		if type(data_path) == str:
			data_path = [data_path]
		self._data_path = data_path
		self._max_len = max_len
		self._min_len = min_len
		self._word_drop = word_drop
		self._encoding = encoding
		self.token_num = 0
		self.vocab_size_raw = 0
		self.vocab_size = 0
		self.w2i = {}
		self.i2w = {}
		self.start_words = []
		self._build_vocabulary()

	def _build_vocabulary(self):
		# self.w2i['_PAD'] = 0
		# self.w2i['_UNK'] = 1
		# self.w2i['_BOS'] = 2
		# self.w2i['_EOS'] = 3
		# self.i2w[0] = '_PAD'
		# self.i2w[1] = '_UNK'
		# self.i2w[2] = '_BOS'
		# self.i2w[3] = '_EOS'
		words_all = []
		start_words = []
		for data_path in self._data_path:
			with open(data_path, 'r', encoding=self._encoding) as f:
				sentences = f.readlines()
			for sentence in sentences:
				# _ = list(filter(lambda x: x not in [None, ''], sentence.split()))
				_ = sentence.split()
				if (len(_) >= self._min_len) and (len(_) <= self._max_len):
					words_all.extend(_)
					start_words.append(_[0])
		self.token_num = len(words_all)
		word_distribution = sorted(collections.Counter(words_all).items(), key=lambda x: x[1], reverse=True)

		self.vocab_size_raw = len(word_distribution)
		for (word, value) in word_distribution:
			if value <= self._word_drop:
				self.w2i[word] = len(self.w2i)
				self.i2w[len(self.i2w)] = word
		self.vocab_size = len(self.i2w)
		self.unk_distribution = np.zeros(self.vocab_size)
		for (w, c) in word_distribution:
			if c <= self._word_drop:
				self.unk_distribution[self.w2i[w]] = c
		self.unk_distribution = self.unk_distribution/np.sum(self.unk_distribution)
		start_word_distribution = sorted(collections.Counter(start_words).items(), key=lambda x: x[1], reverse=True)
		self.start_unk_distribution = []
		for (w,c) in start_word_distribution:
			if c <= self._word_drop:
				self.start_unk_distribution.append(c)
		self.start_unk_distribution = np.array(self.start_unk_distribution)
		self.start_unk_distribution = self.start_unk_distribution/np.sum(self.start_unk_distribution)

		self.start_words = [_[0] for _ in start_word_distribution]


	def sample(self):
		cand_ = [i for i in range(self.vocab_size)]
		id = np.random.choice(cand_,1, p=self.unk_distribution)[0]
		return id

	def start_sample(self):
		cand_ = [i for i in range(len(self.start_unk_distribution))]
		id = np.random.choice(cand_,1, p=self.start_unk_distribution)[0]
		return id

class Corpus(object):
	def __init__(self, data_path, vocabulary, max_len=200, min_len=5):
		if type(data_path) == str:
			data_path = [data_path]
		self._data_path = data_path
		self._vocabulary = vocabulary
		self._max_len = max_len
		self._min_len = min_len
		self.corpus = []
		self.corpus_length = []
		self.labels = []
		self.sentence_num = 0
		self.max_sentence_length = 0
		self.min_sentence_length = 0
		self._build_corpus()

	def _build_corpus(self):
		def _transfer(word):
			try:
				return self._vocabulary.w2i[word]
			except:
				return self._vocabulary.w2i['_UNK']
		label = -1
		for data_path in self._data_path:
			label += 1
			with open(data_path, 'r', encoding='utf8') as f:
				sentences = f.readlines()
			# sentences = list(filter(lambda x: x not in [None, ''], sentences))
			for sentence in sentences:
				# sentence = list(filter(lambda x: x not in [None, ''], sentence.split()))
				sentence = sentence.split()
				if (len(sentence) >= self._min_len) and (len(sentence) <= self._max_len):
					sentence = ['_BOS'] + sentence + ['_EOS']
					self.corpus.append(list(map(_transfer, sentence)))
					self.labels.append(label)
		self.corpus_length = [len(i) for i in self.corpus]
		self.max_sentence_length = max(self.corpus_length)
		self.min_sentence_length = min(self.corpus_length)
		self.sentence_num = len(self.corpus)


def split_corpus(data_path, train_path, test_path, max_len=200, min_len=5, ratio=0.8, seed=0, encoding='utf8',is_inverse=False, inverse_mode=0):
	with open(data_path, 'r', encoding=encoding) as f:
		sentences = f.readlines()
	sentences = [_ for _ in filter(lambda x: x not in [None, ''], sentences)
	             if len(_.split()) <= max_len and len(_.split()) >= min_len]
	np.random.seed(seed)
	np.random.shuffle(sentences)
	train = sentences[:int(len(sentences) * ratio)]
	test = sentences[int(len(sentences) * ratio):]
	if is_inverse:
		if inverse_mode == 0:
			with open(train_path, 'w', encoding='utf8') as f:
				for sentence in train:
					f.write(" ".join(sentence.split()[::-1]) + "\n")
			with open(test_path, 'w', encoding='utf8') as f:
				for sentence in test:
					f.write(" ".join(sentence.split()[::-1]) + "\n")
		if inverse_mode == 1:
			new_sentences = []
			for sentence in sentences:
				words = sentence.split()
				for i in range(len(words)):
					new_sentences.append(" ".join(words[:i+1][::-1]) + "\n")
			np.random.shuffle(new_sentences)
			new_sentences = new_sentences[:2000000]  # down sampling
			train = new_sentences[:int(len(new_sentences) * ratio)]
			test = new_sentences[int(len(new_sentences) * ratio):]
			with open(train_path, 'w', encoding='utf8') as f:
				for sentence in train:
					f.write(sentence)
			with open(test_path, 'w', encoding='utf8') as f:
				for sentence in test:
					f.write(sentence)
	else:
		with open(train_path, 'w', encoding='utf8') as f:
			for sentence in train:
				f.write(sentence)
		with open(test_path, 'w', encoding='utf8') as f:
			for sentence in test:
				f.write(sentence)


class Generator(object):
	def __init__(self, data):
		self._data = data

	def build_generator(self, batch_size, sequence_len, shuffle=True):
		if shuffle:
			np.random.shuffle(self._data)
		data_ = []
		for _ in self._data:
			data_.extend(_)
		batch_num = len(data_) // (batch_size * sequence_len)
		data = data_[:batch_size * batch_num * sequence_len]
		data = np.array(data).reshape(batch_num * batch_size, sequence_len)
		while True:
			batch_data = data[0:batch_size]                   # 产生一个batch的index
			data = data[batch_size:]                          # 去掉本次index
			if len(batch_data) == 0:
				return True
			yield batch_data


def get_corpus_distribution(data_path):
	with open(data_path, "r", encoding="utf-8") as f:
		lines = f.readlines()
	lengths = dict()
	for line in lines:
		words = line.split("\n")[0].split()
		length = len(words)
		if lengths.get(length, None) is None:
			lengths[length]=1
		else:
			lengths[length] += 1
	lengths_tmp = np.zeros(max(list(lengths.keys()))+1)
	for k,v in lengths.items():
		lengths_tmp[k] = v
	lengths_norm = lengths_tmp
	lengths_norm = lengths_norm/np.sum(lengths_norm)
	length_sum = 0
	lengths_cdf = np.zeros_like(lengths_norm)
	for i,_ in enumerate(lengths_norm.tolist()):
		length_sum += lengths_norm[i]
		lengths_cdf[i] = length_sum
	return lengths_cdf


def location(cdf, key=42, num=100):
	'''
	location
	start from 0
	end with 49
	'''
	np.random.seed(key)
	random.seed(key)
	uniform_data = np.random.uniform(size=(num,1))
	idxes = []
	for u in uniform_data:
		idx = np.argwhere(cdf>=u)[0][0]
		idxes.append(int(idx))
	return idxes


def sample_secret_message(data_path, key=42,num=100):
	with open(data_path, "r", encoding="utf-8") as f:
		lines = f.readlines()
	np.random.seed(key)
	random.seed(key)
	sampled_message = []
	inds = np.random.randint(low=1,high=len(lines),size=num)
	for i in inds:
		sampled_message.append(lines[i])
	return sampled_message

class RemovedConfig(object):
	def __init__(self, config_path):
		config = MyConfigParser()
		config.read(config_path, encoding="utf-8")
		self.configs = self.dictobj2obj(config.__dict__["_sections"])




	def get_configs(self):
		return self.configs



if __name__ == '__main__':
	vocabulary = Vocabulary('./data/corpus.txt', word_drop=10)
	split_corpus('./data/corpus.txt', './data/train_clothes', './data/test_clothes')
	# corpus = Corpus('F:/code/python/__data/dataset2020/news2020.txt', vocabulary)
	test = Corpus('./data/test_clothes', vocabulary)
	test_generator = Generator(test.corpus)
	test_g = test_generator.build_generator(64, 50)
	text = test_g.__next__()
	pass
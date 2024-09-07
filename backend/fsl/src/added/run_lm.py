import json
import torch
from torch import nn
import torch.optim as optim
import numpy as np
import utils
import lm
import os
# import  transformers.models.pegasus.modeling_pegasus
# import transformers.models.bart.modeling_bart
# import transformers.models.t5.modeling_t5
# import transformers.models.gpt2.modeling_gpt2
from transformers import set_seed,default_data_collator,AdamW,get_scheduler
from transformers import (GPT2LMHeadModel,GPT2Tokenizer,GPT2Config,GPT2TokenizerFast,
						  T5TokenizerFast,T5Config,T5ForConditionalGeneration,
						  BartConfig,BartForCausalLM,BartTokenizerFast,
						  AutoModelForCausalLM)
import logging
from datasets import load_dataset
from torch.utils.data import DataLoader
import math
from tqdm.auto import tqdm

os.environ["CUDA_VISIBLE_DEVICES"] = "0"

logger = logging.getLogger(__name__)

# DEVICE
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def train_rnn(train_dataset, val_dataset, model, Training_Configs, vocabulary):
	criteration = nn.NLLLoss()
	optimizer = optim.Adam(model.parameters(), lr=Training_Configs.LEARNING_RATE, betas=(0.9, 0.999), eps=1e-08, weight_decay=0,
						   amsgrad=False)
	train_generator = utils.Generator(train_dataset.corpus)
	STEPS = 1
	best_loss = 1000000
	for epoch in range(Training_Configs.EPOCH):
		train_g = train_generator.build_generator(Training_Configs.BATCH_SIZE, Training_Configs.SEQUENCE_LEN)
		train_loss = []
		while True:
			model.train()
			try:
				text = train_g.__next__()
				STEPS += 1
			except:
				break
			optimizer.zero_grad()
			text_in = text[:, :-1]
			text_target = text[:, 1:]
			y = model(torch.from_numpy(text_in).long().to(device))
			loss = criteration(y.reshape(-1, vocabulary.vocab_size),
							   torch.from_numpy(text_target).reshape(-1).long().to(device))
			loss.backward()
			optimizer.step()
			train_loss.append(loss.item())


			# eval
			if STEPS % Training_Configs.EVAL_STEPS == 0:
				eval_loss = eval_rnn(val_dataset, model, criteration, Training_Configs, vocabulary)
				logger.info('training steps {:d}   training loss {:.4f}    test loss {:.4f}'
					  .format(STEPS, np.mean(train_loss), eval_loss))
				if eval_loss < best_loss:
					best_loss = eval_loss
					logger.info('-----------------------------------------------------')
					logger.info('saving parameters')
					os.makedirs('models', exist_ok=True)
					torch.save(model.state_dict(), 'models/' + Training_Configs.DATASET + '-best-checkpoint' + '.pkl')
					logger.info('-----------------------------------------------------')

				# 备用判别
				# if eval_loss > best_loss:
				# 	best_loss = eval_loss
				# 	logger.info('-----------------------------------------------------')
				# 	logger.info('saving parameters')
				# 	os.makedirs('models', exist_ok=True)
				# 	torch.save(model.state_dict(), 'models/' + Training_Configs.DATASET + '-best-checkpoint' + '.pkl')
				# 	logger.info('-----------------------------------------------------')


		if STEPS % Training_Configs.GENERATE_EVERY == 0:
			model.eval()
			with torch.no_grad():
				# 生成文本
				x = torch.LongTensor([[vocabulary.w2i['_BOS']]] * 3).to(device)
				for i in range(Training_Configs.MAX_GENERATE_LENGTH):
					samp = model.sample(x)
					x = torch.cat([x, samp], dim=1)
				x = x.cpu().numpy()
			logger.info('-----------------------------------------------------')
			for i in range(x.shape[0]):
				logger.info(' '.join([vocabulary.i2w[_] for _ in list(x[i, :]) if _ not in
								[vocabulary.w2i['_BOS'], vocabulary.w2i['_EOS'], vocabulary.w2i['_PAD']]]))
			logger.info('-----------------------------------------------------')

def generate_sequence(MAX_SEQUENCE_LENGTH, input_file, tokenizer, unlabeled=False, do_pairwise=False):

    X1 = []
    X2 = []
    y = []
    y_unlabeled=[]

    label_count = defaultdict(int)
    with tf.io.gfile.GFile(input_file, "r") as f:
      reader=csv.DictReader(f)
      for line in reader:

      #reader = csv.reader(f, delimiter="\t", quotechar="|")
      #for line in reader:
       # print(line)
        #print(line[0])
        #print(line[0][1])
        if len(line) == 0:
          continue
        X1.append(convert_to_unicode(line["sentence"]))
        if do_pairwise:
          X2.append(convert_to_unicode(line[1]))
        if not unlabeled:
            if do_pairwise:
              label = int(convert_to_unicode(line[2]))
            else:
              label = int(convert_to_unicode(line["label"]))
            y.append(label)
            label_count[label] += 1
        else:
            #y.append(-1)
            dataset = line["from"]
            y.append(dataset)
            label = int(convert_to_unicode(line["label"]))
            y_unlabeled.append(label)

def eval_rnn(eval_dataset, model, criteration, Training_Configs, vocabulary):
	eval_loss = []
	model.eval()
	generator = utils.Generator(eval_dataset.corpus)
	eval_g = generator.build_generator(Training_Configs.BATCH_SIZE, Training_Configs.SEQUENCE_LEN)
	with torch.no_grad():
		while True:
			try:
				text = eval_g.__next__()
			except:
				break
			text_in = text[:, :-1]
			text_target = text[:, 1:]
			y = model(torch.from_numpy(text_in).long().to(device))
			loss = criteration(y.reshape(-1, vocabulary.vocab_size),
							   torch.from_numpy(text_target).reshape(-1).long().to(device))
			eval_loss.append(loss.item())
	return np.mean(eval_loss)


def train_lm(dataset, model, Training_Configs, tokenizer):
	train_dataset = dataset["train"]
	train_dataloader = DataLoader(
		train_dataset, shuffle=True, collate_fn=default_data_collator, batch_size=Training_Configs.BATCH_SIZE
	)


	# Optimizer
	# Split weights in two groups, one with weight decay and the other not.
	no_decay = ["bias", "LayerNorm.weight"]
	optimizer_grouped_parameters = [
		{
			"params": [p for n, p in model.named_parameters() if not any(nd in n for nd in no_decay)],
			"weight_decay":Training_Configs.weight_decay,
		},
		{
			"params": [p for n, p in model.named_parameters() if any(nd in n for nd in no_decay)],
			"weight_decay": 0.0,
		},
	]
	optimizer = AdamW(optimizer_grouped_parameters, lr=Training_Configs.LEARNING_RATE)
	num_update_steps_per_epoch = math.ceil(len(train_dataloader))
	max_train_steps =  Training_Configs.EPOCH * num_update_steps_per_epoch
	lr_scheduler = get_scheduler(
		name=Training_Configs.lr_scheduler_type,
		optimizer=optimizer,
		num_warmup_steps=int(Training_Configs.warmup_ratio*max_train_steps),
		num_training_steps=max_train_steps,
	)

	# Train!
	total_batch_size = Training_Configs.BATCH_SIZE
	logger.info("***** Running training *****")
	logger.info(f"  Num examples = {len(train_dataset)}")
	logger.info(f"  Num Epochs = {Training_Configs.EPOCH}")
	logger.info(f"  Instantaneous batch size per device = {Training_Configs.BATCH_SIZE}")
	logger.info(f"  Total optimization steps = {max_train_steps}")
	# Only show the progress bar once on each machine.
	progress_bar = tqdm(range(max_train_steps), disable=False)
	completed_steps = 0
	best_eavl_ppl = 100000000
	for epoch in range(Training_Configs.EPOCH):
		model.train()
		for step, batch in enumerate(train_dataloader):
			batch = {k:batch[k].to(device) for k in batch}
			outputs = model(**batch)
			loss = outputs.loss
			loss.backward()
			optimizer.step()
			lr_scheduler.step()
			optimizer.zero_grad()
			progress_bar.update(1)
			completed_steps += 1

			if completed_steps % Training_Configs.GENERATE_EVERY == 0:
				model.eval()
				logger.info(tokenizer.decode(model.generate(do_sample=True)[0]))
				model.train()

			if completed_steps % Training_Configs.EVAL_STEPS == 0:
				perplexity = eval_lm(dataset, model, Training_Configs,tokenizer)
				logger.info(f"global step {completed_steps}: perplexity: {perplexity}")
				if perplexity < best_eavl_ppl:
					best_eavl_ppl = perplexity
					unwrapped_model = model
					unwrapped_model.save_pretrained(Training_Configs.output_dir)
					tokenizer.save_pretrained(Training_Configs.output_dir)

				model.train()

			if completed_steps >= max_train_steps:
				break

	unwrapped_model = model
	unwrapped_model.save_pretrained(os.path.join(Training_Configs.output_dir, "final"))
	tokenizer.save_pretrained(os.path.join(Training_Configs.output_dir, "final"))



def eval_lm(dataset, model, Training_Configs, tokenizer):
	eval_dataset = dataset["validation"]
	eval_dataloader = DataLoader(
		eval_dataset, collate_fn=default_data_collator, batch_size=Training_Configs.BATCH_SIZE
	)
	model.eval()
	losses = []
	for step, batch in enumerate(eval_dataloader):
		with torch.no_grad():
			batch = {k: batch[k].to(device) for k in batch}
			outputs = model(**batch)

		loss = outputs.loss
		losses.append(loss.repeat(Training_Configs.BATCH_SIZE))

	losses = torch.cat(losses)
	losses = losses[: len(eval_dataset)]
	try:
		perplexity = math.exp(torch.mean(losses))
	except OverflowError:
		perplexity = float("inf")
	return perplexity



def main(config):
	# Setup logging
	logging.basicConfig(
		format="%(asctime)s - %(levelname)s - %(name)s -   %(message)s",
		datefmt="%m/%d/%Y %H:%M:%S",
		level=logging.INFO,
	)
	logger.warning("device: %s",device)


	Training_Configs = config.Training
	DATASET = Training_Configs.DATASET
	data_path = Training_Configs.data_path
	RATIO = Training_Configs.RATIO
	SEED = Training_Configs.SEED

	# set random seed
	set_seed(SEED)


	logger.info("*****************Parser Arguments*******************")
	logger.info("Training Configs")
	logger.info(json.dumps(Training_Configs))


	# load model
	MODEL_TYPE = Training_Configs.model_type
	if MODEL_TYPE == "RNN":
		logger.info("Vocabulary Configs")
		Vocabulary_Configs = config.Vocabulary
		logger.info(json.dumps(Vocabulary_Configs))
		# prepare vocab and dataset
		WORD_DROP = Vocabulary_Configs.WORD_DROP
		MIN_LEN = Vocabulary_Configs.MIN_LEN
		MAX_LEN = Vocabulary_Configs.MAX_LEN

		os.makedirs(os.path.join(Training_Configs.GENERATION_DIR, "corpus"), exist_ok=True)
		train_path = os.path.join(Training_Configs.GENERATION_DIR, 'corpus/train_' + DATASET + ".txt")
		test_path = os.path.join(Training_Configs.GENERATION_DIR, 'corpus/test_' + DATASET + ".txt")
		vocabulary = utils.Vocabulary(
			data_path,
			max_len=MAX_LEN,
			min_len=MIN_LEN,
			word_drop=WORD_DROP
		)
		utils.split_corpus(data_path, train_path, test_path, max_len=MAX_LEN, min_len=MIN_LEN, ratio=RATIO, seed=SEED)
		train = utils.Corpus(train_path, vocabulary, max_len=MAX_LEN, min_len=MIN_LEN)
		test = utils.Corpus(test_path, vocabulary, max_len=MAX_LEN, min_len=MIN_LEN)


		RNN_Configs=config.RNN
		CELL = RNN_Configs.CELL
		EMBED_SIZE = int(RNN_Configs.EMBED_SIZE)
		HIDDEN_DIM = int(RNN_Configs.HIDDEN_DIM)
		NUM_LAYERS = int(RNN_Configs.NUM_LAYERS)
		DROPOUT_RATE = float(RNN_Configs.DROPOUT_RATE)
		logger.info("Model Configs")
		logger.info(json.dumps({**{"MODEL_TYPE":MODEL_TYPE}, **RNN_Configs, }))
		model = lm.Old_LM(
			cell=CELL,
			vocab_size=vocabulary.vocab_size,
			embed_size=EMBED_SIZE,
			hidden_dim=HIDDEN_DIM,
			num_layers=NUM_LAYERS,
			dropout_rate=DROPOUT_RATE
		)
		model.to(device)
		train_rnn(train,test, model, Training_Configs, vocabulary)


	elif MODEL_TYPE in ["GPT","T5","BART"]:
		if MODEL_TYPE == "GPT":
			LM_configs = config.GPT
			model_config = GPT2Config.from_pretrained(LM_configs.model_name_or_path)
			tokenizer = GPT2TokenizerFast.from_pretrained(LM_configs.model_name_or_path)
			# load model
			model = GPT2LMHeadModel.from_pretrained(LM_configs.model_name_or_path, config=model_config)
			model.to(device)
		elif MODEL_TYPE=="T5":
			LM_configs = config.T5
			model_config = T5Config.from_pretrained(LM_configs.model_name_or_path)
			tokenizer = T5TokenizerFast.from_pretrained(LM_configs.model_name_or_path)
			# load model
			model = T5ForConditionalGeneration.from_pretrained(LM_configs.model_name_or_path, config=model_config)
			model.to(device)
		elif MODEL_TYPE == "BART":
			LM_configs = config.BART
			model_config = BartConfig.from_pretrained(LM_configs.model_name_or_path)
			tokenizer = BartTokenizerFast.from_pretrained(LM_configs.model_name_or_path)
			# load model
			model = BartForCausalLM.from_pretrained(LM_configs.model_name_or_path, config=model_config)
			model.to(device)

		extension = "text"
		raw_datasets = load_dataset(extension, data_files=data_path, )
		RATIO = int(RATIO*100)
		raw_datasets["train"] = load_dataset(extension, data_files=data_path, split=f"train[:{RATIO}%]",)
		raw_datasets["validation"] = load_dataset(extension, data_files=data_path, split=f"train[{RATIO}%:]",)

		# preprocess text
		column_names = raw_datasets["train"].column_names
		text_column_name = "text" if "text" in column_names else column_names[0]

	# TODO: 这里存在一个问题
		def gpt_tokenize_function(examples):
			return tokenizer(tokenizer.bos_token+Training_Configs.prompt+examples[text_column_name])

		def bart_tokenize_function(examples):
			return tokenizer(examples[text_column_name])

		def t5_tokenize_function(examples):
			# prefix = "steganography generate: "
			# return tokenizer.prepare_seq2seq_batch(src_texts=examples[text_column_name],tgt_texts=[prefix +text for text in examples[text_column_name]])
			return tokenizer(examples[text_column_name])
			# return tokenizer([prefix +text for text in examples[text_column_name]])

		if MODEL_TYPE == "GPT":
			tokenize_function = gpt_tokenize_function
		elif MODEL_TYPE == "T5":
			tokenize_function = t5_tokenize_function
		elif MODEL_TYPE == "BART":
			tokenize_function = bart_tokenize_function


		tokenized_datasets = raw_datasets.map(
			tokenize_function,
			batched=False,
			num_proc=LM_configs.preprocessing_num_workers,
			remove_columns=column_names,
			load_from_cache_file=not LM_configs.overwrite_cache,
			desc="Running tokenizer on dataset",
		)

		block_size = min(Training_Configs.SEQUENCE_LEN, tokenizer.model_max_length)

		def bart_group_texts(examples):
			# Concatenate all texts.
			concatenated_examples = {k: sum(examples[k], []) for k in examples.keys()}
			total_length = len(concatenated_examples[list(examples.keys())[0]])
			# We drop the small remainder, we could add padding if the model supported it instead of this drop, you can
			# customize this part to your needs.
			if total_length >= block_size:
				total_length = (total_length // block_size) * block_size
			# Split by chunks of max_len.
			result = {
				k: [t[i: i + block_size] for i in range(0, total_length, block_size)]
				for k, t in concatenated_examples.items()
			}
			result["labels"] = [concatenated_examples["input_ids"][i+1: i + block_size+1]+[2]*(block_size-len(concatenated_examples["input_ids"][i+1: i + block_size+1])) for i in range(0, total_length, block_size)]
			# result["labels"] = result["input_ids"].copy()
			return result


		def gpt_group_texts(examples):
			# Concatenate all texts.
			concatenated_examples = {k: sum(examples[k], []) for k in examples.keys()}
			total_length = len(concatenated_examples[list(examples.keys())[0]])
			# We drop the small remainder, we could add padding if the model supported it instead of this drop, you can
			# customize this part to your needs.
			if total_length >= block_size:
				total_length = (total_length // block_size) * block_size
			# Split by chunks of max_len.
			result = {
				k: [t[i: i + block_size] for i in range(0, total_length, block_size)]
				for k, t in concatenated_examples.items()
			}
			# FIXME autogressively
			result["labels"] = result["input_ids"].copy()
			return result

		if MODEL_TYPE in ["GPT"]:
			group_texts = gpt_group_texts
		elif MODEL_TYPE in ["T5","BART"]:
			group_texts = bart_group_texts

		lm_datasets = tokenized_datasets.map(
			group_texts,
			batched=True,
			num_proc=LM_configs.preprocessing_num_workers,
			load_from_cache_file=not LM_configs.overwrite_cache,
			desc=f"Grouping texts in chunks of {block_size}",
		)
		train_lm(lm_datasets,model,Training_Configs,tokenizer)
	else:
		logger.warning("NO DEFINITED MODEL")
		exit()


if __name__ == '__main__':
	import argparse
	parser = argparse.ArgumentParser(description="argument for generation")
	parser.add_argument("--config_path", type=str, default="./Configs/commonsense-gpt.json")
	args=parser.parse_args()
	Config = utils.Config(args.config_path).get_configs()
	main(Config)

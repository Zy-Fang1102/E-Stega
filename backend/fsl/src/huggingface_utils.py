from transformers import *

MODELS = [(TFAlbertModel, AlbertTokenizer, AlbertConfig),
          (BertModel, BertTokenizer, BertConfig),
          (TFElectraModel, ElectraTokenizer, ElectraConfig),
          (TFOpenAIGPTModel, OpenAIGPTTokenizer, OpenAIGPTConfig),
          (TFGPT2LMHeadModel, GPT2Tokenizer, GPT2Config),
          (TFCTRLModel, CTRLTokenizer, CTRLConfig),
          (TFTransfoXLModel,  TransfoXLTokenizer, TransfoXLConfig),
          (TFXLNetModel, XLNetTokenizer, XLNetConfig),
          (TFXLMModel, XLMTokenizer),
          (TFDistilBertModel, DistilBertTokenizer, DistilBertConfig),
          (TFRobertaModel, RobertaTokenizer, RobertaConfig),
          (TFXLMRobertaModel, XLMRobertaTokenizer, XLMRobertaConfig),
          (TFMobileBertForMaskedLM, MobileBertTokenizer, MobileBertConfig),
          (TFFunnelForMaskedLM, FunnelTokenizer, FunnelConfig)
          ]

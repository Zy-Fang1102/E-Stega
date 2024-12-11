import torch
import random
import utils
import lm
import json
import os
import jsonlines
import logging
import Huffman_Encoding

from transformers import (
    GPT2LMHeadModel,
    GPT2Tokenizer,
    T5Tokenizer,
    T5ForConditionalGeneration,
    BartForCausalLM,
    BartTokenizer
)

os.environ["CUDA_VISIBLE_DEVICES"] = "0"

logger = logging.getLogger(__name__)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def bits2int(bits):
    res = 0
    for i, bit in enumerate(bits):
        res += bit * (2 ** i)
    return res


def int2bits(inp, num_bits):
    if num_bits == 0:
        return []
    strlist = ('{0:0%db}' % num_bits).format(inp)
    return [int(strval) for strval in reversed(strlist)]


def num_same_from_beg(bits1, bits2):
    assert len(bits1) == len(bits2)
    for i in range(len(bits1)):
        if bits1[i] != bits2[i]:
            break
    return i


def near(alist, anum):
    up = len(alist) - 1
    if up == 0:
        return 0
    bottom = 0
    while up - bottom > 1:
        index = int((up + bottom) / 2)
        if alist[index] < anum:
            up = index
        elif alist[index] > anum:
            bottom = index
        else:
            return index
    if up - bottom == 1:
        if alist[bottom] - anum < anum - up:
            index = bottom
        else:
            index = up
    return index



def ADG_encoder(prob, bit_stream, bit_index, Generation_Configs):
    prob, indices = prob.sort(descending=True)
    # start recursion
    bit_tmp = 0
    while prob[0] <= 0.5:
        # embedding bit
        bit = 1
        while (1 / 2 ** (bit + 1)) > prob[0]:
            bit += 1
        mean = 1 / 2 ** bit
        # dp
        prob = prob.tolist()
        indices = indices.tolist()
        result = []
        for i in range(2 ** bit):
            result.append([[], []])
        for i in range(2 ** bit - 1):
            result[i][0].append(prob[0])
            result[i][1].append(indices[0])
            del (prob[0])
            del (indices[0])
            while sum(result[i][0]) < mean:
                delta = mean - sum(result[i][0])
                index = near(prob, delta)
                if prob[index] - delta < delta:
                    result[i][0].append(prob[index])
                    result[i][1].append(indices[index])
                    del (prob[index])
                    del (indices[index])
                else:
                    break
            mean = sum(prob) / (2 ** bit - i - 1)
        result[2 ** bit - 1][0].extend(prob)
        result[2 ** bit - 1][1].extend(indices)
        # read secret message
        bit_embed = [int(_) for _ in bit_stream[bit_index + bit_tmp:bit_index + bit_tmp + bit]]
        int_embed = bits2int(bit_embed)
        # updating
        prob = torch.FloatTensor(result[int_embed][0]).to(device)
        indices = torch.LongTensor(result[int_embed][1]).to(device)
        prob = prob / prob.sum()
        prob, _ = prob.sort(descending=True)
        indices = indices[_]
        bit_tmp += bit

    prev = indices[int(torch.multinomial(prob, 1))].view(1,1)
    num_bits_encoded = bit_tmp
    return prev, num_bits_encoded

def bits2int_one(bits):
    res = 0
    for i, bit in enumerate(bits):
        res += bit * (2 ** i)
    return res


def int2bits_low(inp, num_bits):
    if num_bits == 0:
        return []
    strlist = ('{0:0%db}' % num_bits).format(inp)
    return [int(strval) for strval in reversed(strlist)]

def main(Config, bit_stream_file):
    # Setup logging
    logging.basicConfig(
        format="%(asctime)s - %(levelname)s - %(name)s -   %(message)s",
        datefmt="%m/%d/%Y %H:%M:%S",
        level=logging.INFO,
    )
    logger.warning("device: %s", device)

    Training_Configs = Config.Training
    logger.info("*****************Parser Arguments*******************")
    logger.info("Training Configs")
    logger.info(json.dumps(Training_Configs))

    if Training_Configs.model_type in ["GPT"]:
        # only CLM

        if Training_Configs.model_type == "GPT":
            LM_Configs = Config.GPT
            tokenizer = GPT2Tokenizer.from_pretrained(LM_Configs.model_name_or_path)
            model = GPT2LMHeadModel.from_pretrained(LM_Configs.model_name_or_path)
            model.to(device)


        total_params = sum(p.numel() for p in model.parameters())
        logger.info("Total params: {:d}".format(total_params))
        total_trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
        logger.info("Trainable params: {:d}".format(total_trainable_params))


        Generation_Configs = Config.Generation
        logger.info("Generation Configs")
        logger.info(json.dumps(Generation_Configs))

        logger.info("generating bits stream")

        logger.info("loading bits stream from cache %s" %bit_stream_file)
        with open(bit_stream_file, 'r', encoding='utf8') as f:
            bit_stream = f.read().strip()
            bit_stream += bit_stream
            bit_stream += bit_stream
        bit_stream = list(bit_stream)
        random.shuffle(bit_stream)
        random.shuffle(bit_stream)
        bit_stream = ''.join(bit_stream)
        bit_index = int(torch.randint(0, high=100000, size=(1,)))

        logger.info("start generation")

        logger.info("using %s " % (Generation_Configs.alg))
        if Generation_Configs.alg.lower() == "adg":
            encoder_func = ADG_encoder
        else:
            logger.error("No such algorithm")
            exit()

        os.makedirs(Training_Configs.output_dir, exist_ok=True)
        model.eval()
        with torch.no_grad():
            with jsonlines.open(os.path.join(Training_Configs.output_dir, "MyGPTADG-stegos-encoding-test.jsonl"), "w") as f:
                stega_text = []
                stega_idx = 0
                while len(stega_text) < Generation_Configs.GENERATE_NUM:
                    # sample start word
                    stega_sentence = []
                    # TODO begin
                    prefix = ""
                    prompt_text = Training_Configs.prompt
                    encoded_prompt = tokenizer.encode(tokenizer.bos_token + prefix + prompt_text, add_special_tokens=False,
                                                      return_tensors="pt")
                    encoded_prompt = encoded_prompt.to(device)
                    input_ids = encoded_prompt
                    stega_bit = [''] * (input_ids.shape[-1]+1)
                    logits = model(input_ids).logits[:, -1, :]
                    logits -= logits.max()
                    probs = torch.exp(logits)
                    for forbidden_id in [tokenizer.bos_token_id, tokenizer.eos_token_id, tokenizer.unk_token_id]:
                        probs[:, forbidden_id] = 0
                    for forbidden_id in range(256):
                        probs[:, forbidden_id] = 0
                    samp = torch.multinomial(probs,1)
                    stega_sentence.append(int(samp.view(1,1)))
                    if Training_Configs.model_type == "GPT":
                        x = torch.cat([input_ids, samp], dim=1)


                    for i in range(Generation_Configs.MAX_GENERATE_LENGTH - 1):
                        if '_EOS' in stega_sentence:
                            break
                        # conditional probability distribution
                        # todo begin
                        log_prob = model(x).logits[:, -1, :]
                        log_prob -= log_prob.max()
                        prob = torch.exp(log_prob).reshape(-1)
                        if Training_Configs.model_type == "BART":
                            prob[tokenizer.unk_token_id] = 0
                        for forbidden_id in range(256):
                            prob[forbidden_id] = 0
                        # todo end
                        prob = prob / prob.sum()
                        # print(prob[tokenizer.eos_token_id])
                        # if prob.argmax() == tokenizer.eos_token_id:
                        #     break
                        if Generation_Configs.alg.lower() == "adg":
                            prev, num_bits_encoded = encoder_func(prob, bit_stream, bit_index, Generation_Configs)
                        # early stop generation
                        if int(prev) == tokenizer.eos_token_id:
                            break
                        stega_sentence.append(int(prev))
                        x = torch.cat([x, prev], dim=1)
                        stega_bit.append(bit_stream[bit_index:bit_index + num_bits_encoded])
                        bit_index += num_bits_encoded


                    # check is necessray
                    if tokenizer.eos_token_id in stega_sentence:
                        stega_sentence.remove(tokenizer.eos_token_id)
                    stega_text.append(tokenizer.decode(stega_sentence))
                    f.write({"stego": "_BOS " + tokenizer.decode(stega_sentence) + " _EOS",
                             "tokens": stega_sentence ,
                             "idx": stega_idx, "bits": stega_bit})
                    stega_idx += 1
    logger.info("finished generation")


if __name__ == '__main__':
    import argparse
    # t = T5Tokenizer.from_pretrained("t5-base")

    # 假设上述代码已经导入，并定义了主函数main
    # 先将"bit_stream_file"设置为文件路径字符串，比如：
    bit_stream_file_path = "./bit_stream.txt"

    parser = argparse.ArgumentParser(description="argument for generation")
    #parser.add_argument("--config_path", type=str, default="./Configs/commonsense-gpt-ac.json")
    #parser.add_argument("--config_path", type=str, default="./Configs/tweet-gpt.json")
    parser.add_argument("--config_path", type=str, default="./Configs/GPT2ADG_test.json")
    args = parser.parse_args()
    Config = utils.Config(args.config_path).get_configs()

    # 然后将它作为参数传递给主函数main：
    main(Config, bit_stream_file=bit_stream_file_path)

    #main(Config)
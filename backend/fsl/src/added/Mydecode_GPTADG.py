import argparse
import logging
import os

import jsonlines
import numpy as np
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

logger = logging.getLogger(__name__)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# e.g. [0, 1, 1, 1] looks like 1110=14
def bits2int(bits):
    res = 0
    for i, bit in enumerate(bits):
        res += bit * (2 ** i)
    return res

def int2bits(inp, num_bits):
    if num_bits == 0:
        return ""
    strlist = ('{0:0%db}' % num_bits).format(inp)
    return strlist[::-1]  # 返回字符串形式的比特流，反转顺序以保持正确顺序

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

def msb_bits2int(bits):
    res = 0
    for i, bit in enumerate(bits[::-1]):
        res += bit * (2 ** i)
    return res

def msb_int2bits(inp, num_bits):
    if num_bits == 0:
        return []
    strlist = ('{0:0%db}' % num_bits).format(inp)
    return [int(strval) for strval in strlist]

def find_nearest_list(prob, delta,):
    diff = (np.array(prob) - delta)
    tmp_idx = np.argmin(diff**2)
    if prob[tmp_idx] < delta:
        return_list = [tmp_idx]
        if tmp_idx == len(prob) -1:
            pass
        else:
            tmp_sum = prob[tmp_idx]
            for i in range(tmp_idx+1, len(prob)-1):
                if delta>(tmp_sum + prob[i]):
                    tmp_sum += prob[i]
                    return_list.append(i)
        return return_list
    elif tmp_idx >= len(prob)-2:
        return [tmp_idx]
    else:
        new_idx = tmp_idx + 1
        idx = [new_idx]
        idx += find_nearest_list(prob[new_idx+1:], delta-prob[new_idx])
        for i in range(1, len(idx)):
            idx[i] += new_idx+1
        # return idx
        if (delta-np.sum(np.array(prob)[idx]))**2 > diff[tmp_idx]**2:
            return [tmp_idx]
        else:
            return idx

def find_nearest(prob, delta,):
    diff = (np.array(prob) - delta)
    tmp_idx = np.argmin(diff**2)
    if prob[tmp_idx] < delta:
        return tmp_idx
    elif tmp_idx >= len(prob)-2:
        return tmp_idx
    else:
        new_idx = tmp_idx+1
        idx = find_nearest(prob[new_idx+1:], delta-prob[new_idx])
        idx += new_idx+1
        return idx

def decode_stego_text(stego_text):
    # Load GPT2 tokenizer and model
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    tokenizer.add_special_tokens({'pad_token': '[PAD]'})  # 添加填充标记
    model = GPT2LMHeadModel.from_pretrained("gpt2")
    model.to(device)

    # Check and remove "_BOS" and "_EOS" from stego_text
    if stego_text.startswith("_BOS "):
        stego_text = stego_text[len("_BOS "):]
    if stego_text.endswith(" _EOS"):
        stego_text = stego_text[:-len(" _EOS")]

    #print(stego_text)
    # Convert stego_text to integer sequence
    stego_tokens = tokenizer(stego_text, return_tensors="pt", padding=True, truncation=True)
    stego_tokens = stego_tokens.to(device)

    # Generate the decoded bit_stream
    with torch.no_grad():
        # 增加max_length
        output = model.generate(
            input_ids=stego_tokens["input_ids"],
            attention_mask=stego_tokens["attention_mask"],
            max_length=stego_tokens["attention_mask"].shape[1] + 100,  # 增加max_new_tokens
            do_sample=False,
            pad_token_id=tokenizer.eos_token_id,  # 设置pad_token_id为eos_token_id
        )
        decoded_tokens = output[:, stego_tokens["attention_mask"].shape[1]:]

    # Convert decoded_tokens to bit_stream
    bit_stream = ""
    for token_id in decoded_tokens[0]:
        bit_stream += int2bits(token_id.item(), num_bits=52)

    return bit_stream


def ADG_decoder(prob, prev, **kwargs):
    device = prob.device
    prob, indices = prob.sort(descending=True)
    # start recursion
    bit_tmp = 0
    extract_bits = ""
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
        bit_embed = ""
        for int_embed, result_tmp in enumerate(result):
            if prev in result_tmp[1]:
                bit_embed = "".join([str(b) for b in msb_int2bits(int_embed, bit)])
                break
        prob = torch.FloatTensor(result[int_embed][0]).to(device)
        indices = torch.LongTensor(result[int_embed][1]).to(device)
        prob = prob / prob.sum()
        prob, _ = prob.sort(descending=True)
        indices = indices[_]
        extract_bits += bit_embed
    return extract_bits


def main(stego_text_file):
    os.makedirs("generation/decoding/GPT2", exist_ok=True)

    with jsonlines.open(stego_text_file, 'r') as reader:
        for entry in reader:
            stego_text = entry["stego"]
            #print(stego_text)
            decoded_bit_stream = decode_stego_text(stego_text)
            with jsonlines.open(os.path.join("generation/decoding/GPT2", "MyGPTADGstegos-decoding-test.jsonl"), "a") as writer:
                writer.write({"decoded_bit_stream": decoded_bit_stream})

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="argument for decoding")
    parser.add_argument("--stego_text_file", type=str, default="generation/encoding/GPT2/MyGPTADG-stegos-encoding-test.jsonl")
    args = parser.parse_args()

    main(args.stego_text_file)

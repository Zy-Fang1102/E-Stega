import argparse
import logging
import os

import jsonlines
import numpy as np
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

logger = logging.getLogger(__name__)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def bits_to_int(bits):
    """
    将二进制位列表转换为整数。
    位列表中的低位在前，高位在后。
    
    Args:
        bits (list[int]): 二进制位列表，例如 [0, 1, 1, 1] 表示二进制 1110。

    Returns:
        int: 转换后的整数。
    """
    return sum(bit * (2 ** i) for i, bit in enumerate(bits))

def int_to_bits(inp, num_bits):
    """
    将整数转换为指定位数的二进制位字符串（低位在前）。

    Args:
        inp (int): 输入的整数。
        num_bits (int): 需要的二进制位数。

    Returns:
        str: 低位在前的二进制字符串表示。
    """
    if num_bits <= 0:
        return ""
    binary_str = f"{inp:0{num_bits}b}"
    return binary_str[::-1]

def num_same_from_beg(bits1, bits2):
    assert len(bits1) == len(bits2)
    for i in range(len(bits1)):
        if bits1[i] != bits2[i]:
            break
    return i

def msb_int2bits(inp, num_bits):
    if num_bits == 0:
        return []
    strlist = ('{0:0%db}' % num_bits).format(inp)
    return [int(strval) for strval in strlist]

def find_nearest_list(prob, delta):
    diff = np.abs(np.array(prob) - delta)  # 直接计算绝对值差
    tmp_idx = np.argmin(diff)  # 找到最小差值索引
    return_list = [tmp_idx]

    if tmp_idx < len(prob) - 1:
        tmp_sum = prob[tmp_idx]
        for i in range(tmp_idx + 1, len(prob)):
            if tmp_sum + prob[i] <= delta:
                tmp_sum += prob[i]
                return_list.append(i)
            else:
                break
    return return_list

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
        # 添加 pad_token_id 参数，确保生成的序列中不会因缺省而出错
        output = model.generate(
            input_ids=stego_tokens["input_ids"],
            attention_mask=stego_tokens["attention_mask"],
            max_length=stego_tokens["attention_mask"].shape[1] + 100,
            do_sample=False,
            pad_token_id=tokenizer.eos_token_id,  # 设置 pad_token_id 为 eos_token_id
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

        # 替换 del 操作为 pop，提高性能
        for i in range(2 ** bit - 1):
            result[i][0].append(prob.pop(0))
            result[i][1].append(indices.pop(0))
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

def m_bits2int(bits):
    res = 0
    for i, bit in enumerate(bits[::-1]):
        res += bit * (2 ** i)
    return res

def m_int2bits(inp, num_bits):
    if num_bits == 0:
        return []
    strlist = ('{0:0%db}' % num_bits).format(inp)
    return [int(strval) for strval in strlist]

def find_est(prob, delta,):
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

def findlist(prob, delta,):
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

import jsonlines
import os

def bpw(filename):
    bit_file = f"{filename}.bit"
    text_file = f"{filename}.txt"

    if not os.path.exists(bit_file):
        raise FileNotFoundError(f"File not found: {bit_file}")
    if not os.path.exists(text_file):
        raise FileNotFoundError(f"File not found: {text_file}")

    with open(bit_file, "r", encoding="utf-8") as f:
        bits = "".join(f.read().splitlines())

    with open(text_file, "r", encoding="utf-8") as f:
        words = [word for line in f for word in line.split()[1:]]

    # 计算并输出比特与单词的比例
    if words:  # 避免除以零
        ratio = len(bits) / len(words)
        print(f"{filename} : {ratio}")
    else:
        print(f"{filename} : No words found (division by zero).")


    def bpw_jsonlines(filename, max_num=None):
        import jsonlines

        with open(filename, "r", encoding="utf-8") as f:
            bits = []
            tokens = []
            for counter, text in enumerate(jsonlines.Reader(f), start=1):
                # 追加处理后的 bits 和 tokens
                bits.extend(text["bits"][2:-1])
                tokens.extend(text["tokens"][2:-1])

                # 如果设置了最大数量并达到了限制，则停止
                if max_num is not None and counter >= max_num:
                    break

        # 计算并输出比特与标记的比例
        if tokens:  # 避免除以零
            ratio = len(bits) / len(tokens)
            print(f"{filename} : {ratio}")
        else:
            print(f"{filename} : No tokens found (division by zero).")

def obj(obj):
    if not isinstance(obj, dict):
        return obj  # 如果输入不是字典，直接返回
    return MyDict(obj)  # 假设 MyDict 支持初始化时传入字典


if __name__ == '__main__':
    # # 单独调用 bpw 函数
    # bpw(filename="stego-grouping/reddit-0124-select-10000-with-isolated/grouping")

    # # 批量调用 bpw 函数，对不同的位数范围进行处理
    # for bit in range(1, 16):
    #     bpw(filename=f"../generation/stego-ac/reddit-0124-select-10000-with-isolated/topk-{bit}bit")

    # for bit in range(1, 6):
    #     bpw(filename=f"../generation/stego-hc/reddit-0124-select-10000-with-isolated/huffman-topk-{bit}bit")

    # for bit in range(1, 9):
    #     bpw(filename=f"stego-hc/graph/huffman-topk-{bit}bit")

    # bpw_jsonlines("generation/encoding/1124-news-ac-oov/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-news-ac/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-movie-ac-oov/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-movie-ac/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-tweet-ac-oov/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-tweet-ac/stegos-encoding.jsonl")
    # obj(  )
    bpw_jsonlines("generation/encoding/1124-movie-hc/stegos-encoding.jsonl")

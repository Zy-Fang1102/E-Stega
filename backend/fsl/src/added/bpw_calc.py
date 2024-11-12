import jsonlines

def bpw(filename):
    bit_file = f"{filename}.bit"
    text_file = f"{filename}.txt"

    # 读取 .bit 文件内容并拼接为一个字符串
    with open(bit_file, "r", encoding="utf-8") as f:
        bits = "".join(f.read().splitlines())

    # 读取 .txt 文件内容并提取所有单词（从每行的第二个元素开始）
    with open(text_file, "r", encoding="utf-8") as f:
        words = [word for line in f for word in line.split()[1:]]

    # 计算并输出比特与单词的比例
    if words:  # 避免除以零
        ratio = len(bits) / len(words)
        print(f"{filename} : {ratio}")
    else:
        print(f"{filename} : No words found (division by zero).")


def bpw_jsonlines(filename, max_num=None):
    with open(filename, "r", encoding="utf-8") as f:
        bits = []
        tokens = []
        counter = 0
        for text in jsonlines.Reader(f):
            bits += "".join(text["bits"][2:-1])
            tokens += text["tokens"][2:-1]
            counter += 1
            if max_num is not None and counter >= max_num:
                break
        print("%s : %s" % (filename, str(len(bits) / len(tokens))))

def obj(obj):
    if not isinstance(obj, dict):
        return obj
    d = MyDict()
    return d


if __name__ == '__main__':
    # bpw(filename="stego-grouping/reddit-0124-select-10000-with-isolated/grouping")
    # for bit in range(1,16):
    #     bpw(filename="../generation/stego-ac/reddit-0124-select-10000-with-isolated/topk-"+str(bit)+"bit")
    # for bit in range(1, 6):
    #     bpw(filename="../generation/stego-hc/reddit-0124-select-10000-with-isolated/huffman-topk-" + str(bit) + "bit")
    # for bit in range(1, 9):
    #     bpw(filename="stego-hc/graph/huffman-topk-" + str(bit) + "bit")

    # bpw_jsonlines("generation/encoding/1124-news-ac-oov/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-news-ac/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-movie-ac-oov/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-movie-ac/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-tweet-ac-oov/stegos-encoding.jsonl")
    # bpw_jsonlines("generation/encoding/1124-tweet-ac/stegos-encoding.jsonl")
    # obj(  )
    bpw_jsonlines("generation/encoding/1124-movie-hc/stegos-encoding.jsonl")

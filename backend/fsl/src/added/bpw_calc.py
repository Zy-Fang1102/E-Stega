import jsonlines

def bpw(filename):
    bit_file = filename+".bit"
    text_file = filename+".txt"
    with open(bit_file, "r", encoding="utf-8") as f:
        bits_lines = f.read().split("\n")
        bits = "".join(bits_lines)
    with open(text_file,"r",encoding="utf-8") as f:
        lines = f.readlines()
        words = []
        for line in lines:
            words+=line.split()[1:]
    print("%s : %s"%(filename, str(len(bits)/len(words))))


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
    bpw_jsonlines("generation/encoding/1124-movie-hc/stegos-encoding.jsonl")

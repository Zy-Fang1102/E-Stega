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

    if not words:
        logging.warning(f"No words found in {text_file}. Skipping ratio calculation.")
        return

    ratio = len(bits) / len(words)
    print(f"{filename} : {ratio}")


    def bpw_jsonlines(filename, max_num=None):
        import jsonlines

        with open(filename, "r", encoding="utf-8") as f:
            bits = []
            tokens = []
            for counter, text in enumerate(jsonlines.Reader(f), start=1):
                if not all(key in text for key in ["bits", "tokens"]):
                    logging.warning(f"Skipping invalid entry at line {counter}: {text}")
                    continue

                bits.extend(text["bits"][2:-1])
                tokens.extend(text["tokens"][2:-1])

                # 如果设置了最大数量并达到了限制，则停止
                if max_num is not None and counter >= max_num:
                    logging.info(f"Reached maximum number of entries ({max_num}). Stopping.")
                    break

        # 计算并输出比特与标记的比例
        if not tokens:
            logging.warning(f"No tokens found in {filename}. Division by zero avoided.")
            return

        ratio = len(bits) / len(tokens)
        logging.info(f"File: {filename} - Ratio of bits to tokens: {ratio:.4f}")
        print(f"{filename} : {ratio:.4f}")

def obj(obj):
    if not isinstance(obj, dict):
        logging.warning(f"Input is not a dictionary. Type: {type(obj)}")
        return obj
    return MyDict(obj)


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

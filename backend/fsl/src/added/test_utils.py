import unittest
from Myencode_GPTADG import bits2int, int2bits, num_same_from_beg

class TestUtils(unittest.TestCase):
    def test_bits2int(self):
        self.assertEqual(bits2int([1, 0, 1]), 5)

    def test_int2bits(self):
        self.assertEqual(int2bits(5, 3), [1, 0, 1])

    def test_num_same_from_beg(self):
        self.assertEqual(num_same_from_beg([1, 0, 1], [1, 0, 0]), 2)

if __name__ == "__main__":
    unittest.main()
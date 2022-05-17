from typing import List


def compute_N50(lengths: List[int]) -> float:
    tmp = []
    for tmp_number in set(lengths):
            tmp += [tmp_number] * lengths.count(tmp_number) * tmp_number
    tmp.sort()
 
    if (len(tmp) % 2) == 0:
        median = (tmp[int(len(tmp) / 2) - 1] + tmp[int(len(tmp) / 2)]) / 2
    else:
        median = tmp[int(len(tmp) / 2)]
 
    return median
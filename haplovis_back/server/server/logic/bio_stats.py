from typing import List

import numpy as np

# https://gist.github.com/dinovski/2bcdcc770d5388c6fcc8a656e5dbe53c
def compute_N50(lengths: List[int]) -> float:
    all_len = sorted(lengths, reverse=True)
    csum = np.cumsum(all_len)
    n2 = int(sum(lengths)/2)

    # get index for cumsum >= N/2
    csumn2 = min(csum[csum >= n2])
    ind = np.where(csum == csumn2)

    n50 = all_len[int(ind[0])]
    return n50
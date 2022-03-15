from typing import List
import numpy as np


def compute_histogram(nums: List[int]) -> List[float]:
    nums_np_array = np.array(nums, dtype=int)
    values, _ = np.histogram(nums_np_array, bins=10, density=True)
    return values.tolist()
    
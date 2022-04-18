from typing import List
import numpy as np

from server.cli.schemas.gfa import GfaHist


def compute_histogram(nums: List[int]) -> GfaHist:
    nums_np_array = np.array(nums, dtype=int)
    hist, bin_edges = np.histogram(nums_np_array, bins=10, density=False)
    return GfaHist(hist=hist.tolist(), bin_edges=bin_edges.tolist())


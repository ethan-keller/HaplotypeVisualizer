from typing import List


import numpy as np

from cli.schemas.layout import Bounds

def get_density_values(xs: List[Bounds], down_sample_factor: int = 1) -> List[int]:
    if xs is None:
        return None

    m = int(max(xs, key=lambda x: x.xr).xr)
    density = np.zeros((m + 1,), dtype=np.uint16)

    for seg in xs:
        l = max(0, int(seg.xl))
        r = max(0, int(seg.xr))
        density[l : r] += 1

    return density[::down_sample_factor].tolist()

def get_down_sample_factor(size: int) -> int:
    if size < 1000:
        return 1
    elif size < 5000:
        return 4
    elif size < 10000:
        return 8
    else:
        return 16

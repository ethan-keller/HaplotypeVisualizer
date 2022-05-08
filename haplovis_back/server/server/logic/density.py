from typing import List
import numpy as np
from cli.schemas.layout import Bounds


def get_density_values(xs: List[Bounds]) -> List[int]:
    if xs is None:
        return None

    m = int(max(xs, key=lambda x: x.xr).xr)
    density = np.zeros((m + 1,), dtype=np.uint8)

    for seg in xs:
        l = max(0, int(seg.xl))
        r = max(0, int(seg.xr))
        density[l:r] += np.uint8(1)

    return density.tolist()


def get_down_sample_factor(size: int) -> int:
    return max(1, size // 1000)

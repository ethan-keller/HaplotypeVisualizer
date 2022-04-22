from typing import List, Tuple


import numpy as np

from server.schemas.layout import Bounds

# TODO: downsampling?
def get_density_values(xs: List[Bounds]) -> Tuple[List[int], List[int]]:
    if xs is None:
        return None

    m = int(max(xs, key=lambda x: x.xr).xr)
    x = np.arange(0, m)
    density = np.zeros((m,), dtype=np.uint16)

    for seg in xs:
        l = seg.xl
        if (seg.xl == -1):
            l = 0
        density[l : seg.xr] += 1

    to_keep = density != 0

    x = x[to_keep]
    density = density[to_keep]

    return x.tolist(), density.tolist()

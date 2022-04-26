from typing import List


import numpy as np

from server.schemas.layout import Bounds

# TODO: downsampling?
def get_density_values(xs: List[Bounds], down_sample_factor: int = 1) -> List[int]:
    if xs is None:
        return None

    m = int(max(xs, key=lambda x: x.xr).xr)
    density = np.zeros((m + 1,), dtype=np.uint16)

    for seg in xs:
        l = seg.xl
        if (l < 0):
            l = 0
        density[l : seg.xr] += 1

    return density[::down_sample_factor].tolist()

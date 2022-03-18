from typing import List

from schemas.layout import HorizontalBounds
import numpy as np


def get_density_values(xs: List[HorizontalBounds]):
    if xs is None:
        return None

    m = int(max(xs, key=lambda x: x.x2).x2)
    x = np.arange(0, m)
    density = np.zeros((m,), dtype=np.uint16)

    for seg in xs:
        density[int(seg.x1):int(seg.x2)] += 1

    to_keep = density != 0

    x = x[to_keep]
    density = density[to_keep]

    return x, density
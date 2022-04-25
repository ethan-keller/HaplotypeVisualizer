# TODO: check if float is really needed instead of int
class Position:
    def __init__(self, x: float, y: float) -> None:
        self.x = x
        self.y = y


class Bounds:
    def __init__(self, xl: float, xr: float) -> None:
        self.xl = xl
        self.xr = xr

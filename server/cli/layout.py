from json import JSONDecoder, JSONEncoder
from pathlib import Path
from typing import Dict, Tuple, Union
from gfa import Gfa
from schemas.layout import Position, Bounds
from subprocess import check_output
from uuid import uuid4

from serialization import JsonSerializer


class Layout:
    def __init__(self, nodes: Dict[str, Tuple[Position, Bounds]]) -> None:
        self.nodes = nodes

    @classmethod
    def get_layout_from_file(cls, path: Path) -> "Layout":
        gfa = Gfa.read_gfa_from_file(path)
        layout = cls.compute_layout(gfa)
        return layout

    @classmethod
    def compute_layout(cls, gfa: Gfa) -> "Layout":
        try:
            file_path = Gfa.serialize(gfa, str(uuid4()) + ".json")
            out = check_output(["npx", "ts-node", "./cytoscape.ts", file_path], cwd="./graph_layout", shell=True)
            layout = cls.deserialize(out)
        except:
            raise Exception("Could not compute layout")

        return layout

    @classmethod
    def serialize(cls, layout: "Layout", out_file: str = None) -> str:
        return JsonSerializer.serialize(layout, out_file, LayoutEncoder)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes] = None, from_file: str = None) -> "Layout":
        return cls(**JsonSerializer.deserialize(sb, from_file, LayoutDecoder))


class LayoutEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__


class LayoutDecoder(JSONDecoder):
    def __init__(self, *args, **kwargs):
        JSONDecoder.__init__(self, object_hook=self.object_hook, *args, **kwargs)

    def object_hook(self, dct: Dict):
        if "x" in dct and "y" in dct:
            return Position(dct["x"], dct["y"])
        elif "xl" in dct and "xr" in dct:
            return Bounds(dct["xl"], dct["xr"])
        else:
            return dct


from json import JSONDecoder, JSONEncoder
import os
from pathlib import Path
from typing import Dict, Tuple, Union
from .gfa import Gfa
from .schemas.layout import Position, Bounds
from subprocess import check_output

from .serialization import JsonSerializer


class Layout:
    def __init__(self, nodes: Dict[str, Tuple[Position, Bounds]]) -> None:
        self.nodes = nodes

    @classmethod
    def get_layout_from_gfa_file(cls, gfa_path: Path) -> "Layout":
        gfa = Gfa.read_gfa_from_file(gfa_path)
        layout = cls.compute_layout(gfa, gfa_path)
        return layout

    @classmethod
    def get_layout_from_layout_file(cls, layout_path: Path) -> "Layout":
        return Layout.deserialize(from_file=layout_path.name)

    @classmethod
    def compute_layout(cls, gfa: Gfa, gfa_path: Path) -> "Layout":
        try:
            gfa_hash = Gfa.get_gfa_hash(gfa_path)
            file_path = Gfa.serialize(gfa, gfa_hash + ".gfa.json")
            out = check_output(["npx", "ts-node", "./cytoscape.ts", file_path], cwd="./cli/graph_layout", shell=True)
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


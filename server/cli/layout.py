from pathlib import Path
from typing import Dict, Tuple, Union
from gfa import Gfa
from schemas.layout import Position, Bounds
from subprocess import check_output

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
            serialized_gfa = Gfa.serialize(gfa)
            out = check_output(["npx", "ts-node", "./cytoscape.ts", serialized_gfa], cwd="./graph_layout", shell=True)
            layout = cls.deserialize(out)
        except:
            raise Exception("Could not compute layout")

        return layout

    @classmethod
    def serialize(cls, layout: "Layout") -> str:
        return JsonSerializer.serialize(layout)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes]) -> "Layout":
        return JsonSerializer.deserialize(sb)


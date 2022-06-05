from pydantic import parse_obj_as
from pathlib import Path
from typing import Union
from haplovis.schemas.layout import LayoutCLI as LayoutType
from haplovis.serialization import JsonSerializer


class Layout:
    def __init__(self, nodes: LayoutType) -> None:
        self.nodes = nodes

    @classmethod
    def serialize(cls, layout: "Layout", out_file: Path = None) -> Union[bytes, Path]:
        return JsonSerializer.serialize(layout.nodes, out_file)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes] = None, from_file: Path = None) -> "Layout":
        return cls(nodes=parse_obj_as(LayoutType, JsonSerializer.deserialize(sb, from_file)))

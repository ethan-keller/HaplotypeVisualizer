from pathlib import Path
from typing import Optional
from cli.gfa import Gfa
from cli.layout import Layout
import managers
from schemas.file import FileIndex


class GfaManager:
    gfa: Optional[Gfa] = None

    @classmethod
    def is_empty(cls) -> bool:
        return cls.gfa is None

    @classmethod
    def prepare_gfa(cls) -> None:
        if managers.FileManager.is_file_empty(FileIndex.GFA):
            raise ValueError("No GFA found. Cannot prepare for visualization.")

        file_name = "server_data/" + managers.FileManager.get_file(FileIndex.GFA).name
        cls.gfa = Gfa.read_gfa_from_file(file_name)

    @classmethod
    def recognize(cls, file_path: str) -> bool:
        return managers.LayoutManager.layout_for_gfa_exists(file_path)

    @classmethod
    def preprocess(cls) -> None:
        cls.prepare_gfa()
        file_name = "server_data/" + managers.FileManager.get_file(FileIndex.GFA).name
        file_path = Path(file_name)
        layout = Layout.compute_layout(cls.gfa, file_path)
        gfa_hash = Gfa.get_gfa_hash(file_name)
        layout_path = Layout.serialize(layout, gfa_hash + ".json")

    @classmethod
    def clear(cls) -> None:
        cls.gfa = None
        managers.LayoutManager.clear()

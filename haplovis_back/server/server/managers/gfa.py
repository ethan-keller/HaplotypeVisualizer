from pathlib import Path
from typing import Optional
from cli.schemas.gfa import Gfa as GfaDataclass
from cli.gfa import Gfa
from cli.kdtree import KDTree
from cli.layout import Layout
import server.managers as managers
from server.managers.files import FileManager
from server.managers.layout import LayoutManager
from server.schemas.file import FileIndex


class GfaManager:
    gfa: Optional[Gfa] = None

    @classmethod
    def is_empty(cls) -> bool:
        return cls.gfa is None

    def to_data_class(self) -> GfaDataclass:
        return GfaDataclass(segments=self.gfa.segments, links=self.gfa.links, paths=self.gfa.paths) 

    @classmethod
    def prepare_gfa(cls) -> None:
        if managers.FileManager.is_file_empty(FileIndex.GFA):
            raise ValueError("No GFA found. Cannot prepare for visualization.")
        gfa_file_path = FileManager.get_absolute_file_path(FileIndex.GFA)
        if cls.recognize(gfa_file_path):
            gfa_hash = cls.get_hash()
            print("deserializing gfa")
            cls.gfa = Gfa.deserialize(from_file=f"../cli/cli/out/{gfa_hash}.gfa.json")
            print("Done deserializing gfa")
        else:
            cls.gfa = Gfa.read_gfa_from_file(gfa_file_path)
            gfa_hash = cls.get_hash()
            Gfa.serialize(cls.gfa, out_file=f"../cli/cli/out/{gfa_hash}.gfa.json")
            
    @classmethod
    def recognize(cls, file_path: str) -> Optional[Path]:
        return managers.LayoutManager.index_for_gfa_exists(file_path)

    @classmethod
    def get_hash(cls) -> Optional[str]:
        if FileManager.is_file_empty(FileIndex.GFA):
            return None
        else:
            return Gfa.get_gfa_hash(FileManager.get_absolute_file_path(FileIndex.GFA))

    @classmethod
    def preprocess(cls) -> None:
        cls.prepare_gfa()
        file_path = FileManager.get_absolute_file_path(FileIndex.GFA)
        layout = Layout.compute_layout(cls.gfa, file_path)
        LayoutManager.index = LayoutManager.get_index_from_layout(layout)
        gfa_hash = Gfa.get_gfa_hash(file_path)
        if gfa_hash:
            layout_path = KDTree.serialize(LayoutManager.index, "../cli/cli/out/" + gfa_hash + ".pickle")
            LayoutManager.index_file_path = layout_path
        else:
            raise Exception("Could not compute gfa hash")

    @classmethod
    def clear(cls) -> None:
        cls.gfa = None
        managers.LayoutManager.clear()

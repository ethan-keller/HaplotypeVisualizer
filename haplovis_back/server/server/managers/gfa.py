from pathlib import Path
from typing import Dict, List, Optional, Set
from cli.schemas.gfa import Gfa as GfaDataclass, GfaLink, GfaPath, GfaSegment
from cli.gfa import Gfa
from cli.kdtree import KDTree
from cli.layout import Layout
import server.managers as managers
from server.managers.files import FileManager
from server.managers.layout import LayoutManager
from server.schemas.file import FileIndex


class GfaManager:
    gfa: Optional[Gfa] = None
    segment_map: Optional[Dict[str, GfaSegment]] = None
    link_map: Optional[Dict[str, List[GfaLink]]] = None
    path_map: Optional[Dict[int, GfaPath]] = None

    def to_data_class(self) -> GfaDataclass:
        if self.gfa is None:
            raise Exception("Cannot convert non-existent gfa to dataclass")
        return GfaDataclass(segments=self.gfa.segments, links=self.gfa.links, paths=self.gfa.paths)

    @classmethod
    def get_paths_by_index(cls, indices: List[int]) -> Dict[int, GfaPath]:
        if cls.path_map is None:
            raise Exception("Cannot get paths from empty GFA")
        result: Dict[int, GfaPath] = {}
        for i in indices:
            if i not in cls.path_map:
                raise Exception(f"Inexistent path with index {i}")
            result[i] = cls.path_map[i]
        return result

    @classmethod
    def create_segment_map(cls, segments: List[GfaSegment]) -> Dict[str, GfaSegment]:
        return {segment.name: segment for segment in segments}

    @classmethod
    def create_link_map(cls, links: List[GfaLink]) -> Dict[str, List[GfaLink]]:
        result: Dict[str, List[GfaLink]] = {}
        for link in links:
            if link.from_segment not in result:
                result[link.from_segment] = []
            if link.to_segment not in result:
                result[link.to_segment] = []
            result[link.from_segment].append(link)
            result[link.to_segment].append(link)
        return result

    @classmethod
    def get_link_from_link_id(cls, link_id: str) -> GfaLink:
        if cls.link_map is None:
            raise Exception("Cannot retrieve links because there is no link map")
        seg1, seg2 = Gfa.split_link_name(link_id)
        links = cls.get_links_from_segments([seg1])
        for link in links:
            if link.to_segment == seg2:
                return link
        raise Exception(f"Did not find link with id: {link_id}")

    @classmethod
    def get_links_from_segments(cls, segment_ids: List[str]) -> List[GfaLink]:
        result: Set[GfaLink] = set()
        if cls.link_map is None:
            raise Exception("Cannot retrieve links because there is no link map")
        else:
            for segment in segment_ids:
                if segment not in cls.link_map:
                    raise Exception(f"The segment id {segment} is not present in the link map")
                result.update(cls.link_map[segment])
            return list(result)

    @classmethod
    def get_segments_from_ids(cls, segment_ids: List[str]) -> List[GfaSegment]:
        return [cls.get_segment_from_id(segment_id) for segment_id in segment_ids]

    @classmethod
    def get_segment_from_id(cls, segment_id: str) -> GfaSegment:
        if cls.segment_map is None:
            raise Exception("Cannot retrieve segment because there is no segment map")
        elif segment_id not in cls.segment_map:
            raise Exception(f"The segment id {segment_id} is not present in the segment map")
        return cls.segment_map[segment_id]

    @classmethod
    def prepare_gfa(cls) -> None:
        if managers.FileManager.is_file_empty(FileIndex.GFA):
            raise ValueError("No GFA found. Cannot prepare for visualization.")
        gfa_file_path = FileManager.get_absolute_file_path(FileIndex.GFA)
        gfa_hash = cls.get_hash()
        if cls.recognize(gfa_file_path):
            print("deserializing gfa")
            cls.gfa = Gfa.deserialize(from_file=Path(f"../cli/cli/out/{gfa_hash}.gfa.json"))
            print("Done deserializing gfa")
        else:
            cls.gfa = Gfa.read_gfa_from_file(gfa_file_path)
            Gfa.serialize(cls.gfa, out_file=Path(f"../cli/cli/out/{gfa_hash}.gfa.json"))
        cls.segment_map = cls.create_segment_map(cls.gfa.segments)
        cls.link_map = cls.create_link_map(cls.gfa.links)
        cls.path_map = cls.create_path_map(cls.gfa.paths)

    @classmethod
    def create_path_map(cls, paths: List[GfaPath]) -> None:
        result: Dict[int, GfaPath] = {}
        for path in paths:
            result[path.index] = path
        cls.path_map = result

    @classmethod
    def recognize(cls, file_path: Path) -> Optional[Path]:
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
        layout = Layout.compute_layout(file_path)
        LayoutManager.index = LayoutManager.get_index_from_layout(layout)
        gfa_hash = Gfa.get_gfa_hash(file_path)
        if gfa_hash:
            layout_path = KDTree.serialize(LayoutManager.index, Path("../cli/cli/out/" + gfa_hash + ".pickle"))
            if isinstance(layout_path, Path):
                LayoutManager.index_file_path = layout_path
        else:
            raise Exception("Could not compute gfa hash")

    @classmethod
    def clear(cls) -> None:
        cls.gfa = None
        cls.segment_map = None
        managers.LayoutManager.clear()

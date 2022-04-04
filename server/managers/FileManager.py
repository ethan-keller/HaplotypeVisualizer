from typing import List
from os.path import isfile, splitext

from schemas.file import File, FileStatus, FileIndex
from managers.GfaManager import GfaManager
from managers.PhenoManager import PhenoManager
from managers.LayoutManager import LayoutManager


class FileManager:
    files_base_path = "C:\\Users\\ethan\\Documents\\TUDelft\\Honours Program\\HAPLOTYPE_VISUALISATION\\HaplotypeVisualizer\\server\\server_data\\"
    files: List[File] = [
        File(id=0, description="GFA file", status=FileStatus.NO_FILE, required=True, file_extensions=[".gfa"]),
        File(id=1, description="Phenotype table", status=FileStatus.NO_FILE, required=False, file_extensions=[".csv"]),
        File(id=2, description="GFF file", status=FileStatus.NO_FILE, required=False, file_extensions=[".gff"]),
    ]

    @classmethod
    def validate(cls, file_path: str, file_id: int) -> bool:
        # TODO: Maybe some other validation? File size etc? + separate exceptions?
        return cls.valid_id(file_id) and cls.file_exists(file_path) and cls.valid_file_extension(file_path, file_id)


    @classmethod
    def valid_id(cls, file_id: int) -> bool:
        return file_id > 0 and file_id < len(cls.files)

    @classmethod
    def valid_file_extension(cls, path: str, file_id: int) -> bool:
        valid_extensions = cls.files[file_id].file_extensions
        file_extension = cls.get_file_extension(path)
        
        return file_extension in valid_extensions

    @classmethod
    def are_required_files_ready_for_visualization(cls) -> bool:
        for file in cls.files:
            if file.required and file.status is not FileStatus.READY:
                return False
        return True

    @classmethod
    def file_exists(cls, path: str) -> bool:
        return isfile(path)

    @classmethod
    def get_file_extension(cls, path: str) -> str:
        _, extension = splitext(path)
        return extension

    @classmethod
    def prepare_files(cls) -> None:
        GfaManager.prepare_gfa()
        PhenoManager.prepare_pheno()

    @classmethod
    def clear_file_data(cls, id: int) -> None:
        if id == FileIndex.GFA:
            GfaManager.gfa = None
            LayoutManager.layout = None
            LayoutManager.bounds = None
        elif id == FileIndex.PHENO:
            PhenoManager.phenoTable = None

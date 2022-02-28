from os.path import isfile, splitext
from typing import List
from schemas.file import FileStatus
from schemas.file import FileIndex
from server_data.data import DataManager, LayoutManager
from server_data.data import files

from logic.gfa import prepare_gfa
from logic.pheno import prepare_pheno


def validate_file_extension(path: str, accepted_extensions: List[str]) -> bool:
    extension = get_extension(path)
    if extension not in accepted_extensions:
        return False
    else:
        return True


def are_required_files_uploaded() -> bool:
    for file in files:
        if file.required and file.status is not FileStatus.SUCCESFUL:
            return False
    return True


def file_exists(path: str) -> bool:
    return isfile(path)


def get_extension(path: str) -> str:
    _, extension = splitext(path)
    return extension


def prepare_files() -> None:
    # TODO: add other file preparations
    prepare_gfa()
    prepare_pheno()


def clear_file_data(id: int) -> None:
    if id == FileIndex.GFA:
        DataManager.gfa = None
        LayoutManager.layout = None
    elif id == FileIndex.PHENO:
        DataManager.phenoTable = None

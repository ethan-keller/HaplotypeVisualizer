from typing import List
from pydantic import FilePath
from schemas.file import UploadStatus
from server_data.data import files
from os.path import isfile, splitext


def validate_file_extension(path: str, accepted_extensions: List[str]) -> bool:
    extension = get_extension(path)
    if extension not in accepted_extensions:
        return False
    else:
        return True

def are_required_files_uploaded() -> bool:
    for file in files:
        if file.required and file.status is not UploadStatus.SUCCESSFUL_UPLOAD:
            return False
    return True

def file_exists(path: str) -> bool:
    return isfile(path)

def get_extension(path: str) -> str:
    _, extension = splitext(path)
    return extension

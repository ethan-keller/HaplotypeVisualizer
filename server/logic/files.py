from typing import List
from pydantic import FilePath
from server.schemas.file import UploadStatus
from server_data.data import files


def validate_file_extension(path: FilePath, accepted_extensions: List[str]) -> bool:
    if path.suffix not in accepted_extensions:
        return False
    else:
        return True

def are_required_files_uploaded() -> bool:
    for file in files:
        if file.required and file.status is not UploadStatus.SUCCESSFUL_UPLOAD:
            return False
    return True

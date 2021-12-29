from enum import IntEnum
from typing import List, Optional
from pydantic import BaseModel
from pydantic.types import FilePath


class UploadStatus(IntEnum):
    NO_UPLOAD = 0
    SUCCESSFUL_UPLOAD = 1
    WARNING_UPLOAD = 2

class FileIndex(IntEnum):
    GFA = 0
    PHENO = 1
    GFF = 2

class File(BaseModel):
    name: Optional[str] = None
    description: str
    status: UploadStatus
    required: bool
    file_extensions: List[str]


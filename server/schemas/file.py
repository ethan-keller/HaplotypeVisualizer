from enum import IntEnum
from typing import List, Optional
from pydantic import BaseModel
from pydantic.types import FilePath


class FileStatus(IntEnum):
    NO_FILE = 0
    SUCCESFUL = 1
    WARNING = 2


class FileIndex(IntEnum):
    GFA = 0
    PHENO = 1
    GFF = 2


class File(BaseModel):
    id: int
    name: Optional[str] = None
    description: str
    status: FileStatus
    required: bool
    file_extensions: List[str]


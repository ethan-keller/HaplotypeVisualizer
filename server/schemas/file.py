from enum import IntEnum
from typing import List, Optional
from pydantic import BaseModel


class FileStatus(IntEnum):
    NO_FILE = 0
    INVALID = 1
    NEEDS_PRE_PROCESSING = 2
    PRE_PROCESSING = 3
    READY = 4


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


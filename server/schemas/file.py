from enum import Enum
from typing import List, Optional
from pydantic import BaseModel

class UploadStatus(Enum):
	NO_UPLOAD = 0
	SUCCESSFUL_UPLOAD = 1
	WARNING_UPLOAD = 2

class File(BaseModel):
	name: Optional[str] = None
	description: str
	status: UploadStatus
	required: bool
	file_extensions: List[str]
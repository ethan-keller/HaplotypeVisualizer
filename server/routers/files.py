from os import stat
from typing import List

from fastapi import APIRouter, Query, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Body
from pydantic.types import FilePath
from schemas.file import File
from server_data.data import files

router = APIRouter(prefix="/files", tags=["files"])

responses = {status.HTTP_400_BAD_REQUEST: {"description": "Invalid file extension", "model": str}}


@router.get("/", response_model=File, summary="Get a specific needed file")
def getFiles(index: int = Query(..., ge=0, lt=len(files))):
    """
    Get a specific needed files by index.

    - **index**: Index of the file
    """
    return files[index]


@router.get("/all", response_model=List[File], summary="Get all needed files")
def getFiles():
    """
    Get the list of all needed files.
    """
    return files


@router.put(
    "/update", responses=responses, summary="Update the file path for a specific needed file",
)
def updateFilePath(path: FilePath, index: int = Query(..., ge=0, lt=len(files))):
    """
    Update the file path for one of the needed files.
    
    - **path**: File path
    - **index**: Index of the file
    """
    if path.suffix not in files[index].file_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"{path.suffix} files are not accepted for this entry"
        )
    files[index].path = path


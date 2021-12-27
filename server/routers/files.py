from typing import List

from fastapi import APIRouter, Query, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Body
from pydantic.types import FilePath
from schemas.file import File
from server_data.data import files

router = APIRouter(prefix="/files", tags=["files"])


@router.get(
    "/", response_model=List[File], status_code=status.HTTP_200_OK, summary="Get information about needed files"
)
def getFiles():
    '''
    Get the list of needed files.
    '''
    return files


@router.put("/update", status_code=status.HTTP_200_OK, summary="Update the file path for a specific file")
def updateFilePath(path: FilePath, index: int = Query(..., ge=0, lt=len(files))):
    '''
    Update the file path for one of the needed files.
    
    - **path**: File path
    - **index**: Index of the file
    '''
    files[index].path = path
    print(files)

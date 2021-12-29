from typing import List

from fastapi.param_functions import Path

import logic.files as FileLogic
from fastapi import APIRouter, Query, status
from fastapi.exceptions import HTTPException
from pydantic.types import DirectoryPath, FilePath
from schemas.file import File, UploadStatus
from server_data.data import files

router = APIRouter(prefix="/files", tags=["files"])

responses = {status.HTTP_400_BAD_REQUEST: {"description": "Invalid file extension", "model": str}}

base_path = "C:\\Users\\ethan\\Documents\\TUDelft\\Honours Program\\HAPLOTYPE_VISUALISATION\\HaplotypeVisualizer\\server\\server_data\\"


@router.get("/", response_model=File, summary="Get a specific needed file")
def getFiles(index: int = Query(..., ge=0, lt=len(files))):
    """
    Get a specific needed files by index.

    - **index**: Index of the file
    """
    return files[index]


@router.get("all_uploaded", response_model=bool, summary="Check if all required files are uploaded")
def are_all_uploaded():
    """
    Check if all the required files are uploaded.
    """
    return FileLogic.are_required_files_uploaded()


@router.get("/all", response_model=List[File], summary="Get all needed files")
def getFiles():
    """
    Get the list of all needed files.
    """
    return files


@router.put(
    "/update", responses=responses, summary="Update the file name for a specific needed file",
)
def updateFile(name: str, index: int = Query(..., ge=0, lt=len(files))):
    """
    Update the file information for one of the needed files.
    
    - **name**: File name
    - **index**: Index of the file
    """
    files[index].name = name
    files[index].status = UploadStatus.WARNING_UPLOAD

    file_path = base_path + name
    # TODO: Maybe some other validation? File size etc?
    # TODO: Different exceptions?
    if not FileLogic.file_exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"{file_path} is either not a file or non-existent"
        )

    if not FileLogic.validate_file_extension(file_path, files[index].file_extensions):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{FileLogic.get_extension(file_path)} files are not accepted for this entry",
        )
    else:
        files[index].status = UploadStatus.SUCCESSFUL_UPLOAD


@router.delete("/remove", summary="Remove file information for a specific needed file")
def removeFile(index: int = Query(..., ge=0, lt=len(files))):
    """
    Remove the file information for one of the needed files.

    **index**: Index of the file
    """
    files[index].name = None
    files[index].status = UploadStatus.NO_UPLOAD


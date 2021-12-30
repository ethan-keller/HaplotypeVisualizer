from typing import List

import logic.files as FileLogic
from fastapi import APIRouter, Query, status
from fastapi.exceptions import HTTPException
from schemas.file import File, UploadStatus
from server_data.data import files, files_base_path

router = APIRouter(prefix="/files", tags=["files"])


@router.get("/", response_model=File, summary="Get a specific needed file")
def getFiles(index: int = Query(..., ge=0, lt=len(files))):
    """
    Get a specific needed files by index.

    - **index**: Index of the file
    """
    return files[index]


@router.get("/ready", response_model=bool, summary="Check if all files are ready")
def are_all_uploaded():
    """
    Check if the server has all the necessary information to start visualizing
    """
    # TODO: Could potentially add other checks
    return FileLogic.are_required_files_uploaded()


@router.get("/all", response_model=List[File], summary="Get all needed files")
def getFiles():
    """
    Get the list of all needed files.
    """
    return files


@router.put(
    "/update",
    response_model=str,
    responses={status.HTTP_400_BAD_REQUEST: {"description": "Invalid file extension", "model": str}},
    summary="Update the file name for a specific needed file",
)
def updateFile(name: str, index: int = Query(..., ge=0, lt=len(files))):
    """
    Update the file information for one of the needed files.
    
    - **name**: File name
    - **index**: Index of the file
    """
    files[index].name = name
    files[index].status = UploadStatus.WARNING_UPLOAD

    file_path = files_base_path + name
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


@router.delete("/remove", response_model=str, summary="Remove file information for a specific needed file")
def removeFile(index: int = Query(..., ge=0, lt=len(files))):
    """
    Remove the file information for one of the needed files.

    **index**: Index of the file
    """
    files[index].name = None
    files[index].status = UploadStatus.NO_UPLOAD


@router.put(
    "/prepare",
    responses={status.HTTP_424_FAILED_DEPENDENCY: {"description": "Files not ready for preparation", "model": str}},
    response_model=bool,
    summary="Prepare the files for visualization",
)
def prepare():
    """
    Prepare the files for visualization (pre-processing, transformation, validation, data-structures etc).
    """
    try:
        FileLogic.prepare_files()
        return True
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_424_FAILED_DEPENDENCY,
            detail="The needed file paths were not uploaded. Files are not ready for preparation",
        )


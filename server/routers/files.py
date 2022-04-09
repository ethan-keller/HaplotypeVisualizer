from typing import List

from fastapi import APIRouter, Query, status
from fastapi.exceptions import HTTPException
from schemas.file import File, FileStatus, FileIndex
from managers.GfaManager import GfaManager
from managers.FileManager import FileManager

router = APIRouter(prefix="/files", tags=["files"])


@router.get("/", response_model=File, summary="Get a specific needed file")
def get_file(id: int = Query(..., ge=0, lt=len(FileManager.files))):
    """
    Get a specific needed files by id.

    - **id**: Id of the file
    """
    return FileManager.files[id]


@router.get("/ready", response_model=bool, summary="Check if all files are ready")
def are_all_files_ready():
    """
    Check if the server has all the necessary information to start visualizing
    """
    # TODO: Could potentially add other checks
    return FileManager.are_required_files_ready_for_visualization()


@router.get("/all", response_model=List[File], summary="Get all needed files")
def get_files():
    """
    Get the list of all needed files.
    """
    return FileManager.files


@router.put(
    "/update",
    response_model=str,
    responses={status.HTTP_400_BAD_REQUEST: {"description": "Invalid file extension", "model": str}},
    summary="Update the file name for a specific needed file",
)
def update_file(name: str, id: int = Query(..., ge=0, lt=len(FileManager.files))):
    """
    Update the file information for one of the needed files.
    
    - **name**: File name
    - **id**: Id of the file
    """
    FileManager.files[id].name = name
    file_path = FileManager.files_base_path + name

    try:
        FileManager.validate(file_path, id)
    except Exception as e:
        FileManager.files[id].status = FileStatus.INVALID
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"{name} is an invalid file. It did not pass validation: [{e.args[0]}]"
        )

    if id == FileIndex.GFA:
        if GfaManager.recognize(file_path):
            FileManager.files[id].status = FileStatus.READY
            raise NotImplementedError()
        else:
            FileManager.files[id].status = FileStatus.NEEDS_PRE_PROCESSING
    else:
        FileManager.files[id].status = FileStatus.READY


@router.put("/clear", summary="Clear file information for a specific needed file")
def remove_file(id: int = Query(..., ge=0, lt=len(FileManager.files))):
    """
    Clear the file information for one of the needed files.

    **id**: Id of the file
    """
    FileManager.files[id].name = None
    FileManager.files[id].status = FileStatus.NO_FILE
    FileManager.clear_file_data(id)


@router.put(
    "/prepare",
    responses={status.HTTP_424_FAILED_DEPENDENCY: {"description": "Files not ready for preparation", "model": str}},
    summary="Prepare the files for visualization",
)
def prepare():
    """
    Prepare the files for visualization (pre-processing, transformation, validation, data-structures etc).
    """
    try:
        FileManager.prepare_files()
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_424_FAILED_DEPENDENCY,
            detail="The needed file paths were not uploaded. Files are not ready for preparation",
        )


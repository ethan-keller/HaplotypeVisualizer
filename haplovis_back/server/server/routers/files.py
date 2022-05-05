from typing import List

from fastapi import APIRouter, Query, status, UploadFile, File as FastApiFile
from fastapi.exceptions import HTTPException
from server.schemas.file import File, FileStatus, FileIndex
from server.managers import FileManager, GfaManager, LayoutManager

router = APIRouter(prefix="/files", tags=["files"])


@router.get("/", response_model=File, summary="Get a specific needed file")
def get_file(id: int = Query(..., ge=0, lt=len(FileManager.files))):
    """
    Get a specific needed files by id.

    - **id**: Id of the file
    """
    try:
        return FileManager.get_file(id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.args[0],
        )


@router.get("/ready", response_model=bool, summary="Check if all files are ready")
def are_all_files_ready():
    """
    Check if the server has all the necessary information to start visualizing
    """
    # TODO: Could potentially add other checks
    return FileManager.are_required_files_ready_for_visualization()


@router.get("/all", response_model=List[File], summary="Get all files")
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
    file = FileManager.get_file(id)
    file.name = name
    file_path = FileManager.get_absolute_file_path(id)

    try:
        FileManager.validate(file_path, id)
    except Exception as e:
        file.status = FileStatus.INVALID
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{name} is an invalid file. It did not pass validation: [{e.args[0]}]",
        )

    if id == FileIndex.GFA:
        layout_file_path = GfaManager.recognize(file_path)
        if layout_file_path:
            LayoutManager.index_file_path = layout_file_path
            file.status = FileStatus.READY
        else:
            file.status = FileStatus.NEEDS_PRE_PROCESSING
    else:
        file.status = FileStatus.READY


@router.put("/clear", summary="Clear file information for a specific needed file")
def clear_file(id: int = Query(..., ge=0, lt=len(FileManager.files))):
    """
    Clear the file information for one of the needed files.

    **id**: Id of the file
    """
    FileManager.clear_file(id)


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
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_424_FAILED_DEPENDENCY,
            detail="The needed file paths were not uploaded. Files are not ready for preparation",
        )


@router.put("/preprocess", summary="Preprocess the GFA file")
def preprocess_gfa():
    """
    Preprocess the GFA file.
    """
    gfa_file = FileManager.get_file(FileIndex.GFA)
    if gfa_file.status == FileStatus.NO_FILE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"Cannot preprocess since GFA is not imported"
        )

    if gfa_file.status is not FileStatus.NEEDS_PRE_PROCESSING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{gfa_file.name} is either not ready for preprocessing or already preprocessed",
        )

    try:
        gfa_file.status = FileStatus.PRE_PROCESSING
        GfaManager.preprocess()
        gfa_file.status = FileStatus.READY
    except Exception as e:
        gfa_file.status = FileStatus.NEEDS_PRE_PROCESSING
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not preprocess {gfa_file.name}: [{e}]",
        )


@router.post("/layout", summary="Upload layout file")
def layout(layout_file: UploadFile = FastApiFile(...)):
    """
    Upload a layout file.
    """
    if FileManager.is_file_empty(FileIndex.GFA):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot upload layout file for an unimported gfa file",
        )

    gfa_hash = GfaManager.get_hash()
    if gfa_hash:
        try:
            layout_file_path = LayoutManager.store_index_in_default_out_dir(layout_file, gfa_hash)
            LayoutManager.index_file_path = layout_file_path
            FileManager.set_file_status(FileIndex.GFA, FileStatus.READY)
        except:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot store layout file",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot generate hash for gfa file",
        )

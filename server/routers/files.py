from typing import List

from fastapi import APIRouter, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException
from schemas.file import File
from server_data.data import files

router = APIRouter(prefix="/files", tags=["files"])


@router.get(
    "/getFiles", response_model=List[File], status_code=status.HTTP_200_OK, summary="Get info about needed files"
)
def getFiles():
	return files


# @router.post("/", response_model=Item, status_code=status.HTTP_201_CREATED, summary="Create an item")
# async def createItem(item: Item):
# 	"""
# 	Create an item with all the information:

# 	- **name**: each item must have a name
# 	- **description**: a long description
# 	- **price**: required
# 	- **tax**: if the item doesn't have tax, you can omit this
# 	- **tags**: a set of unique tag strings for this item
# 	"""
# 	if item.price < 30:
# 		raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="Item too cheap")
# 	print(jsonable_encoder(item))
# 	return item

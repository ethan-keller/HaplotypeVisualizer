from typing import Optional, Set

from fastapi import APIRouter, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/items", tags=["items"])


class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None
    tags: Set[str] = []


@router.post("/", response_model=Item, status_code=status.HTTP_201_CREATED, summary="Create an item")
async def createItem(item: Item):
    """
    Create an item with all the information:

    - **name**: each item must have a name
    - **description**: a long description
    - **price**: required
    - **tax**: if the item doesn't have tax, you can omit this
    - **tags**: a set of unique tag strings for this item
    """
    if item.price < 30:
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="Item too cheap")
    print(jsonable_encoder(item))
    return item

from fastapi import FastAPI

from routers import items, users

api = FastAPI()

api.include_router(items.router)


@api.get('/')
def root():
    return {"message": "Hello", "five": 2 + 3}

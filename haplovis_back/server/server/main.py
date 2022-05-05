from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routers import files, gfa, layout, pheno, bookmarks

origins = ["http://localhost:3000"]

server = FastAPI()
server.include_router(files.router)
server.include_router(gfa.router)
server.include_router(layout.router)
server.include_router(pheno.router)
server.include_router(bookmarks.router)
server.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@server.get("/")
def root():
    return {"message": "Hello", "five": 2 + 3}

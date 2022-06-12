from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from haplovis.server.config import settings
from haplovis.server.managers.files import FileManager
from haplovis.server.routers import files, gfa, layout, pheno, bookmarks

VERSION = "0.1.0"
SERVER_NAME = "Haplotype Visualizer Backend"

server = FastAPI()
server.include_router(files.router)
server.include_router(gfa.router)
server.include_router(layout.router)
server.include_router(pheno.router)
server.include_router(bookmarks.router)
server.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FileManager.set_folders(settings.folder)

@server.get("/", response_model=dict)
def root():
    return {"name": SERVER_NAME, "version": VERSION, "port": settings.port, "folder": settings.folder}
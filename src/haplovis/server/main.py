from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from haplovis.server.routers import files, gfa, layout, pheno, bookmarks

origins = ["http://localhost:3000"]
VERSION = "0.1.0"

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


@server.get("/", response_model=str)
def root():
    return f"Haplotype Visualizer Server\nversion: {VERSION}"
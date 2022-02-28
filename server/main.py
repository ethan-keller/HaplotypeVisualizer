from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import files, gfa, layout

origins = ["http://localhost:3000"]

server = FastAPI()
server.include_router(files.router)
server.include_router(gfa.router)
server.include_router(layout.router)
server.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

@server.get("/")
def root():
    return {"message": "Hello", "five": 2 + 3}

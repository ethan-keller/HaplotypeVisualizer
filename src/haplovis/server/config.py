from pathlib import Path
from pydantic import BaseSettings

class Settings(BaseSettings):
    port: int = 8000
    folder: Path = Path("../../data").resolve()

settings = Settings()
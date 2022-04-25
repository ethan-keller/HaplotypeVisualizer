from typing import Any, Dict, List
from pydantic import BaseModel


class PhenoTable(BaseModel):
    phenotypes: List[Dict[str, Any]]

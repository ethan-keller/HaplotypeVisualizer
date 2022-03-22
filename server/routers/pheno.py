from typing import Any, Dict, List
from fastapi import APIRouter, HTTPException, status
from schemas.pheno import PhenoTable
from server_data.data import PhenoManager


router = APIRouter(prefix="/pheno", tags=["pheno"])


@router.get("/", response_model=PhenoTable, summary="Get phenotype table")
def getPhenoTable():
    if PhenoManager.phenoTable is not None:
        return PhenoTable(phenotypes=PhenoManager.phenoTable.reset_index().to_dict("records"))
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find a pheno table")


@router.get(
    "/phenotypes",
    response_model=Dict[str, List[Any]],
    summary="Get all the possible phenotypes and their respective possible phenotypes",
)
def getPhenotypes():
    """
    Get all phenotypes and a list of possible values per phenotype.
    """
    if PhenoManager.phenotypes is not None:
        return PhenoManager.phenotypes
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find phenotypes")

from typing import Any, Dict
from fastapi import APIRouter, HTTPException, status
from schemas.pheno import PhenoTable
from server_data.data import DataManager


router = APIRouter(prefix="/pheno", tags=["pheno"])


@router.get("/", response_model=PhenoTable, summary="Get phenotype table")
def getPhenoTable():
    if DataManager.phenoTable is not None:
        return PhenoTable(phenotypes=DataManager.phenoTable.to_dict('records'))
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find a pheno table")

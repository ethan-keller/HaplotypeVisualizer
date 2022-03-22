from typing import Any, Dict
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
    "/phenotypes_by_sample",
    response_model=Dict[str, Dict[str, Any]],
    summary="Get a list of phenotypes for every sample",
)
def getPhenotypesBySample():
    if PhenoManager.phenoTable is not None:
        samples = PhenoManager.phenoTable.index.values
        phenotypes = PhenoManager.phenoTable.to_dict("records")

        result = {}
        for sample, phenotype in zip(samples, phenotypes):
            result[sample] = phenotype

        return result
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find a pheno table")

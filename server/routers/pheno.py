from typing import Any, Dict, List
from fastapi import APIRouter, HTTPException, status
from schemas.pheno import PhenoTable
from server_data.data import PhenoManager


router = APIRouter(prefix="/pheno", tags=["pheno"])


@router.get(
    "/", response_model=Dict[str, Dict[str, Any]], summary="Get a list of phenotypes for every sample",
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


@router.get("/samples", response_model=List[str], summary="Get a list of all sample names found in the phenotable")
def getSampleNames():
    if PhenoManager.phenoTable is not None:
        return list(PhenoManager.phenoTable.index.values)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find phenotypes")


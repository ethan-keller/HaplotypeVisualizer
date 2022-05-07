from typing import Any, Dict, List
from fastapi import APIRouter, HTTPException, status
from server.managers import PhenoManager


router = APIRouter(prefix="/pheno", tags=["pheno"])


@router.get(
    "/",
    response_model=Dict[str, Dict[str, Any]],
    summary="Get a dict of phenotypes for every sample",
)
def get_phenotypes_per_sample():
    if PhenoManager.pheno_per_sample is not None:
        return PhenoManager.pheno_per_sample
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find pheno information")


@router.put(
    "/phenos_per_segment",
    response_model=Dict[str, Dict[str, List[Any]]],
    summary="Get a dict of phenotypes for every segment",
)
def get_phenotypes_per_segment(segments: List[str]):
    if PhenoManager.pheno_per_segment is not None:
        result: Dict[str, Dict[str, List[Any]]] = {}
        for segment in segments:
            if segment not in PhenoManager.pheno_per_segment:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=f"Could not find segment {segment} in phenotype map"
                )
            result[segment] = PhenoManager.pheno_per_segment[segment]
        return result
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find pheno information")


@router.get(
    "/phenotypes",
    response_model=Dict[str, List[Any]],
    summary="Get all the possible phenotypes and their respective possible phenotypes",
)
def get_phenotypes():
    """
    Get all phenotypes and a list of possible values per phenotype.
    """
    if PhenoManager.phenotypes is not None:
        return PhenoManager.phenotypes
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find phenotypes")


@router.get("/samples", response_model=List[str], summary="Get a list of all sample names found in the phenotable")
def get_sample_names():
    if PhenoManager.pheno_per_sample is not None:
        return list(PhenoManager.pheno_per_sample.keys())
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not find phenotypes")

from typing import Any, Dict, List, Set
from fastapi import APIRouter, HTTPException, status
from server.managers import PhenoManager
from server.managers.gfa import GfaManager


router = APIRouter(prefix="/pheno", tags=["pheno"])


@router.get(
    "/",
    response_model=Dict[str, Dict[str, Any]],
    summary="Get a list of phenotypes for every sample",
)
def get_phenotypes_per_sample():
    if PhenoManager.pheno_per_sample is not None:
        return PhenoManager.pheno_per_sample
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not find a pheno information")


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


# @router.put("/phenotype", response_model=Dict[str, Dict[int, Any]], summary="Get a phenotypes for specific samples")
# def get_phenotype_for_samples(sample_indices: List[int]):
#     if GfaManager.path_map is None:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"No path map is present")
#     if PhenoManager.pheno_per_sample_index is None:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not find phenotypes")

#     result: Dict[str, Dict[int, Any]] = {}
#     for sample_index in sample_indices:
#         if sample_index in GfaManager.path_map:
#             sample = GfaManager.path_map[sample_index]
#             if sample.name in PhenoManager.pheno_per_sample_index:
#                 sample_phenotypes = PhenoManager.pheno_per_sample_index[sample.name]
#                 for k, v in sample_phenotypes.items():
#                     if k not in result:
#                         result[k] = {}
#                     result[k][sample_index] = v
#             else:
#                 raise HTTPException(
#                     status_code=status.HTTP_400_BAD_REQUEST,
#                     detail=f"Could not find sample name {sample.name} in pheno table",
#                 )
#         else:
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST, detail=f"Could not find index {sample_index} in path map"
#             )
#     return result


@router.get("/samples", response_model=List[str], summary="Get a list of all sample names found in the phenotable")
def get_sample_names():
    if PhenoManager.pheno_table is not None:
        return list(PhenoManager.pheno_table.index.values)
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not find phenotypes")

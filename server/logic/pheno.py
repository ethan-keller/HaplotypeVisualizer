from typing import Any, List, Dict
import pandas as pd
from schemas.file import FileIndex
from server_data.data import PhenoManager, FileManager


def prepare_pheno():
    file_name = FileManager.files[FileIndex.PHENO].name
    if file_name:
        try:
            # TODO: check for correct read else handle error
            phenos_dp = pd.read_csv(FileManager.files_base_path + file_name)
            phenos_dp.set_index(phenos_dp.columns.values[0], inplace=True)
            PhenoManager.phenoTable = phenos_dp
            PhenoManager.phenotypes = get_possible_phenotypes(phenos_dp)
        except:
            raise ValueError(f"Reading pandas dataframe from {file_name} failed.")

def get_possible_phenotypes(phenos_dp: pd.DataFrame) -> Dict[str, List[Any]]:
    result = {}
    phenotypes = phenos_dp.columns
    for phenotype in phenotypes:
        result[phenotype] = phenos_dp[phenotype].unique().tolist()
    
    return result
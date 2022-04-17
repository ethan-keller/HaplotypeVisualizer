from typing import Optional, Dict, List, Any
import pandas as pd
import managers
from schemas.file import FileIndex


class PhenoManager:
    phenoTable: Optional[pd.DataFrame] = None
    phenotypes: Dict[str, List[Any]] = {}

    @classmethod
    def prepare_pheno(cls) -> None:
        if managers.FileManager.is_file_empty(FileIndex.PHENO):
            return None
            # raise ValueError("No phenotype information found. Cannot prepare for visualization.")

        file_name = managers.FileManager.get_file(FileIndex.PHENO).name

        try:
            phenos_dp = pd.read_csv(managers.FileManager.files_base_path + file_name)
            phenos_dp.set_index(phenos_dp.columns.values[0], inplace=True)
            cls.phenoTable = phenos_dp
            cls.phenotypes = cls.get_possible_phenotypes(phenos_dp)
        except:
            raise ValueError(f"Reading pandas dataframe from {file_name} failed.")

    @classmethod
    def get_possible_phenotypes(cls, phenos_dp: pd.DataFrame) -> Dict[str, List[Any]]:
        result = {}
        phenotypes = phenos_dp.columns
        for phenotype in phenotypes:
            result[phenotype] = phenos_dp[phenotype].unique().tolist()

        return result

    @classmethod
    def clear(cls):
        cls.phenoTable = None
        cls.phenotypes = {}

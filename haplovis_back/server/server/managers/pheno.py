from typing import Optional, Dict, List, Any
import pandas as pd
import server.managers as managers
from server.schemas.file import FileIndex


class PhenoManager:
    phenoTable: Optional[pd.DataFrame] = None
    phenotypes: Optional[Dict[str, List[Any]]] = None

    @classmethod
    def prepare_pheno(cls) -> None:
        if managers.FileManager.is_file_empty(FileIndex.PHENO):
            return None

        file_name = managers.FileManager.get_file(FileIndex.PHENO).name

        try:
            phenos_dp = pd.read_csv(managers.FileManager.FILE_BASE_PATH + file_name)
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
        cls.phenotypes = None

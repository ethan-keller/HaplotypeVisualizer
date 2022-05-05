from typing import Optional, Dict, List, Any
import pandas as pd
import server.managers as managers
from server.schemas.file import FileIndex


class PhenoManager:
    pheno_table: Optional[pd.DataFrame] = None
    phenotypes: Optional[Dict[str, List[Any]]] = None
    pheno_per_sample: Optional[Dict[str, Dict[str, Any]]] = None

    @classmethod
    def prepare_pheno(cls) -> None:
        if managers.FileManager.is_file_empty(FileIndex.PHENO):
            return None

        file_name = managers.FileManager.get_file(FileIndex.PHENO).name

        try:
            phenos_dp = pd.read_csv(managers.FileManager.FILE_BASE_PATH + file_name)
            phenos_dp.set_index(phenos_dp.columns.values[0], inplace=True)
            cls.pheno_table = phenos_dp
            cls.phenotypes = cls.get_possible_phenotypes()
            cls.pheno_per_sample = cls.create_pheno_per_sample()
        except Exception as e:
            raise ValueError(f"Reading pandas dataframe from {file_name} failed: [{e}]")

    @classmethod
    def create_pheno_per_sample(cls) -> Optional[Dict[str, Dict[str, Any]]]:
        if cls.pheno_table is not None:
            samples = cls.pheno_table.index.values
            phenotypes = cls.pheno_table.to_dict("records")

            result = {}
            for sample, phenotype in zip(samples, phenotypes):
                result[sample] = phenotype

            return result
        else:
            return None

    @classmethod
    def get_possible_phenotypes(cls) -> Optional[Dict[str, List[Any]]]:
        if cls.pheno_table is not None:
            result = {}
            phenotypes = cls.pheno_table.columns
            for phenotype in phenotypes:
                result[phenotype] = cls.pheno_table[phenotype].unique().tolist()

            return result
        else:
            return None

    @classmethod
    def clear(cls):
        cls.pheno_table = None
        cls.phenotypes = None

from typing import Optional, Dict, List, Any
import pandas as pd
import haplovis.server.managers as managers
from haplovis.schemas.file import FileIndex


class PhenoManager:
    phenotypes: Optional[Dict[str, List[Any]]] = None
    pheno_per_sample: Optional[Dict[str, Dict[str, Any]]] = None

    @classmethod
    def prepare_pheno(cls) -> None:
        if managers.FileManager.is_file_empty(FileIndex.PHENO):
            return None

        file_name = managers.FileManager.get_file(FileIndex.PHENO).name

        try:
            phenos_dp = pd.read_csv(managers.FileManager.data_folder.joinpath(file_name))
            phenos_dp.set_index(phenos_dp.columns.values[0], inplace=True)
            cls.phenotypes = cls.get_possible_phenotypes(pheno_table=phenos_dp)
            cls.pheno_per_sample = cls.create_pheno_per_sample(pheno_table=phenos_dp)
        except Exception as e:
            raise ValueError(f"Reading pandas dataframe from {file_name} failed: [{e}]")

    @classmethod
    def create_pheno_per_segment(cls) -> Optional[Dict[str, Dict[str, List[Any]]]]:
        if cls.pheno_per_sample is None:
            raise Exception("Cannot create pheno segment map without pheno sample map")

        if managers.GfaManager.segment_map is None:
            raise Exception("Cannot create pheno segment map without segment map")

        result: Dict[str, Dict[str, List[Any]]] = {}
        for name, segment in managers.GfaManager.segment_map.items():
            result[name] = {}
            for path in segment.paths:
                pheno = cls.pheno_per_sample[path]
                for phenotype, pheno_value in pheno.items():
                    if phenotype not in result[name]:
                        result[name][phenotype] = []
                    result[name][phenotype].append(pheno_value)

        return result

    @classmethod
    def create_pheno_per_sample(cls, pheno_table: pd.DataFrame) -> Optional[Dict[str, Dict[str, Any]]]:
        if pheno_table is not None:
            samples = pheno_table.index.values
            phenotypes = pheno_table.to_dict("records")

            result: Dict[str, Dict[str, Any]] = {}
            for sample, phenotype in zip(samples, phenotypes):
                result[sample] = phenotype

            return result
        else:
            return None

    @classmethod
    def get_possible_phenotypes(cls, pheno_table: pd.DataFrame) -> Optional[Dict[str, List[Any]]]:
        if pheno_table is not None:
            result = {}
            phenotypes = pheno_table.columns
            for phenotype in phenotypes:
                result[phenotype] = pheno_table[phenotype].unique().tolist()

            return result
        else:
            return None

    @classmethod
    def clear(cls):
        cls.phenotypes = None
        cls.pheno_per_sample = None

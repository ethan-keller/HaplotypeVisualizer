import pandas as pd
from schemas.file import FileIndex
from server_data.data import PhenoManager, FileManager


def prepare_pheno():
    file_name = FileManager.files[FileIndex.PHENO].name
    if file_name:
        try:
            phenos_dp = pd.read_csv(FileManager.files_base_path + file_name)
            phenos_dp.set_index(phenos_dp.columns.values[0], inplace=True)
            PhenoManager.phenoTable = phenos_dp
        except:
            raise ValueError(f"Reading pandas dataframe from {file_name} failed.")

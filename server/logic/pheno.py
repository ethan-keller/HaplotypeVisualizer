import pandas as pd
from schemas.file import FileIndex
from server_data.data import DataManager
from server_data.data import files
from server_data.data import files_base_path

def prepare_pheno():
    file_name = files[FileIndex.PHENO].name
    if file_name:
        try:
            phenos_dp = pd.read_csv(files_base_path + file_name)
            DataManager.phenoTable = phenos_dp
        except:
            raise ValueError(f'Reading pandas dataframe from {file_name} failed.')

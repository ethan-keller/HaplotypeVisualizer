from gfapy import Gfa
from schemas.file import FileIndex
from server_data.data import files, gfa, files_base_path

def prepare_gfa() -> None:
    file_name = files[FileIndex.GFA].name
    if file_name:
        gfa = Gfa.from_file(files_base_path + file_name)
    else:
        raise ValueError("Since the GFA file path has not been uploaded, the GFA file cannot be prepared")

from typing import List, Optional

from gfapy.gfa import Gfa as GfaPy
from schemas.file import File, FileStatus
from schemas.gfa import Gfa

files_base_path = "C:\\Users\\ethan\\Documents\\TUDelft\\Honours Program\\HAPLOTYPE_VISUALISATION\\HaplotypeVisualizer\\server\\server_data\\"

files: List[File] = [
    File(id=0, description="GFA file", status=FileStatus.NO_FILE, required=True, file_extensions=[".gfa"]),
    File(id=1, description="Phenotype table", status=FileStatus.NO_FILE, required=False, file_extensions=[".csv"]),
    File(id=2, description="GFF file", status=FileStatus.NO_FILE, required=False, file_extensions=[".gff"]),
]

# TODO: Handle case where user deletes gfa file (--> delete the gfa object?)
class DataManager:
    __gfa: GfaPy = None
    gfa: Optional[Gfa] = None

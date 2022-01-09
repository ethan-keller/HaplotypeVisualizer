from typing import List, Optional

from gfapy.gfa import Gfa as GfaPy
from schemas.file import File, UploadStatus
from schemas.gfa import Gfa

files_base_path = "C:\\Users\\ethan\\Documents\\TUDelft\\Honours Program\\HAPLOTYPE_VISUALISATION\\HaplotypeVisualizer\\server\\server_data\\"

files: List[File] = [
    File(description="GFA file", status=UploadStatus.NO_UPLOAD, required=True, file_extensions=[".gfa"]),
    File(description="Phenotype table", status=UploadStatus.NO_UPLOAD, required=False, file_extensions=[".csv"]),
    File(description="GFF file", status=UploadStatus.NO_UPLOAD, required=False, file_extensions=[".gff"]),
]

# TODO: Handle case where user deletes gfa file (--> delete the gfa object?)
class GfaManager:
    __gfa: GfaPy = None
    gfa: Optional[Gfa] = None

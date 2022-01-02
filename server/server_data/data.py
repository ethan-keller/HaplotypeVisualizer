from typing import List

from gfapy.gfa import Gfa

from schemas.file import File, UploadStatus

files_base_path = "C:\\Users\\ethan\\Documents\\TUDelft\\Honours Program\\HAPLOTYPE_VISUALISATION\\HaplotypeVisualizer\\server\\server_data\\"

files: List[File] = [
    File(description="GFA file", status=UploadStatus.NO_UPLOAD, required=True, file_extensions=[".gfa"]),
    File(description="Phenotype table", status=UploadStatus.NO_UPLOAD, required=False, file_extensions=[".csv"]),
    File(description="GFF file", status=UploadStatus.NO_UPLOAD, required=False, file_extensions=[".gff"]),
]


class GfaManager:
    gfa: Gfa = None

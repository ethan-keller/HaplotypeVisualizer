from typing import List

from schemas.file import File, UploadStatus

files: List[File] = [
    File(description="GFA file", status=UploadStatus.NO_UPLOAD, required=True, file_extensions=[".gfa"]),
    File(description="Phenotype table", status=UploadStatus.NO_UPLOAD, required=False, file_extensions=[".csv"]),
    File(description="GFF file", status=UploadStatus.NO_UPLOAD, required=False, file_extensions=[".gff"]),
]

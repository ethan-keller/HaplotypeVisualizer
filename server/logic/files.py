from typing import List
from pydantic import FilePath


def validate_file_extension(path: FilePath, accepted_extensions: List[str]):
    if path.suffix not in accepted_extensions:
        return False
    else:
        return True

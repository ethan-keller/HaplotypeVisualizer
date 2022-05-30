import os
from pathlib import Path
from typing import Any, Union
from pickle import loads as p_loads, dumps as p_dumps, load as p_load, dump as p_dump
from orjson import loads as j_loads, dumps as j_dumps


class PickleSerializer:
    @classmethod
    def serialize(cls, o: Any, out_file: Path = None) -> Union[bytes, Path]:
        if out_file:
            file_path = out_file
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "wb") as f:
                p_dump(o, f)
                return Path(f.name)
        else:
            return p_dumps(o)

    @classmethod
    def deserialize(cls, b: bytes = None, from_file: Path = None) -> Any:
        if from_file:
            with open(from_file, "rb") as f:
                return p_load(f)
        elif b:
            return p_loads(b)


class JsonSerializer:
    @classmethod
    def serialize(cls, o: Any, out_file: Path = None) -> Union[bytes, Path]:
        if out_file:
            file_path = out_file
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "wb") as f:
                f.write(j_dumps(o))
                return Path(f.name)
        else:
            return j_dumps(o)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes] = None, from_file: Path = None) -> Any:
        if from_file:
            with open(from_file, "r") as f:
                return j_loads(f.read())
        elif sb:
            return j_loads(sb)

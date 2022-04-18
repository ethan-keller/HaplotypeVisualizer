import os
from typing import Any, Type, Union
from pickle import loads as p_loads, dumps as p_dumps, load as p_load, dump as p_dump
from json import JSONDecoder, JSONEncoder, loads as j_loads, dumps as j_dumps, load as j_load, dump as j_dump

# TODO: Add try except blocks?


class PickleSerializer:
    @classmethod
    def serialize(cls, o: Any, out_file: str = None) -> Union[bytes, str]:
        if out_file:
            file_path = out_file
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "wb") as f:
                p_dump(o, f)
                return f.name
        else:
            return p_dumps(o)

    @classmethod
    def deserialize(cls, b: bytes = None, from_file: str = None) -> Any:
        if from_file:
            with open(from_file, "rb") as f:
                return p_load(f)
        elif b:
            return p_loads(b)


class JsonSerializer:
    @classmethod
    def serialize(cls, o: Any, out_file: str = None, encoder: Type[JSONEncoder] = None) -> str:
        if out_file:
            file_path = out_file
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, "w") as f:
                j_dump(o, f, cls=encoder)
                return f.name
        else:
            return j_dumps(o, cls=encoder)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes] = None, from_file: str = None, decoder: Type[JSONDecoder] = None) -> Any:
        if from_file:
            with open(from_file, "r") as f:
                return j_load(f, cls=decoder)
        elif sb:
            return j_loads(sb, cls=decoder)


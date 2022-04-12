from typing import Any, Union
from pickle import loads as p_loads, dumps as p_dumps
from json import loads as j_loads, dumps as j_dumps


class PickleSerializer:
    @classmethod
    def serialize(cls, o: Any) -> bytes:
        return p_dumps(o)

    @classmethod
    def deserialize(cls, b: bytes) -> Any:
        return p_loads(b)


class JsonSerializer:
    @classmethod
    def serialize(cls, o: Any) -> str:
        return j_dumps(o)

    @classmethod
    def deserialize(cls, sb: Union[str, bytes]) -> Any:
        return j_loads(sb)

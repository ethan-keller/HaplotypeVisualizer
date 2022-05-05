class PydanticConversionError(Exception):
    """Exception raised for errors when converting third party types to pydantic types.

    Attributes:
        from_type -- Third party type name
        to_type -- Pydantic type name
        reason -- explanation of the error
        message -- error message
    """

    def __init__(
        self,
        from_type: str,
        to_type: str,
        reason: str,
        message: str = "Could not convert thrid party type to Pydantic type",
    ):
        self.from_type = from_type
        self.to_type = to_type
        self.reason = reason
        self.message = f"Could not convert third party type: {from_type} to Pydantic type: {to_type}\nReason: {reason}"
        super().__init__(self.message)

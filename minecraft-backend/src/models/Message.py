from pydantic import BaseModel
class AuthMessageRequest(BaseModel):
    user: str
    password: str

class ValidateAuthCodeRequest(BaseModel):
    user: str
    code: str

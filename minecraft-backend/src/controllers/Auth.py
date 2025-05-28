import random
from fastapi import Depends, HTTPException, Header, status
from src.models.Settings import Settings

settings = Settings()

def makeAuthCode():
    return random.randint(100000, 999999)

def verify_api_key(authorization: str = Header(...)):
    expected = f"Bearer {settings.api_key}"
    if authorization != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key"
        )
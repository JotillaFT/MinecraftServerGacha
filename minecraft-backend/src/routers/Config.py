from fastapi import APIRouter, Depends
from src.models.Settings import Settings
from src.controllers.JWT import get_current_user
import json

router = APIRouter()
settings = Settings()

@router.get("/info")
async def get_info():
    json_info = json.loads(settings.server_info)
    return json_info
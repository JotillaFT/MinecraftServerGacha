from fastapi import APIRouter, Depends
from mcrcon import MCRcon
from src.controllers.JWT import get_current_user
from src.models.Settings import Settings
import re

router = APIRouter()
settings = Settings()

@router.get("/players",dependencies=[Depends(get_current_user)])
async def get_players():
    with MCRcon(settings.minecraft_rcon_url, settings.minecraft_rcon_password, port=settings.minecraft_rcon_port) as mcr:
        resp = mcr.command("/list")
    
    match = re.search(r'players online: (.*)', resp)
    if match:
        players_str = match.group(1).strip()
        if players_str:
            players = [p.strip() for p in players_str.split(',')]
        else:
            players = []
    else:
        players = []
    return {"players": players}

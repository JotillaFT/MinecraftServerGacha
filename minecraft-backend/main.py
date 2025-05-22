from fastapi import FastAPI
from src.models.Settings import Settings
from src.models.Message import AuthMessageRequest, ValidateAuthCodeRequest
from src.controllers.Auth import makeAuthCode
from mcrcon import MCRcon
import time
import json

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O especifica tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


settings = Settings()
auth_codes = {}

@app.post("/register")
async def auth_message(request: AuthMessageRequest):
    code = makeAuthCode()
    expire = time.time() + 120  # 2 minutos en segundos
    auth_codes[request.user] = (code, expire,request.password)

    with MCRcon(settings.minecraft_rcon_url, settings.minecraft_rcon_password, port=settings.minecraft_rcon_port) as mcr:
        title_json = {
            "text": f"Codigo Verificacion: {code}",
            "bold": True,
            "color": "yellow"
        }
        mcr.command(f"/title {request.user} times 20 700 20")
        resp = mcr.command(f"/title {request.user} title {json.dumps(title_json)}")
        return {"status": "ok", "rcon_response": resp}
    

@app.post("/validateAuthCode")
async def validate_auth_code(request: ValidateAuthCodeRequest):
    user = request.user
    code = int(request.code)
    if user in auth_codes:
        stored_code, expire, password = auth_codes[user]
        if time.time() < expire and stored_code == code:
            del auth_codes[user]
            return {"status": "success"}
        elif time.time() >= expire:
            del auth_codes[user]
            return {"status": "expired"}
    return {"status": "invalid"}
from fastapi import FastAPI
from src.models.Settings import Settings
from src.models.Message import AuthMessageRequest, ValidateAuthCodeRequest
from src.controllers.Auth import makeAuthCode
from mcrcon import MCRcon
import time

settings = Settings()
app = FastAPI()
auth_codes = {}

@app.post("/authMessage")
async def auth_message(request: AuthMessageRequest):
    code = makeAuthCode()
    expire = time.time() + 120  # 2 minutos en segundos
    auth_codes[request.user] = (code, expire)

    with MCRcon(settings.minecraft_rcon_url, settings.minecraft_rcon_password, port=settings.minecraft_rcon_port) as mcr:
        resp = mcr.command(f"/msg {request.user} Your auth code is -> {code}")
        print(resp)
        return {"status": "ok", "rcon_response": resp}
    

@app.post("/validateAuthCode")
async def validate_auth_code(request: ValidateAuthCodeRequest):
    user = request.user
    code = int(request.code)
    if user in auth_codes:
        stored_code, expire = auth_codes[user]
        if time.time() < expire and stored_code == code:
            del auth_codes[user]
            return {"status": "success"}
        elif time.time() >= expire:
            del auth_codes[user]
            return {"status": "expired"}
    return {"status": "invalid"}
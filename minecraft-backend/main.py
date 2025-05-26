from fastapi import FastAPI
from src.models.Settings import Settings
from src.models.Message import AuthMessageRequest, ValidateAuthCodeRequest
from src.controllers.Auth import makeAuthCode
from mcrcon import MCRcon
import time
import json
import bcrypt
from datetime import datetime, timedelta
from src.controllers.JWT import create_access_token
from src.database.DBModels import User, engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException, status

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
            hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
            
            Session = sessionmaker(bind=engine)
            session = Session()
            new_user = User(username=user, password=hashed_password)
            session.add(new_user)
            session.commit()
            del auth_codes[user]

            access_token = create_access_token(
                data={"sub": user},
                expires_delta=timedelta(days=30)
            )
            return {"status": "success", "access_token": access_token}
        elif time.time() >= expire:
            del auth_codes[user]
            return {"status": "expired"}
    return {"status": "invalid"}


@app.post("/login")
async def login(request: AuthMessageRequest):
    Session = sessionmaker(bind=engine)
    session = Session()
    user = session.query(User).filter(User.username == request.user).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no encontrado")
    if not bcrypt.checkpw(request.password.encode(), user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Contraseña incorrecta")

    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(days=30)
    )
    return {"status": "success", "access_token": access_token}

from fastapi import APIRouter

router = APIRouter(prefix="/gacha", tags=["Gacha"])

@router.get("/info")
async def get_gacha_info():
    return {"message": "Gacha Info"}
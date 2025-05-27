from fastapi import APIRouter, Depends
from src.controllers.JWT import get_current_user
from src.models.Message import User

router = APIRouter()

@router.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}

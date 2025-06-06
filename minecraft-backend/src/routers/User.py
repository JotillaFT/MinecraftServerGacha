from fastapi import APIRouter, Depends
from src.controllers.JWT import get_current_user
from src.models.Message import User
from src.controllers.MarkdownTrans import parse_markdown_folder
from src.controllers.Auth import verify_api_key

router = APIRouter()

@router.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}


@router.get("/news/{new_index}")
def get_news(new_index: int, current_user: User = Depends(verify_api_key)):
    all_news = parse_markdown_folder("src/news/")
    if int(new_index) > len(all_news):
        return all_news[0]
    
    return all_news[int(new_index) - 1]


@router.get("/lstnews/{new_index}")
def get_lstnews(new_index: int, current_user: User = Depends(verify_api_key)):
    all_news = parse_markdown_folder("src/news/")
    new_index = min(int(new_index), len(all_news))
    return all_news[:new_index]
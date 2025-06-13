from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.DBCardsModels import get_db
from src.gacha.CardBuilder import CardBuilder
from src.models.Internal import CardCreate
router = APIRouter(prefix="/gacha", tags=["Gacha"])

@router.get("/info")
async def get_gacha_info():
    return {"message": "Gacha Info"}


@router.post("/makeCard")
async def make_card(request: CardCreate, db: Session = Depends(get_db)):
    card = (
        CardBuilder()
        .name(request.name)
        .category(request.category)
        .minecraft_item(request.minecraft_item)
        .enchantments(request.enchantments)
        .lore(request.lore)
        .build()
    )

    db.add(card)
    db.commit()
    db.refresh(card)
    return {"id": card.id, "message": "Card created successfully"}

# Make Card
# curl -X POST "http://127.0.0.1:8000/gacha/makeCard" \
# -H "accept: application/json" \
# -H "Content-Type: application/json" \
# -d '{
#   "name": "Espada legendaria",
#   "category": "arma",
#   "minecraft_item": "diamond_sword",
#   "enchantments": "sharpness:5,unbreaking:3",
#   "lore": "La espada más poderosa"
# }'




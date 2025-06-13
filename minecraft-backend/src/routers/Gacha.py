from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import delete
from sqlalchemy.orm import Session

from src.database.DBCardsModels import get_db, Card
from src.gacha.CardBuilder import CardBuilder
from src.models.Internal import CardBase, CardOut, CardUpdate

router = APIRouter(prefix="/gacha", tags=["Gacha"])

@router.get("/info")
async def get_gacha_info():
    return {"message": "Gacha Info"}

@router.post("/cards/")
async def make_card(request: CardBase, db: Session = Depends(get_db)):
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
@router.get("/cards/", response_model=list[CardOut])
async def read_cards(db: Session = Depends(get_db)):
    cards = db.query(Card).all()
    return cards

@router.get("/cards/{card_id}", response_model=CardOut)
async def read_card(card_id: int, db: Session = Depends(get_db)):
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@router.delete("/cards/{card_id}")
async def delete_card(card_id: int, db: Session = Depends(get_db)):
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    db.delete(card)
    db.commit()
    return {"message": "Card deleted successfully"}

@router.put("/cards/{card_id}", response_model=CardOut)
async def update_card(card_id: int, request: CardUpdate, db: Session = Depends(get_db)):
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    for key, value in request.dict(exclude_unset=True).items():
        setattr(card, key, value)
    db.commit()
    db.refresh(card)
    return card

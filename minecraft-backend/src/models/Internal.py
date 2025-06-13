from typing import Optional

from pydantic import BaseModel
from enum import Enum

class FlagsEnum(Enum):
    INFO = 1        # Tipo para sistema de informacion basica
    NEW = 2         # Tipo para sistema de noticias
    IMPORTANT = 3   # Tipo para sistema de alertar importantes

class MarkdownNew(BaseModel):
    author: str
    title:str
    information: str
    date: str
    flags: FlagsEnum


class CardCreate(BaseModel):
    name: str
    category: str
    minecraft_item: str
    enchantments: Optional[str] = None
    lore: Optional[str] = None
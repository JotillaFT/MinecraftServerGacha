from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class Card(Base):
    __tablename__ = 'cards'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name = Column(String(50), nullable=False)
    category = Column(String(15), nullable=False)
    minecraft_item = Column(String(50), nullable=False)
    enchantments = Column(String(200))
    lore = Column(String(50))

engine = create_engine('sqlite:///cards.db')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

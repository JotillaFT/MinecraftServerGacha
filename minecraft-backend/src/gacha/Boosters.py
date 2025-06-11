class Boosters:
    def __init__(self, type: str, description: dict, cards: list):
        self.cards = cards
        self.type = type
        self.description = description

    def _repr__(self):
        return f"Boosters(type={self.type}, description={self.description}, cards={self.cards})"
    
    def __str__(self):
        return f"Boosters(type={self.type}, description={self.description},cards={self.cards})"
    
    
    def open_booster(self):
        """
        Simula la apertura de un sobre de cartas.
        Retorna una lista de cartas obtenidas.
        """
        return [card for card in self.cards]
    
class Booster_Materiales(Boosters):
    def __init__(self, type: str, description: dict, cards: list):
        super().__init__(type, description, cards)
        
    def __repr__(self):
        return f"Booster_Materiales(type={self.type}, description={self.description}, cards={self.cards})"
    
    def __str__(self):
        return f"Booster_Materiales(type={self.type}, description={self.description}, cards={self.cards})"
    
class Booster_Herramientas(Boosters):
    def __init__(self, type: str, description: dict, cards: list):
        super().__init__(type, description, cards)
        
    def __repr__(self):
        return f"Booster_Herramientas(type={self.type}, description={self.description}, cards={self.cards})"
    
    def __str__(self):
        return f"Booster_Herramientas(type={self.type}, description={self.description}, cards={self.cards})"
    
class Booster_Armaduras(Boosters):
    def __init__(self, type: str, description: dict, cards: list):
        super().__init__(type, description, cards)
        
    def __repr__(self):
        return f"Booster_Armaduras(type={self.type}, description={self.description}, cards={self.cards})"
    
    def __str__(self):
        return f"Booster_Armaduras(type={self.type}, description={self.description}, cards={self.cards})"
    
class Booster_Armas(Boosters):
    def __init__(self, type: str, description: dict, cards: list):
        super().__init__(type, description, cards)
        
    def __repr__(self):
        return f"Booster_Armas(type={self.type}, description={self.description}, cards={self.cards})"
    
    def __str__(self):
        return f"Booster_Armas(type={self.type}, description={self.description}, cards={self.cards})"
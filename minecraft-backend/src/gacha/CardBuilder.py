from src.database.DBCardsModels import Card

class CardBuilder:
    def __init__(self):
        self._name = None
        self._category = None
        self._minecraft_item = None
        self._enchantments = None
        self._lore = None

    def name(self, name):
        self._name = name
        return self

    def category(self, category):
        self._category = category
        return self

    def minecraft_item(self, minecraft_item):
        self._minecraft_item = minecraft_item
        return self

    def enchantments(self, enchantments):
        self._enchantments = enchantments
        return self

    def lore(self, lore):
        self._lore = lore
        return self

    def build(self):
        return Card(
            name=self._name,
            category=self._category,
            minecraft_item=self._minecraft_item,
            enchantments=self._enchantments,
            lore=self._lore
        )
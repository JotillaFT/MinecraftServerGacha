from enum import Enum

class WeaponEnchantment(Enum):
    # SWORD
    SHARPNESS = "sharpness"
    SMITE = "smite"
    BANE_OF_ARTHROPODS = "bane_of_arthropods"
    KNOCKBACK = "knockback"
    FIRE_ASPECT = "fire_aspect"
    LOOTING = "looting"
    SWEEPING_EDGE = "sweeping"

    # PICKAXE and AXE
    EFFICIENCY = "efficiency"
    FORTUNE = "fortune"
    SILK_TOUCH = "silk_touch"

    # BOW
    POWER = "power"
    PUNCH = "punch"
    FLAME = "flame"
    INFINITY = "infinity"

    # CROSSBOW
    QUICK_CHARGE = "quick_charge"
    MULTISHOT = "multishot"
    PIERCING = "piercing"

    # TRIDENT
    LOYALTY = "loyalty"
    IMPALING = "impaling"
    RIPTIDE = "riptide"
    CHANNELING = "channeling"

    # UNIVERSAL
    CURSE_OF_VANISHING = "vanishing_curse"
    MENDING = "mending"
    UNBREAKING = "unbreaking"
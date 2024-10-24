class Item:
    def __init__(self, id, name, cover, quantity_6_months, volume):
        self.id = id
        self.name = name
        self.cover = cover
        self.quantity = quantity_6_months
        self.demand = self.quantity / (6 * 30)
        self.inventory = int(cover * self.demand)
        self.volume = volume
        self.storage_locations = []         # List of (cell, quantity)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "cover": self.cover,
            "quantity_6_months": self.quantity,
            "demand": self.demand,
            "inventory": self.inventory,
            "volume": self.volume,
            "storage_locations": self.storage_locations
        }
    
    def reset(self):
        self.storage_locations = []


    def __repr__(self):
        return (f"Item(id={self.id}\t name={self.name[:20]}\t demand={self.demand}\t inventory={self.inventory})")
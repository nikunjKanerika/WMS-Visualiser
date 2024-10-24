import random

class BayIterator:
    def __init__(self, num_bays, cells_per_bay):
        self.num_bays = num_bays
        self.cells_per_bay = cells_per_bay

        self.iterator = [0] * num_bays
        self.cells = [random.sample(range(cells_per_bay), cells_per_bay) for _ in range(num_bays)]

    def get_random_cells(self, N):
        random_cells = []
        for bay_id in range(self.num_bays):
            bay_permutation = self.cells[bay_id]
            i = self.iterator[bay_id]
            random_cells.append(bay_permutation[i: i + N])
            # self.iterator[bay_id] += N

        # print(self.iterator, sep='  ')
        # print("Random Cells = ", random_cells)
        return random_cells
        
    def reset(self):
        self.iterator = [0] * self.num_bays
        self.cells = [random.sample(range(self.cells_per_bay), self.cells_per_bay) for _ in range(self.num_bays)]


class CellIterator:
    def __init__(self, num_bays, cells_per_bay):
        self.num_bays = num_bays
        self.cells_per_bay = cells_per_bay
        self.num_cells = num_bays * cells_per_bay
        self.i = 0
        
        # Generate the list of cells
        self.cells = [(bay, cell) for bay in range(0, num_bays) for cell in range(0, cells_per_bay)]
        
        # Shuffle the cells to ensure randomness
        self.shuffle()

    def get_random_cells(self, N):
        random_cells = self.cells[self.i: self.i + N]
        self.i += N
        return random_cells
    
    def shuffle(self):
        random.shuffle(self.cells)

    def reset(self):
        self.i = 0
        self.shuffle()


    def __repr__(self):
        return f"CellIterator(num_bays={self.num_bays}, cells_per_bay={self.cells_per_bay}, cells={self.cells})"

# bay_iterator = BayIterator(6, 10)
# cells = bay_iterator.get_random_cells(3)
# print(cells)
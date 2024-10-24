import pandas as pd
from colorama import Fore, Style, init

class Worker:
    def __init__(self, aisle_id):
        self.aisle_id = aisle_id
        self.cell_number = -1
        self.cells_travelled = 0
        self.accessible_items = set()
        self.order_list = []

    
    def min_max_order_list(self, items):
        for order in self.order_list:
            # order: a list of items ordered by a customer
            cells = []

            for order_item in order.order_items:
                id = order_item['id']
                storage_locations_aisle = [loc for loc in items[order_item['id']].storage_locations if self.aisle_id == loc[0] // 2]
                cells.extend(loc[1] for loc in storage_locations_aisle)

            order.min_cell = min(cells)
            order.max_cell = max(cells)


    # returns the total orders processed
    def fulfill_batched_order(self, time_alloted, time_restriction):
        # for order in self.order_list:
        #     if order.min_cell is None: continue
        #     if order.max_cell is None: continue

        #     dist_to_min = abs(self.cell_number - order.min_cell)
        #     dist_to_max = abs(self.cell_number - order.max_cell)

        #     # Move to the nearest cell first
        #     if dist_to_min <= dist_to_max:
        #         self.cells_travelled += dist_to_min + abs(order.max_cell - order.min_cell)
        #         self.cell_number = order.max_cell
        #     else:
        #         self.cells_travelled += dist_to_max + abs(order.max_cell - order.min_cell)
        #         self.cell_number = order.min_cell


        # print(f"Worker {self.aisle_id} has to complete {len(self.order_list)} orders")
        # print("Time Restriction = ", time_restriction)
        
        for i, order in enumerate(self.order_list):
            # if order.min_cell is None: continue
            if order.max_cell is None: continue

            self.cells_travelled += (order.max_cell + 1) * 2
            self.time_taken = self.cells_travelled * 0.8

            if time_restriction and self.time_taken > time_alloted:
                self.cells_travelled -= (order.max_cell + 1) * 2
                # print("Worker has completed only", i, "orders")
                # print()
                return i

        # print(f"Worker has completed {len(self.order_list)} orders")

        # fulfilled all orders
        return len(self.order_list)
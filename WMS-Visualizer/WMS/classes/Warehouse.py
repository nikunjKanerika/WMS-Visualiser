from classes.Item import Item
from classes.CellIterator import BayIterator
from classes.Worker import Worker
from classes.Order import Order

import pandas as pd
import random
import json

class Warehouse:
    def __init__(self, num_bays, rack_length, cells_per_bay, bay_width, level_height):
        self.num_bays = num_bays
        self.num_aisles = ((num_bays - 2) // 2) + 1
        self.cells_per_bay = cells_per_bay
        self.time_alloted = 24 * 60 * 60
        self.time_pressure = False

        self.cell_length = rack_length / cells_per_bay
        self.cell_capacity_m3 = bay_width * self.cell_length * level_height
        self.cell_capacity_cm3 = self.cell_capacity_m3 * 10e6

        self.items = {}
        self.aisle_items = {}
        self.wh_items = self.serialize_aisle_items()
        self.cell_to_item = {}

        self.order_list = []
        self.bay_iterator = BayIterator(num_bays=num_bays, cells_per_bay=cells_per_bay)

        self.workers = [Worker(aisle_id) for aisle_id in range(1 + ((num_bays - 2) // 2))]
        self.orders = []
        self.costs = []
        self.orders_processed = []


    def generate_item_list_small(self, order_history_small_path):
        df = pd.read_csv(order_history_small_path)
        for _, row in df.iterrows():
            id = row['id']
            item = Item(id=row['id'], name=row['name'], cover=row['cover'],
                        quantity_6_months=row['quantity'], volume=row['volume'])
            self.aisle_items[id] = item


    def generate_item_list(self, order_history_path):
        df = pd.read_csv(order_history_path)
        for _, row in df.iterrows():
            id = row['id']
            item = Item(id=row['id'], name=row['name'], cover=row['cover'],
                        quantity_6_months=row['quantity'], volume=row['volume'])
            self.items[id] = item


    def display_item_list(self, N):
        for _, item in self.aisle_items.items():
            N -= 1
            print(item)
            if N == 0: return


    def smart_sprinkle(self):
        items = [item for _, item in self.aisle_items.items()]
        sorted_items = sorted(items, key=lambda x: x.demand, reverse=True)
        total_cells_taken = 0

        for item in sorted_items:
            cell_index = total_cells_taken // 2
            num_items_per_cell = self.cell_capacity_cm3 // item.volume
            num_cells_filled, extra = divmod(item.inventory, num_items_per_cell)

            while num_cells_filled:
                for aisle in range(0, self.num_bays, 2):
                    bay = aisle + random.choice([0, 1])

                    location_tuple = (bay, cell_index, num_items_per_cell)
                    item.storage_locations.append(location_tuple)
                    self.cell_to_item[bay*self.cells_per_bay + cell_index] = item.to_dict()
                    self.workers[bay // 2].accessible_items.add(item.id)

                num_cells_filled -= 1
                cell_index += 1

            for aisle in range(0, self.num_bays, 2):
                bay = int(aisle + (total_cells_taken % 2))

                location_tuple = (bay, cell_index, extra)
                item.storage_locations.append(location_tuple)
                self.cell_to_item[bay*self.cells_per_bay + cell_index] = item.to_dict()
                self.workers[bay // 2].accessible_items.add(item.id)

            total_cells_taken += int(num_cells_filled + (extra > 0))


    def sprinkle_aisle(self):
        self.bay_iterator.iterator = [0] * self.num_bays

        for item_id, item in self.aisle_items.items():
            # calculate number cells required
            num_items_per_cell = self.cell_capacity_cm3 // item.volume
            num_cells_filled, extra = divmod(item.inventory, num_items_per_cell)
            num_cells_required = int(num_cells_filled) + 1


            for aisle in range(0, self.num_bays, 2):
                left_bay_spots = 20 - self.bay_iterator.iterator[aisle]
                right_bay_spots = 20 - self.bay_iterator.iterator[aisle + 1]
                left_bay_prob = left_bay_spots / (left_bay_spots + right_bay_spots)
                right_bay_prob = 1 - left_bay_prob
                bay = aisle + random.choice([0, 1])
                bay_offset = random.choices([0, 1], weights=[left_bay_prob, right_bay_prob])[0]
                bay = aisle + bay_offset

                perms = self.bay_iterator.get_random_cells(num_cells_required)
                perm = perms[bay]


                for cell in perm[:-1]:
                    item.storage_locations.append((bay, cell, num_items_per_cell))
                    self.cell_to_item[bay*self.cells_per_bay + cell] = item.to_dict()
                    self.workers[bay // 2].accessible_items.add(item_id)
                self.bay_iterator.iterator[bay] += int(num_cells_filled)

                item.storage_locations.append((bay, perm[-1], extra))
                self.cell_to_item[bay*self.cells_per_bay + perm[-1]] = item.to_dict()
                self.workers[bay // 2].accessible_items.add(item_id)
                self.bay_iterator.iterator[bay] += 1


            
    # def sprinkle(self):
    #     # iterate over the items
    #     for item_id, item in self.items.items():
    #         # calculate number cells required
    #         num_items_per_cell = self.cell_capacity_cm3 // item.volume
    #         num_cells_filled, extra = divmod(item.inventory, num_items_per_cell)
    #         num_cells_required = int(num_cells_filled) + 1

    #         random_cells = self.cell_iterator.get_random_cells(num_cells_required)

    #         for bay, cell in random_cells[:-1]:
    #             item.storage_locations.append((bay, cell, num_items_per_cell))
    #             self.workers[bay // 2].accessible_items.add(item_id)


    #         item.storage_locations.append((random_cells[-1][0], random_cells[-1][1], extra))
    #         self.workers[random_cells[-1][0] // 2].accessible_items.add(item_id)


    # def dist_order_list(self, data_path):
    #     df = pd.read_csv(data_path)
    #     for _, item in df.iterrows():
    #         id = item['id']

    #         for worker in self.workers:
    #             worker.order_list.append(id)

    def read_orders(self, data_path):
        with open(data_path, 'r') as file:
            order_data = json.load(file)
            
        self.orders = [Order(order['items']) for order in order_data]

    def dist_batched_order_list(self):
        num_workers = len(self.workers)

        for i, order in enumerate(self.orders):
            worker = self.workers[i % num_workers]
            worker.order_list.append(order)



    def get_total_cost(self):
        total_cost = 0
        for i, worker in enumerate(self.workers):
            # print(f"Cost of worker {i} = {worker.cells_travelled}")
            total_cost += worker.cells_travelled

        print("Total cost = ", total_cost)
        return total_cost


    def reset(self, type):
        # reset workers
        for worker in self.workers:
            worker.cell_number = -1
            worker.cells_travelled = 0
            worker.order_list = []

        if type != "hard": return

        for item_id, item in self.items.items():
            item.reset()
        for item_id, item in self.aisle_items.items():
            item.reset()
        
        self.items.clear()
        self.aisle_items.clear()
        self.cell_to_item.clear()

        self.order_list = []
        # self.cell_iterator = CellIterator(num_bays=self.num_bays, cells_per_bay=self.cells_per_bay)
        self.bay_iterator.reset()

        self.workers = [Worker(aisle_id) for aisle_id in range(1 + ((self.num_bays - 2) // 2))]
        self.orders = []
        self.costs = []
        self.orders_processed = []

    def serialize_aisle_items(self):
        serialized_aisle_items = {}
        for id, item in self.aisle_items.items():
            serialized_aisle_items[id] = item.to_dict()
        return serialized_aisle_items
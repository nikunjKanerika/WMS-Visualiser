# Warehouse-Management-System
WMS provides an optimal warehouse configuration, i.e. a distribution of items across the cells of the warehouse. The configuration is optimal in the sense that it minimizes the distance that a picker needs to travel to fulfill an order.
Currently, the WMS provides information regarding how much money can be saved by using the smart configuration over the random configuration.
The smart configuration currently sorts the items based on demand per day, but is meant to be more sophisticated in the future, taking into consideration proximity (similar items should be placed together), weight, size etc. Another extension includes treating the layout as a multi-level system, adding a vertical dimension to the problem.

## How to run?
* `WMS-Visualizer` contains the backend (Python) and `wms` contains the frontend (React application)
* To start the backend, open the file `wms-visualizer.ipynb` and run all the cells
* To start the frontend, go to `./wms` and run `npm run dev` and visit the url: `http://localhost:5173/`

## How to use?
* Order History - Order history file for the previous 6 months. File should have the columns - id, name, quantity, cover. Here, quantity refers to the total number of orders in the last 6 months. Daily demand is calculated based on quantity (demand = quantity / 6 * 30). Inventory size i.e. how many items must be stored in the warehouse, is calculated as (inventory = cover * daily demand).
* Generate Order Lists - The generated order list files are stored in `./data/orders/`
In this example, we are generating 2 such files. Each of these files contains 20,000 orders, and each order can contain multiple items. For more accurate results, more files can be generated, but this will take more time, especially if the number of orders per file is large.
* Configuration - Here, you can opt for a one day time limit. If this option is chosen, the time is fixed and the number of orders fulfilled will vary. If no time restriction is set, all the orders will be fulfilled and the time taken will vary.

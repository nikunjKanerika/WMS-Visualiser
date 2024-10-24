i am creating a WMS - warehouse management system using AI
there are two types of configurations - random and smart
random - items are randomly placed into the cells in the warehouse
smart - the high demand items are placed closest to the gate and vice versa

there is a directory in data/orders which contains multiple order list json files
these contain a list of orders where each order may contain multiple items

a given warehouse configuration is tested against all these order lists
each (config, order list) pair is associated with a cost
cost - total number of cells traversed by all the workers to fulfil the orders
testing a config against multiple randomized order lists allows us to take the average of the costs and get a better estimate for the quality of the config

the results are printed to a csv file in results/wms-random.csv and results/wms-smart.csv
this is how it looks:

wms-random.csv:
n,cst1,cst2,cst3,avg,min,max,std,moe
1,1437,1490,1496,1474.3333333333333,1437,1496,32.47,36.74
2,1440,1420,1387,1415.6666666666667,1387,1440,26.76,30.28
3,1392,1447,1419,1419.3333333333333,1392,1447,27.5,31.12

wms-smart.csv:
n,cst1,cst2,cst3,avg,min,max,std,moe
1,1076,1027,1023,1042.0,1023,1076,29.51,33.39
2,1076,1027,1023,1042.0,1023,1076,29.51,33.39
3,1076,1027,1023,1042.0,1023,1076,29.51,33.39
(each line is the same because the smart config is not randomized)

where each line represents one config
cst1, cst2,... are the costs of that config with different order lists

Now i want to do EDA on these results
Suggest what specific things I can do, what visualizations can I create etc

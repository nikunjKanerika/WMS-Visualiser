import json

def count_top_level_objects(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            
            if isinstance(data, list):
                top_level_object_count = len(data)
                return top_level_object_count
            else:
                print("The JSON file does not contain a top-level array.")
                return 0
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return 0
    except json.JSONDecodeError:
        print(f"Error decoding JSON from file: {file_path}")
        return 0

# Example usage:
file_path = 'data/orders_small/orders10.json'
top_level_objects = count_top_level_objects(file_path)
print(f"Number of top-level objects: {top_level_objects}")

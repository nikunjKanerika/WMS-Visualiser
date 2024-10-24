from flask import Flask, jsonify, request

app = Flask(__name__)
UPLOAD_FOLDER = 'data/input/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/warehouse')
def index():
    warehouse_items = WHR.cell_to_item
    return warehouse_items

@app.route('/upload', methods=['POST'])
def upload():
    print("req files = ", request.files)
    if 'itemList' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['itemList']
    filename = file.filename
    if filename == '':
        return jsonify({'error': 'No selected file'})
    

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Return the filename, content, and epsilonValues in the response
    return jsonify({
        'filename': file.filename,
    })

if __name__ == '__main__':
    app.run()
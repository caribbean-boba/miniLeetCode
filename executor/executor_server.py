import json
from flask import Flask
app = Flask(__name__)
from flask import jsonify
from flask import request
import executor_utils as eu

@app.route('/')

@app.route('/build_and_run', methods=['POST'])
def build_and_run():
    data = request.get_json()
    if 'user_code' not in data or 'selected_lang' not in data:
        return 'You should provide "code" and "lang"'
    elif (data['selected_lang'] == 'python'):
        return 'Python function not implemented yet.'
    user_code = data['user_code']
    selected_lang = data['selected_lang']
    result = eu.build_and_run(user_code, selected_lang)
    return jsonify(result)

if __name__ == '__main__':
    eu.load_image()
    app.run(debug=True, threaded=True)
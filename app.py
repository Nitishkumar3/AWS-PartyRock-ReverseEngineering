from flask import Flask, render_template, request, jsonify
from GenerateImage import GenerateImage
import asyncio

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.form.get('prompt')
    aspect_ratio = request.form.get('aspectratio')

    try:
        placeholder_image = asyncio.run(GenerateImage(prompt, aspect_ratio))

        return jsonify({
            "data": placeholder_image,
            "isSuccess": True
        })
    except Exception as e:
        return jsonify({
            "data": str(e),
            "isSuccess": False
        })
    
if __name__ == '__main__':
    app.run(debug=True)
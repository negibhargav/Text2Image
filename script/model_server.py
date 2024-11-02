from flask import Flask, request, jsonify
import torch
from diffusers import StableDiffusionPipeline
import time
import os
import math

app = Flask(__name__)

try:
    pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4",torch_dtype=torch.float16)
    pipe.to("cuda")
    print("Pipeline loaded successfully!")
except Exception as e:
    print(f"Error loading pipeline: {e}")

@app.route('/generate', methods=['POST'])
def generate_image():
    start_time = time.time()
    data = request.json
    prompt = data.get('prompt', '')
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    image = pipe(prompt).images[0]

    output_directory = "../client/public"
    
    os.makedirs(output_directory, exist_ok=True)

    image_path = os.path.join(output_directory, "output.png")
    image.save(image_path)
    end_time = time.time()

    duration = math.ceil(end_time - start_time)
    return jsonify({'message': 'Image generated', 'image_path': 'output.png','TimeTaken': duration}), 200

if __name__ == '__main__':
    app.run(port=5000)
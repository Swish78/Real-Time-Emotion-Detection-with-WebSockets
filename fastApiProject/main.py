from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import cv2
import base64
from deepface import DeepFace
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def detect_emotion(image_bytes):
    image_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    temp_file_path = 'temp_image.jpg'
    cv2.imwrite(temp_file_path, image)
    analysis = DeepFace.analyze(img_path=temp_file_path, actions=['emotion'])
    os.remove(temp_file_path)

    return analysis[0]['dominant_emotion']


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # Encode the frame to JPEG
        _, img_encoded = cv2.imencode('.jpg', frame)
        img_bytes = img_encoded.tobytes()

        emotion = detect_emotion(img_bytes)

        img_base64 = base64.b64encode(img_bytes).decode('utf-8')
        await websocket.send_text(f"data:image/jpeg;base64,{img_base64}")

        await websocket.send_text(emotion)

    cap.release()

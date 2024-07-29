# Real-Time Emotion Detection with WebSockets

## Overview

This project is designed to demonstrate real-time emotion detection using WebSockets. The backend is powered by FastAPI, and the frontend is built with React. Emotion detection is handled by the DeepFace library. Future enhancements include integrating the LLaVA model for image description and a fine-tuned VGG model on AffectNet.

## Features

- **Real-Time Emotion Detection**: Utilizes WebSockets to stream video frames from the client to the server and detect emotions in real-time.
- **WebSocket Communication**: Establishes a persistent connection between the client and server for real-time data transfer.
- **DeepFace Integration**: Detects emotions using the DeepFace library.

## Plans

-  **VGG Model Integration**: Incorporate a fine-tuned VGG model on AffectNet for improved emotion classification.
- **LLaVA Integration**: Integrate the LLaVA model for detailed image descriptions.

## Technologies Used

- **Frontend**: React
- **Backend**: FastAPI
- **WebSocket**: Real-time data transfer
- **Emotion detection**: Deepface, VGG(Fine-Tuned)
- **Python Libraries**: OpenCV, PIL, Base64

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/emotion-detection.git
   cd emotion-detection
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5174/` to access the React frontend.
2. The application will access your webcam and start streaming video frames to the server.
3. The server will process these frames and send back the detected emotions.

## Error Handling

If you encounter issues with WebSocket connections:

- **Ensure that both the backend and frontend servers are running.**
- **Check your network settings and firewall rules.**


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
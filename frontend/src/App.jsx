import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
    const videoRef = useRef(null);
    const [emotion, setEmotion] = useState('Loading...');
    const [wsStatus, setWsStatus] = useState('Connecting...');
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://127.0.0.1:8000/ws'); /* Web SOcket connectipn */

        ws.current.onopen = () => {
            setWsStatus('Connected');
        };

        ws.current.onclose = (event) => {
            setWsStatus('Disconnected');
            console.log('WebSocket closed:', event);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setWsStatus('Error');
        };

        ws.current.onmessage = (event) => {
            if (event.data.startsWith('data:image')) {
            } else {
                setEmotion(event.data);
            }
        };

        // Access webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(error => {
                console.error('Error accessing webcam:', error);
            });

        const captureFrame = () => {
            if (ws.current.readyState === WebSocket.OPEN) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                const dataURL = canvas.toDataURL('image/jpeg');
                ws.current.send(dataURL.split(',')[1]); /* Send base64 image data */
            } else {
                console.log('WebSocket is not open. ReadyState:', ws.current.readyState);
            }
        };

        const intervalId = setInterval(captureFrame, 1000); /* Sent frames every second*/

        return () => {
            clearInterval(intervalId);
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <div className="App">
            <video ref={videoRef} autoPlay></video>
            <div id="emotion">Emotion: {emotion}</div>
            <div>Status: {wsStatus}</div>
        </div>
    );
};

export default App;

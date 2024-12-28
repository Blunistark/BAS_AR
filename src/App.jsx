import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Dynamically load the A-Frame library
    const script = document.createElement('script');
    script.src = 'https://aframe.io/releases/0.9.2/aframe.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Access the device camera with higher resolution settings
    const video = document.getElementById('background-video');
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',  // Use rear camera
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        frameRate: { ideal: 30 },
      }
    }).then((stream) => {
      video.srcObject = stream;
      video.play();
    }).catch((error) => {
      console.log('Error accessing camera: ', error);
    });

  }, []);

  return (
    <div className="App">
      <a-scene embedded>
        <a-assets>
          <video id="background-video" autoplay loop="true" crossorigin="anonymous"></video>
        </a-assets>

        <a-sky src="#background-video"></a-sky>

        <a-entity geometry="primitive: box" material="color: red" position="0 1 -3"></a-entity>

        <a-camera look-controls></a-camera>
      </a-scene>
    </div>
  );
}

export default App;

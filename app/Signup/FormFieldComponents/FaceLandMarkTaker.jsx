import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceLandMarkTaker({ FaceDetails }) {
  const videoRef = useRef();
  const streamRef = useRef(null); // To keep track of the video stream
  const { setFaceData, setFaceVerify } = FaceDetails;

  // State variables for indicators
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isReadyToCapture, setIsReadyToCapture] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Load face-api.js models
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
        console.log("FaceAPI models loaded successfully.");
      } catch (error) {
        console.error("Error loading face-api.js models:", error);
      }
    };

    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream; // Save the stream to stop later
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        detectFaceContinuously();
      } catch (err) {
        console.error("Error accessing webcam:", err);
        alert("Could not access webcam. Please check your permissions.");
      }
    };

    loadModels().then(startVideoStream);

    return () => {
      stopVideoStream(); // Stop the stream when the component unmounts
    };
  }, []);

  const stopVideoStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const detectFaceContinuously = async () => {
    while (videoRef.current) {
      if (videoRef.current.readyState === 4) {
        const detections = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          setIsFaceDetected(true);
          setIsReadyToCapture(detections.landmarks.positions.length > 0);
        } else {
          setIsFaceDetected(false);
          setIsReadyToCapture(false);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 200)); // Poll every 200ms
    }
  };

  const handleLandMark = async () => {
    if (!isFaceDetected || !isReadyToCapture) {
      alert("Face not ready for capture. Please adjust your position.");
      return;
    }

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      alert("Face not detected during capture. Please try again.");
      return;
    }

    const faceData = detections.descriptor;
    setFaceData(faceData); // Save face data
    setFaceVerify(true); // Mark face as verified
    alert("Face landmarks captured successfully!");

    // Stop the video and camera after capturing
    stopVideoStream();
  };

  return (
    <div>
      <video
        className="border border-indigo-500"
        ref={videoRef}
        autoPlay
        playsInline
        width="480"
        height="360"
      />

      {/* Indicators */}
      <div className="mt-4">
        <div
          className={`text-sm font-medium ${
            isFaceDetected ? "text-green-600" : "text-red-600"
          }`}
        >
          {isFaceDetected ? "Face Detected" : "No Face Detected"}
        </div>
        <div
          className={`text-sm font-medium ${
            isReadyToCapture ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {isReadyToCapture ? "Face Ready to Capture" : "Adjust Your Position"}
        </div>
      </div>

      <button
        className="bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4 px-4 py-2 rounded"
        onClick={handleLandMark}
        disabled={!isReadyToCapture}
      >
        Take Landmark
      </button>
    </div>
  );
}

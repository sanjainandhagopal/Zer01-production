import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export const FaceDetector = ({ courseVideoRef, proctor }) => {
  const videoRef = useRef(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const closeChatbot = () => {
    setIsChatbotVisible(false);
    setCounter(0);
    if(courseVideoRef?.courrent){
      courseVideoRef?.current.play();
    }
  };

  useEffect(() => {
    let detectionTimer = null;
    let chatbotTimer = null;

    if (proctor) {
      if (!isFaceDetected) {
        detectionTimer = setInterval(() => {
          setCounter((prev) => prev + 1);
        }, 1000);

        if (counter >= 5) {
          chatbotTimer = setTimeout(() => {
            if (courseVideoRef?.current) {
              courseVideoRef.current.pause();
            }
            setIsChatbotVisible(true);
          }, 0);
        }
      } else {
        setCounter(0);
        clearTimeout(chatbotTimer);
      }
    } else {
      // Pause the video when proctoring is disabled
      if (courseVideoRef?.current) {
        courseVideoRef.current.pause();
      }
      setCounter(0);
      setIsChatbotVisible(false);
    }

    return () => {
      clearInterval(detectionTimer);
      clearTimeout(chatbotTimer);
    };
  }, [isFaceDetected, counter, proctor]);

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    const loadModels = async () => {
      const apiEndpoint = "http://localhost:5000/face/models";

      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(apiEndpoint);
        await faceapi.nets.faceLandmark68Net.loadFromUri(apiEndpoint);
        await faceapi.nets.faceRecognitionNet.loadFromUri(apiEndpoint);
        await faceapi.nets.faceExpressionNet.loadFromUri(apiEndpoint);

        startVideo();
      } catch (error) {
        console.error("Error loading models: ", error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    const handleVideoPlay = () => {
      const detectionInterval = setInterval(async () => {
        if (videoRef.current) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          );

          setIsFaceDetected(detections.length > 0);
        }
      }, 100);

      return () => clearInterval(detectionInterval);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("play", handleVideoPlay);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handleVideoPlay);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <video
        ref={videoRef}
        width="720"
        height="560"
        autoPlay
        muted
        controls={!proctor} // Disable manual controls when proctoring is enabled
        className={`rounded-full w-[100px] h-[100px] border-4 shadow-lg ${
          isFaceDetected ? "border-green-500" : "border-red-500"
        }`}
      />
      <p className="mt-2 text-lg font-medium">
        {isFaceDetected ? "Face Detected" : "No Face Detected"}
      </p>
      <p className="mt-1 text-sm text-gray-500">Counter: {counter}</p>

      {/* Chatbot UI */}
      {isChatbotVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            closeChatbot();
          }}
          className="fixed bottom-5 right-5 w-80 p-4 bg-white border border-gray-300 rounded-lg shadow-xl"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Zer01Bot</h4>
          <h5>I think you are distracted somewhere else...</h5>
          <input
            type="text"
            placeholder="Type your thought"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bubble-gradient bg-blue-500 text-white font-semibold py-2 rounded-lg hover:zn-text transition"
          >
            Respond
          </button>
        </form>
      )}
    </div>
  );
};

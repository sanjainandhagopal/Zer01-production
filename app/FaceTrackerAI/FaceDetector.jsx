'use client'; // Ensures this component runs only on the client side

import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import * as faceapi from "face-api.js";
import { useRouter } from "next/navigation";

export const FaceDetector = ({ courseVideoRef, proctor, coursePanel }) => {
  const videoRef = useRef(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [chatbotQuestion, setChatbotQuestion] = useState("");
  const route = useRouter();

  const distractionQuestions = !coursePanel
    ? [
        "What are you thinking about right now?",
        "Can you describe what just distracted you?",
        "Do you feel focused enough to continue?",
        "What task or thought pulled your attention away?",
        "How can you refocus on the course content?",
      ]
    : ["I think you're not properly concentrating here. Do you want to continue with the course?"];

  const handleExit = () => {
    stopVideo();
    route.push("/");
  };

  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * distractionQuestions.length);
    setChatbotQuestion(distractionQuestions[randomIndex]);
  };

  const closeChatbot = useCallback(() => {
    setIsChatbotVisible(false);
    setCounter(0);
    if (courseVideoRef?.current && courseVideoRef.current.paused) {
      courseVideoRef.current.play();
    }
  }, [courseVideoRef]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR execution

    let detectionTimer = null;

    if (proctor) {
      if (!isFaceDetected) {
        detectionTimer = setInterval(() => {
          setCounter((prev) => prev + 1);
        }, 1000);
      }

      if (counter >= 5) {
        setIsChatbotVisible(true);
        generateRandomQuestion();
        if (courseVideoRef?.current) courseVideoRef.current.pause();
        setCounter(0);
      }
    } else {
      clearInterval(detectionTimer);
      setCounter(0);
      setIsChatbotVisible(false);
    }

    return () => clearInterval(detectionTimer);
  }, [isFaceDetected, counter, proctor, courseVideoRef]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure browser-only execution

    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
      } catch (error) {
        console.error("Error loading face-api.js models:", error);
      }
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    };

    loadModels().then(startVideo);
  }, []);

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !proctor) return; // Prevent SSR execution

    let detectionInterval = null;

    if (videoRef.current) {
      detectionInterval = setInterval(async () => {
        try {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          );
          setIsFaceDetected(detections.length > 0);
        } catch (error) {
          console.error("Error detecting faces:", error);
        }
      }, 500); // Run every 500ms
    }

    return () => clearInterval(detectionInterval);
  }, [proctor]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <video
        ref={videoRef}
        width="720"
        height="560"
        autoPlay
        muted
        className={`rounded-full w-[100px] h-[100px] border-4 shadow-lg ${
          isFaceDetected ? "border-green-500" : "border-red-500"
        }`}
      />
      <p className="mt-2 text-lg font-medium">
        {isFaceDetected ? "Face Detected" : "No Face Detected"}
      </p>

      {isChatbotVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              closeChatbot();
            }}
            className="w-2/3 h-2/3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-xl p-6 flex flex-col justify-center items-center space-y-4"
          >
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Zer01Bot</h4>
            <p className="text-lg text-center">{chatbotQuestion}</p>
            {!coursePanel ? (
              <input
                type="text"
                placeholder="Type your response..."
                required
                className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            ) : (
              ""
            )}
            {!coursePanel ? (
              <button
                type="submit"
                className="w-1/3 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Respond
              </button>
            ) : (
              <div className="w-full flex flex-row justify-around">
                <button
                  className="w-1/3 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={handleExit}
                >
                  I'm tired
                </button>
                <button
                  className="w-1/3 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                  type="submit"
                >
                  Yes, continue
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

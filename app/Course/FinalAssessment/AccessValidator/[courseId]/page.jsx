'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Slab } from 'react-loading-indicators';

export default function Page({ params }) {
  const resolvedParams = React.use(params); // Unwrap the `params` Promise
  const [cameraValidation, setCameraValidation] = useState(false);
  const [micValidation, setMicValidation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCameraValidation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setCameraValidation(true);
        setErrorMessage(""); // Clear error if successful
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream
      }
    } catch (error) {
      setErrorMessage("Camera access denied. Please grant access and try again.");
      setCameraValidation(false);
    }
  };

  const handleMicValidation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        setMicValidation(true);
        setErrorMessage(""); // Clear error if successful
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream
      }
    } catch (error) {
      setErrorMessage("Microphone access denied. Please grant access and try again.");
      setMicValidation(false);
    }
  };

  const handleRouteAssessment = () => {
    if (cameraValidation && micValidation) {
      setLoading(true);
      router.push(`/Course/FinalAssessment/${resolvedParams.courseId}`);
    } else {
      setErrorMessage("Please validate both camera and microphone access before proceeding.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
          <div style={{ transform: 'rotate(180deg)' }}>
            <Slab color="#0e1c8e" size="large" text="" textColor="" />
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Access Validator
        </h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">Click here to validate camera access:</p>
          <button
            onClick={handleCameraValidation}
            className={`w-full py-2 px-4 rounded-md ${
              cameraValidation
                ? "bg-green-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {cameraValidation ? "Camera Access Granted ✅" : "Validate Camera"}
          </button>
          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`font-medium ${
                cameraValidation ? "text-green-600" : "text-red-600"
              }`}
            >
              {cameraValidation ? "Camera Access Granted ✅" : "Not Validated ❌"}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">Click here to validate microphone access:</p>
          <button
            onClick={handleMicValidation}
            className={`w-full py-2 px-4 rounded-md ${
              micValidation
                ? "bg-green-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {micValidation ? "Microphone Access Granted ✅" : "Validate Microphone"}
          </button>
          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`font-medium ${
                micValidation ? "text-green-600" : "text-red-600"
              }`}
            >
              {micValidation ? "Microphone Access Granted ✅" : "Not Validated ❌"}
            </span>
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center font-medium mb-4">{errorMessage}</p>
        )}

        <h3 className="text-lg font-medium text-gray-800 text-center mb-4">
          If everything is fine:
        </h3>
        <button
          onClick={handleRouteAssessment}
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Take Assessment
        </button>
      </div>
    </div>
  );
}

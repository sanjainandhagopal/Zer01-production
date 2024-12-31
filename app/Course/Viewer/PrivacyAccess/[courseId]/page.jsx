'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { Slab } from 'react-loading-indicators';
import { toast, ToastContainer } from 'react-toastify';

export default function Page({ params }) {
  const resolvedParams = React.use(params); // Unwrap the `params` Promise
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [cameraValidation, setCameraValidation] = useState(false);
  const [micValidation, setMicValidation] = useState(false);
  const [networkValidation, setNetworkValidation] = useState(navigator.onLine);
  const [capturedImage, setCapturedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);

  const handleCheckboxChange = (event) => {
    setAccept(event.target.checked); 
  };

  const handleCameraValidation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setTimeout(() => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);
          setCameraValidation(true);
          setErrorMessage(""); // Clear error if successful
          stream.getTracks().forEach((track) => track.stop()); // Stop the stream
        }, 2000); // Wait 2 seconds to take a picture
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

  const handleNetworkValidation = () => {
    setNetworkValidation(navigator.onLine);
    if (!navigator.onLine) {
      setErrorMessage("No network connection. Please check your internet and try again.");
    } else {
      setErrorMessage(""); // Clear error if successful
    }
  };

  const handleRouteAssessment = () => {
    if (cameraValidation && micValidation && networkValidation && accept) {
      setLoading(true);
      router.push(`/Course/Viewer/${resolvedParams.courseId}`);
    } else {
      toast("Please validate everything")
      setErrorMessage("Please validate camera, microphone, and network access before proceeding.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 w-full">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
          <div style={{ transform: 'rotate(180deg)' }}>
            <Slab color="#0e1c8e" size="large" text="" textColor="" />
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-8 w-4/5 max-w-4/5">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Access Validator
        </h1>

        <div className='flex flex-row gap-10 w-full'>
        <div className='w-1/3'>
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
            {cameraValidation ? "Camera Access Validated ✅" : "Validate Camera"}
          </button>
          
          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`font-medium ${
                cameraValidation ? "text-green-600" : "text-red-600"
              }`}
            >
              {cameraValidation ? "Camera Validated ✅" : "Not Validated ❌"}
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
            {micValidation ? "Microphone Access Validated ✅" : "Validate Microphone"}
          </button>
          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`font-medium ${
                micValidation ? "text-green-600" : "text-red-600"
              }`}
            >
              {micValidation ? "Microphone Validated ✅" : "Not Validated ❌"}
            </span>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-2">Click here to validate network access:</p>
          <button
            onClick={handleNetworkValidation}
            className={`w-full py-2 px-4 rounded-md ${
              networkValidation
                ? "bg-green-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {networkValidation ? "Network Connected ✅" : "Validate Network"}
          </button>
          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`font-medium ${
                networkValidation ? "text-green-600" : "text-red-600"
              }`}
            >
              {networkValidation ? "Connected ✅" : "No Connection ❌"}
            </span>
          </p>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center font-medium mb-4">{errorMessage}</p>
        )}

        </div>
        <div className='flex flex-col items-center'>
        <h3 className="text-lg font-medium text-gray-800 text-center mb-4">
          If everything is fine:
        </h3>
        <button
          onClick={handleRouteAssessment}
          className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Continue with the course
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Privacy Policy</h2>
          <p className="text-sm text-gray-600 mt-2">
            We value your privacy. Your camera and microphone access are used only for validation purposes. No data will be stored or shared.
          </p>
          <input 
            type="checkbox" 
            checked={accept} 
            onChange={handleCheckboxChange} 
          />
          <label htmlFor="accept">Accept Terms and Conditions</label>
        </div>
      </div>

      <video ref={videoRef} className="hidden" width="320" height="240" />
      <canvas ref={canvasRef} className="hidden" width="320" height="240" />
      </div>
      </div>
    </div>
  );
}

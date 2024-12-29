'use client';
import React, { useState } from 'react';
import { handleGenerateOtp } from './FormHandlers';
import { Slab } from 'react-loading-indicators';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmailForm({ emailDetails }) {
  const { email, setEmail, setVerify, router } = emailDetails;
  const [loading, setLoading] = useState(false); // Track loading state

  const routeLogin = () => {
    router.push('/Login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      await handleGenerateOtp(email, setVerify); // Await OTP generation
      toast.success('This user is already exist'); // Success toast
    } catch (error) {
      console.error("Error generating OTP:", error);
      toast.error('Failed to generate OTP. Please try again.'); // Error toast
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      {/* Full-Page Loader */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
          <div style={{ transform: 'rotate(180deg)' }}>
            <Slab color="#0e1c8e" size="large" text="" textColor="" />
          </div>
        </div>
      )}

      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6 w-full max-w-md mx-auto mt-10"
      >
        {/* Input Field */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>

        {/* Generate OTP Button */}
        <div>
          <button 
            type="submit" 
            className={`w-full py-3 rounded-lg transition duration-300 ${
              loading 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Generate OTP"}
          </button>
        </div>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span
            onClick={routeLogin}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />
    </>
  );
}

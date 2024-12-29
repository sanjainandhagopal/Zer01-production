'use client';
import React, { useState } from 'react';
import { handleVerifyOtp } from './FormHandlers';
import { Slab } from 'react-loading-indicators';
import { Puff } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';

export default function OtpForm({ otpDetails }) {
  const { email, otp, setOtp, setIsVerified } = otpDetails;
  const [loading, setLoading] = useState(false); // Track loading state

  const handleOtpVerification = async () => {
    setLoading(true); // Set loading to true before starting verification
    try {
      await handleVerifyOtp(email, otp, setIsVerified);
      toast.success('OTP verified successfully!');
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error('Verification failed. Please try again.');
    } finally {
      setLoading(false); // Reset loading state after completion
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Conditional Slab Loader */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
          <div style={{ transform: 'rotate(180deg)' }}>
            <Slab color="#0e1c8e" size="large" text="" textColor="" />
          </div>
        </div>
      )}

      {/* OTP Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6 w-full max-w-md">
        {/* OTP Input */}
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700"
          >
            OTP
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>

        {/* Verify Button */}
        <div>
          <button
            type="button"
            onClick={handleOtpVerification}
            className={`w-full py-3 rounded-lg transition duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Puff
                visible={true}
                height="30"
                width="30"
                color="#FFFFFF"
                ariaLabel="puff-loading"
                wrapperStyle={{ display: "inline-block" }}
              />
            ) : (
              "Verify"
            )}
          </button>
        </div>

        {/* Toast Notifications */}
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
      </div>
    </div>
  );
}

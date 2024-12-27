'use client';
import React, { useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import { handleForgotVerifyOtp } from './ForgotPasswordHandler';

export default function ForgotOtpForm({ otpDetails }) {
    const { email, otp, setOtp, setIsVerified } = otpDetails;
    const [loading, setLoading] = useState(false); // Track loading state

    const handleOtpVerification = async () => {
        setLoading(true); // Set loading to true before starting verification
        try {
            await handleForgotVerifyOtp(email, otp, setIsVerified);
            toast.success('Wrong OTP');
        } catch (error) {
            console.error("OTP verification failed:", error);
            toast.success('Verification failed');
        } finally {
            setLoading(false); // Reset loading state after completion
        }
    };

    return (
        <div
            className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6 w-full max-w-md"
        >
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

            <div>
                <button
                    type="button"
                    onClick={handleOtpVerification}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
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
        </div>
    );
}


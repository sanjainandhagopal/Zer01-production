'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import PasswordReset from './PasswordReset';
import ForgotEmailForm from './ForgotEmailForm';
import ForgotOtpForm from './ForgotOtpForm';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const router = useRouter();

  const emailDetails = {
    email,
    setEmail,
    setVerify,
    router
  };

  const otpDetails = {
    email,
    otp,
    setOtp,
    setIsVerified
  };

  const passwordResetDetails = {
    email,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full p-6 lg:p-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">
            Reset Password
          </h1>
          {!verify && (
            <ForgotEmailForm emailDetails={emailDetails} />
          )}
          {verify && !isVerified && (
            <ForgotOtpForm otpDetails={otpDetails} />
          )}
          {isVerified && (
            <PasswordReset passwordResetDetails={passwordResetDetails} />
          )}
        </div>
      </div>
    </div>
  )
}

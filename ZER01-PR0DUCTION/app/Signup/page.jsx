'use client';
import React, { useState } from 'react';
import EmailForm from './FormFieldComponents/EmailForm';
import MirrorForm from './MirrorForm/MirrorForm';
import OtpForm from './FormFieldComponents/OtpForm';
import ProfileForm from './FormFieldComponents/ProfileForm';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import FaceLandMarkTaker from './FormFieldComponents/FaceLandMarkTaker';

export default function Signup() {
  const [faceData, setFaceData] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [faceVarify, setFaceVerify] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobile] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profession, setProfession] = useState("");
  const [organization, setOrganiation] = useState("");
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

  const FaceDetails = {
    setFaceData,
    setFaceVerify
  };

  const profileDetails = {
    email,
    faceData,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    mobileNo,
    setMobile,
    dateOfBirth,
    setDateOfBirth,
    profession,
    setProfession,
    organization, 
    setOrganiation
  };

  const mirrorDetails = {
    email,
    firstName,
    lastName,
    password,
    mobileNo,
    dateOfBirth,
    profession,
    organization
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-6">
      <ToastContainer />
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 p-6 lg:p-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6">
            Sign Up
          </h1>
          {!verify && (
            <EmailForm emailDetails={emailDetails} />
          )}
          {verify && !isVerified && !faceVarify && (
            <OtpForm otpDetails={otpDetails} />
          )}
          {isVerified && !faceVarify &&(
            <FaceLandMarkTaker FaceDetails={FaceDetails} />
          )}
          {faceVarify && (
            <ProfileForm profileDetails={profileDetails} />
          )}
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-200 p-6 lg:p-10 flex flex-col items-center justify-center text-white">
          <h2 className="text-gray-800 text-xl lg:text-2xl font-semibold mb-4">Mirror Preview</h2>
          <MirrorForm mirrorDetails={mirrorDetails} />
        </div>
      </div>
    </div>
  );
}

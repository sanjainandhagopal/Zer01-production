'use client';
import React, { useState } from 'react';
import EmailForm from './FormFieldComponents/EmailForm';
import MirrorForm from './MirrorForm/MirrorForm';
import OtpForm from './FormFieldComponents/OtpForm';
import ProfileForm from './FormFieldComponents/ProfileForm';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [verify, setVerify] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
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
    }

    const profileDetails = {
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
    }

    const mirrorDetails = {
        email,
        firstName,
        lastName,
        password,
        mobileNo,
        dateOfBirth,
        profession,
        organization
    }
  return (
    <div>
        <ToastContainer />
        <div>
            {!verify && (
            <EmailForm emailDetails={emailDetails} />
            )}
            {verify && !isVerified && (
            <OtpForm otpDetails={otpDetails} />
            )}
            {isVerified && (
            <ProfileForm profileDetails={profileDetails} />
            
            )}
        </div>
        
        <MirrorForm mirrorDetails={mirrorDetails} />
    </div>
  )
}

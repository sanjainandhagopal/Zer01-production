'use client';
import React, { useState } from 'react';
import EmailForm from './FormFieldComponents/EmailForm';
import MirrorForm from './MirrorForm/MirrorForm';
import OtpForm from './FormFieldComponents/OtpForm';
import ProfileForm from './FormFieldComponents/ProfileForm';

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
    const [dateOfbirth, setDateOfBirth] = useState("");
    const [profession, setProfession] = useState("");
    const [organization, setOrganiation] = useState("");

    const emailDetails = {
        email,
        setEmail,
        setVerify
    };

    const otpDetails = {
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
        dateOfbirth,
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
        dateOfbirth,
        profession,
        organization
    }
  return (
    <div>
        <form onSubmit={(e) => e.preventDefault()}>
            <EmailForm emailDetails={emailDetails} />
            <OtpForm otpDetails={otpDetails} />
            <ProfileForm profileDetails={profileDetails} />
        </form>
        
        <MirrorForm mirrorDetails={mirrorDetails} />
    </div>
  )
}

import React from 'react';
import { handleVerifyOtp } from './FormHandlers';

export default function OtpForm({ otpDetails }) {
    const { email, otp, setOtp, setIsVerified } = otpDetails;

    const handleOtpVerification = () => {
        handleVerifyOtp(email, otp, setIsVerified);
    };

    return (
        <div>
            <input
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
            />

            <button type="button" onClick={handleOtpVerification}>
                Verify OTP
            </button>
        </div>
    );
}

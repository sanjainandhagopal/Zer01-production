export const handleGenerateOtp = async (email, setVerify) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/OTPGen`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email})
        });

        const data = await response.json();

        if (response.ok) {
            setVerify(true);
        } else {
            console.log(`Error: ${data.message}`);
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export const handleVerifyOtp = async (email, otp, setIsVerified) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/OTPAuth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
            setIsVerified(true);
        } else {
            console.log(data.message || "OTP verification failed.");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


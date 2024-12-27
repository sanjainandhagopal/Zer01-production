export const handleForgotGenerateOtp = async (email, setVerify) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authForgot/ForgotMail`, {
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

export const handleForgotVerifyOtp = async (email, otp, setIsVerified) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/authForgot/ForgotOtp`, {
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


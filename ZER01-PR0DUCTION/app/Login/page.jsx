'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Slab } from 'react-loading-indicators';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleLogin = async () => {
        if (!process.env.NEXT_PUBLIC_BASE_URL) {
            console.error("Base URL is not defined in environment variables.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login success");
                router.push('/');
            } else {
                console.error(data.message || "Login failed");
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("An error occurred: ", error);
        } finally {
            setLoading(false);
        }
    };

    const routeForgotPassword = () => {
        router.push('/ForgotPassword');
    };

    const routeSignup = () => {
        router.push('/Signup');
    };

    if (loading) {
        return (
            <div className="flex w-full h-screen items-center justify-center ">
                <div style={{ transform: 'rotate(180deg)' }}>
                    <Slab color="#0e1c8e" size="large" text="Logging in..." textColor="#32cd32" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full h-screen bg-black">
            {/* Left Section with an Image */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center "
                style={{ backgroundImage: 'url("zer01-logo.png")'  }}
            ></div>

            {/* Right Section with Login Form */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 ">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back!</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <div className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                required
                            />
                        </div>

                        <div className="text-right">
                            <button
                                type="button"
                                onClick={routeForgotPassword}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={routeSignup}
                                className="text-blue-500 hover:underline"
                            >
                                Signup
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

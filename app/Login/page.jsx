'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(false);
    
    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                })
            });
            
            const data = await response.json();

            if(response.ok){
                console.log("Login success");
                router.push('/Home');
            } else {
                console.error(data.message || "Login failed");
            }

        } catch (error) {
            console.error("An error occurred: ", error);
        }
    };

    const routeForgotPassword = () => {
        console.log("Redirect to forgot password page");
        router.push('/ForgotPassword');
    }

    const routeSignup = () => {
        console.log("Redirect to signup.");
        router.push('/Signup');
    }

  return (
    <div>
        <form onSubmit = {(e) => e.preventDefault()}>
            <div>
                <input
                    type = "email"
                    placeholder = "Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label
                    onClick={(e) => routeForgotPassword()}
                >Forgot password?</label>
            </div>

            <div>
                <button 
                    type="button"
                    onClick={(e) => handleLogin(email, password)}
                >Login</button>
            </div>

            <div>
                <label>
                    Don't have an accout?
                    <span onClick={() => routeSignup()}>Signup</span>
                </label>
            </div>
        </form>
    </div>
  )
}

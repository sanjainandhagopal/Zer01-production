import React from 'react';
import { handleGenerateOtp } from './FormHandlers';

export default function EmailForm({ emailDetails }) {
    const { email, setEmail, setVerify, router } = emailDetails;

    const routeLogin = (router) => {
      router.push('/Login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleGenerateOtp(email, setVerify);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <button type="submit">
                    Generate OTP
                </button>
            </div>

            <p>
                Already have an account?{' '}
                <span
                  onClick={routeLogin}
                >
                    Login
                </span>
            </p>
        </form>
    );
}

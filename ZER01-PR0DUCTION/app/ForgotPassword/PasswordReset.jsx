'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { Puff } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PasswordReset({ passwordResetDetails }) {
  const {
    email,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
  } = passwordResetDetails;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/authForgot/reset`,
        {
          email,
          newPassword,
          confirmNewPassword,
        }
      );

      if (response.status === 200) {
        toast.success('Password reset successful!');
        router.push('/Login'); // Redirect on success
      } else {
        toast.error(response.data.message || 'Password reset failed.');
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* New Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>

        {/* Confirm New Password Field */}
        <div>
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Your New Password
          </label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm your new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>

        {/* Reset Password Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition duration-300 ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Puff
                visible={true}
                height="30"
                width="30"
                color="#FFFFFF"
                ariaLabel="puff-loading"
                wrapperStyle={{ display: 'inline-block' }}
              />
            ) : (
              'Reset Password'
            )}
          </button>
        </div>
      </form>
    </>
  );
}

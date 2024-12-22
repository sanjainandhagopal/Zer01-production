import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';

export default function ProfileForm({ profileDetails }) {
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter();
  const {
    email,
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
    setOrganiation,
  } = profileDetails;

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true); // Start loading spinner
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          mobileNo,
          dateOfBirth,
          profession,
          organization,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful!");
        router.push("/"); // Redirect on success
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register Your Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="FirstName"
            id="FirstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="LastName"
            id="LastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="ConfirmPassword"
            id="ConfirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="tel"
            name="MobileNumber"
            id="MobileNumber"
            placeholder="Enter your mobile number"
            value={mobileNo}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="DOB"
            id="DOB"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profession</label>
          <input
            type="text"
            name="profession"
            id="profession"
            placeholder="Enter your profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Organization</label>
          <input
            type="text"
            name="organization"
            id="organization"
            placeholder="Enter your organization"
            value={organization}
            onChange={(e) => setOrganiation(e.target.value)}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
          className={`w-full py-3 rounded-lg transition duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          }`}
        >
          {loading ? (
            <Puff
              visible={true}
              height="30"
              width="30"
              color="#FFFFFF"
              ariaLabel="puff-loading"
              wrapperStyle={{ display: "inline-block" }}
            />
          ) : (
            "Register"
          )}
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />
    </div>
  );
}

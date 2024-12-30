"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const NavigationBar = ({ user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const onLogin = () => {
    router.push("/Login");
  };

  const onLogout = async () => {
    try {
      // Call the backend logout API
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      // Redirect to login page after successful logout
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full flex flex-row justify-center mt-10">
      <nav className="fixed top-0 mt-2 w-full hero-card   backdrop-blur-lg text-white z-50 shadow-lg rounded-lg">
        <div className="container mx-auto h-20 flex items-center justify-between px-4">
          {/* Left: Nav Brand */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white">
            <img src="/zer01-logo.png" alt="Brand Logo" className="" />
          </div>

          {/* Middle: Nav Links */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/Course/Catelog" className="hover:text-gray-300">Course</a>
            <a href="/Project/Catelog" className="hover:text-gray-300">Projects</a>
            <a href="/Programming/Catelog" className="hover:text-gray-300">Problems</a>
            <a href="/Blogs/Catelog" className="hover:text-gray-300">Blogs</a>
            <a href="/Profile" className="hover:text-gray-300">Profile</a>
          </div>

          {/* Right: Profile or Login */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {user ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative flex flex-col items-center"
                >
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {user?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2">
                      <p className="text-sm">Hello, {user.name}!</p>
                    </div>
                    <hr className="border-gray-300" />
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            {isDrawerOpen ? (
              <span className="text-white text-2xl">&times;</span>
            ) : (
              <span className="text-white text-2xl">&#9776;</span>
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div className="md:hidden bg-gray-800 text-white w-full py-4 space-y-4">
            <a href="/Course/Catelog" className="block text-center hover:text-gray-300">Course</a>
            <a href="/Project/Catelog" className="block text-center hover:text-gray-300">Projects</a>
            <a href="/Programming/Catelog" className="block text-center hover:text-gray-300">Problems</a>
            <a href="/Blogs/Catelog" className="block text-center hover:text-gray-300">Blogs</a>
            {user ? (
              <button
                onClick={onLogout}
                className="block w-full text-center text-red-600 hover:bg-gray-700 py-2"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="block w-full text-center bg-blue-600 py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavigationBar;

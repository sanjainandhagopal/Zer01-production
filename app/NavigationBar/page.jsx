"use client";
import React, { useState } from "react";

const NavigationBar = ({ isLoggedIn, onLogin, onLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent text-white z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left: Nav Brand */}
        <div className="flex items-center space-x-2">
          <img src="/zer01-logo.png" alt="Brand Logo" className="w-[6em]" />
        </div>

        {/* Middle: Nav Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/courses" className="hover:text-gray-300">Course</a>
          <a href="/projects" className="hover:text-gray-300">Projects</a>
          <a href="/problems" className="hover:text-gray-300">Problems</a>
          <a href="/blogs" className="hover:text-gray-300">Blogs</a>
        </div>

        {/* Right: Profile or Login */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <img
                src="/path/to/profile-icon.png"
                alt="Profile Icon"
                className="h-6 w-6 rounded-full"
              />
              <span>Logout</span>
            </button>
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
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-gray-800 via-transparent to-gray-900 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 text-lg">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsDrawerOpen(false)}
          >
            &times;
          </button>

          {/* Drawer Links */}
          <a
            href="/courses"
            className="text-white hover:text-gray-300"
            onClick={() => setIsDrawerOpen(false)}
          >
            Course
          </a>
          <a
            href="/projects"
            className="text-white hover:text-gray-300"
            onClick={() => setIsDrawerOpen(false)}
          >
            Projects
          </a>
          <a
            href="/problems"
            className="text-white hover:text-gray-300"
            onClick={() => setIsDrawerOpen(false)}
          >
            Problems
          </a>
          <a
            href="/blogs"
            className="text-white hover:text-gray-300"
            onClick={() => setIsDrawerOpen(false)}
          >
            Blogs
          </a>
          {isLoggedIn ? (
            <button
              onClick={() => {
                onLogout();
                setIsDrawerOpen(false);
              }}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                onLogin();
                setIsDrawerOpen(false);
              }}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;

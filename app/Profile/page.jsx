'use client';
import React, { useEffect, useState } from 'react';
import { fetchUser } from '../OperatorFunctions/userVerifier';
import NavigationBar from '../NavigationBar/page';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (errorUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{errorUser}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-500">No user found.</p>
      </div>
    );
  }

  return (
    <>
    <NavigationBar user={user} />
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Profile Header */}
        <div className="text-center">
          <div className="h-24 w-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.Profession}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <span className="text-blue-500 w-28 font-medium">Phone:</span>
            <span className="text-gray-800">{user?.Phone}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-blue-500 w-28 font-medium">D.O.B:</span>
            <span className="text-gray-800">{user?.dob}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-blue-500 w-28 font-medium">Profession:</span>
            <span className="text-gray-800">{user?.Profession}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-blue-500 w-28 font-medium">Organization:</span>
            <span className="text-gray-800">{user?.Organization}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

import React from 'react';

export default function MirrorForm({ mirrorDetails }) {
  const {
    email,
    firstName,
    lastName,
    password,
    mobileNo,
    dateOfbirth,
    profession,
    organization,
  } = mirrorDetails;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-gray-800">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
          {firstName?.[0]?.toUpperCase() || 'Zer01'}
        </div>
        <h3 className="mt-3 text-xl font-semibold">{firstName || 'Guest'}</h3>
        <p className="text-sm text-gray-600">{email || 'No email provided'}</p>
      </div>

      {/* Details Section */}
      <div className="space-y-4">
        {email && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <p className="text-sm text-gray-900">{email}</p>
          </div>
        )}
        {firstName && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <p className="text-sm text-gray-900">{firstName}</p>
          </div>
        )}
        {lastName && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <p className="text-sm text-gray-900">{lastName}</p>
          </div>
        )}
        {password && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <p className="text-sm text-gray-900">{'*'.repeat(password.length)}</p>
          </div>
        )}
        {mobileNo && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              Mobile No:
            </label>
            <p className="text-sm text-gray-900">{mobileNo}</p>
          </div>
        )}
        {dateOfbirth && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              DOB:
            </label>
            <p className="text-sm text-gray-900">{dateOfbirth}</p>
          </div>
        )}
        {profession && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              Profession:
            </label>
            <p className="text-sm text-gray-900">{profession}</p>
          </div>
        )}
        {organization && (
          <div className="transition duration-300 ease-in-out">
            <label className="block text-sm font-medium text-gray-700">
              Organization:
            </label>
            <p className="text-sm text-gray-900">{organization}</p>
          </div>
        )}
      </div>
    </div>
  );
}

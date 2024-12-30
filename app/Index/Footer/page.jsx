import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-2 mt-2">
      <div className="container pl-10 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

        {/* Cookie Consent */}
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center">
          <p className="text-sm md:mr-4">
            We use cookies to enhance your experience. By using our site, you agree to our{' '}
            <a
              href="/privacy-policy"
              className="text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>.
          </p>
          <button className="mt-2 md:mt-0 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition">
            Accept Cookies
          </button>
        </div>
      </div>
    </footer>
  );
}

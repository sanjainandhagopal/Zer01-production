import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-4">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

        {/* Cookie Consent */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          <p className="text-sm md:mr-4">
            We use cookies to enhance your experience. By using our site, you agree to our{' '}
            <a
              href="/privacy-policy"
              className="text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>.
          </p>
          <button
            className="mt-2 md:mt-0 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => alert('Cookies Accepted!')}
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </footer>
  );
}

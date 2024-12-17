import React from 'react';

export default function BlogCard() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-4 px-5">
      {/* Card 1 */}
      <div className="hero-card border-y-2 border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Image */}
        <div className="md:w-1/3 h-52 p-2 md:p-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Blog Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-2/3 md:p-4 py-2 flex flex-col md:justify-between justify-center mx-auto">
          {/* Tags */}
          <div className="text-gray-500 text-xs uppercase font-medium mb-2">Tag Name</div>

          {/* Title */}
          <h2 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-2">
            Blog Title That Fits In Two Lines
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-200 leading-snug mb-4 line-clamp-3">
            This is a brief description of the blog post that spans up to three lines. It gives readers a quick preview of the content.
          </p>

          {/* Button */}
          <button className='btn'>
            Button
          </button>
          
        </div>
      </div>

      {/* Card 2 */}
      <div className="hero-card border-y-2 border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Image */}
        <div className="md:w-1/3 h-52 p-2 md:p-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Blog Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-2/3 md:p-4 py-2 flex flex-col md:justify-between justify-center mx-auto">
          {/* Tags */}
          <div className="text-gray-500 text-xs uppercase font-medium mb-2">Tag Name</div>

          {/* Title */}
          <h2 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-2">
            Blog Title That Fits In Two Lines
          </h2>

          {/* Description */}
          <p className="text-sm text-white leading-snug mb-4 line-clamp-3">
            This is a brief description of the blog post that spans up to three lines. It gives readers a quick preview of the content.
          </p>

          {/* Button */}
          <button className='btn'>
            Button
          </button>
        </div>
      </div>
    </div>
  );
}

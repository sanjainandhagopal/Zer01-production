'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ProjectExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Use the router hook for navigation
  const projectData = {
    id: searchParams.get('id'),
    title: searchParams.get('title'),
    description: searchParams.get('description'),
    image: searchParams.get('image'),
    github: searchParams.get('github'),
  };

  if (!projectData.title) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>Loading project details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto py-10 px-5">
        {/* Project Header */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-10">
          <h1 className="text-3xl font-bold mb-4">{projectData.title}</h1>
          {/* Project Image */}
          <div className="relative w-full h-64 mb-10">
            <img
              src={projectData.image}
              alt={projectData.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <p style={{ whiteSpace: "pre-line" }} className="text-gray-300">{projectData.description}</p>
        </div>

        {/* Links */}
        <div className="flex justify-between items-center mb-10">
          <a
            href={projectData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
          >
            <span className="text-xl font-bold">GitHub</span>
          </a>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

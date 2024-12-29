import React from 'react';
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // For Git and Deployment icons


export default function Viewer({params}) {
  return (
    <div>Viewer: {params.projectId}
       <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 px-4">
      {/* Container */}
      <div className="max-w-5xl w-full bg-gray-800 shadow-lg rounded-lg p-6">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          Project Title
        </h1>

        {/* Intro */}
        <p className="text-lg sm:text-xl text-gray-300 mb-6 text-center leading-relaxed">
          This project is a simple web application built to demonstrate how to
          build responsive and attractive user interfaces using modern
          frameworks like Next.js and Tailwind CSS.
        </p>

        {/* Project Photo */}
        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-md mb-6">
          <Image
            src="/project-photo.jpg" // Replace with your project image
            alt="Project Screenshot"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-around items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* GitHub Link */}
          <a
            href="https://github.com/username/repo" // Replace with your GitHub repo link
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 transition px-6 py-2 rounded-lg text-xl"
          >
            <FaGithub size={24} />
            <span>GitHub</span>
          </a>

          {/* Deployment Link */}
          <a
            href="https://your-deployment-link.com" // Replace with your deployment link
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 transition px-6 py-2 rounded-lg text-xl"
          >
            <FaExternalLinkAlt size={24} />
            <span>Live Demo</span>
          </a>
        </div>

        {/* Tech Stack Section */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-4">
            Tech Stacks Used
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {/* Icons */}
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/icons/react.svg" // Replace with your React logo
                alt="React"
                width={48}
                height={48}
              />
              <span className="text-sm">React</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/icons/nextjs.svg" // Replace with your Next.js logo
                alt="Next.js"
                width={48}
                height={48}
              />
              <span className="text-sm">Next.js</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/icons/tailwind.svg" // Replace with your Tailwind CSS logo
                alt="Tailwind CSS"
                width={48}
                height={48}
              />
              <span className="text-sm">Tailwind</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/icons/firebase.svg" // Replace with your Firebase logo
                alt="Firebase"
                width={48}
                height={48}
              />
              <span className="text-sm">Firebase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

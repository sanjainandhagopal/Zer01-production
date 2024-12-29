import React from 'react';
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Project One",
    intro: "A simple web app using modern frameworks.",
    image: "/project1.jpg",
    github: "https://github.com/username/project1",
    liveDemo: "https://live-demo1.com",
    techStack: ["/icons/react.svg", "/icons/nextjs.svg", "/icons/tailwind.svg"],
  },
  {
    id: 2,
    title: "Project Two",
    intro: "An AI-powered chatbot solution for customer support.",
    image: "/project2.jpg",
    github: "https://github.com/username/project2",
    liveDemo: "https://live-demo2.com",
    techStack: ["/icons/python.svg", "/icons/firebase.svg", "/icons/docker.svg"],
  },
  {
    id: 3,
    title: "Project Three",
    intro: "A blockchain-based decentralized voting platform.",
    image: "/project3.jpg",
    github: "https://github.com/username/project3",
    liveDemo: "https://live-demo3.com",
    techStack: ["/icons/blockchain.svg", "/icons/solidity.svg"],
  },
];

export default function Catelog() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
    <div className="max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-10">My Projects</h1>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            {/* Project Image */}
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            {/* Project Details */}
            <div className="p-6">
              <a href='Project/Viewer' className="text-xl font-semibold mb-2">{project.title}</a>
              <p className="text-gray-300 text-sm mb-4">{project.intro}</p>

              {/* Tech Stack */}
              <div className="flex items-center space-x-4 mb-4">
                {project.techStack.map((icon, index) => (
                  <Image
                    key={index}
                    src={icon}
                    alt="Tech Icon"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                ))}
              </div>

              {/* Links */}
              <div className="flex justify-between items-center">
                {/* GitHub Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition"
                >
                  <FaGithub size={20} />
                  <span className="text-sm">GitHub</span>
                </a>
                {/* Live Demo Link */}
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition"
                >
                  <FaExternalLinkAlt size={20} />
                  <span className="text-sm">Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

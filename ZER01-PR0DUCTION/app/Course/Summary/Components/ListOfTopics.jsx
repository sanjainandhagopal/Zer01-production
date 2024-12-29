import React, { useState } from 'react'

export default function ListOfTopics({modules}) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle accordion open/close
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-xl mx-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Course Modules</h1>
      {/* Render accordion items */}
      {modules.length === 0 ? (
        <p className="text-gray-500">No modules available.</p>
      ) : (
        modules.map((module, index) => (
          <div key={index} className="accordion-item border rounded-lg mb-2 crs-sh">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <span className="font-semibold text-indigo-500">{module.Title}</span>
              <svg
                className={`w-5 h-5 transform transition-transform hover:text-indigo-500 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {/* Accordion Body */}
            <div
              className={`transition-all overflow-hidden ${
                activeIndex === index ? "max-h-screen p-4" : "max-h-0"
              }`}
            >
              {module.Content.length > 0 ? (
                <ul className="list-disc ml-5 space-y-2">
                  {module.Content.map((content, i) => (
                    <li
                      key={i}
                      className="hover:text-indigo-500 transition-colors"
                    >
                      <a href="#">{content.Title}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No content available for this module.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

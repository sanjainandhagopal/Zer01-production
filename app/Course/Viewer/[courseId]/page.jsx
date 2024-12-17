'use client';
import React, { use, useEffect, useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';

export default function CourseDetails({ params }) {
  const resolvedParams = use(params);
  const [courseData, setCourseData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video URL

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/resource/courseData/${resolvedParams.courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course data");

        const data = await response.json();
        console.log("Course Data:", data); // Verify structure
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error.message);
      }
    };

    if (resolvedParams?.courseId) fetchCourse();
  }, [resolvedParams.courseId]);

  if (!courseData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { Modules = [], FinalAssessment = {} } = courseData;

  return (
    <div className="flex">
      {/* Left Side Panel */}
      <div className="w-1/4 bg-gray-100 p-5 min-h-screen border-r">
        <h2 className="text-xl font-bold mb-4">Modules</h2>
        <ul className="space-y-4">
          {Modules.length > 0 ? (
            Modules.map((module, index) => (
              <li key={index} className="p-3 bg-white rounded-md shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Module {index + 1}: {module.Title}
                </h3>
                {/* Content */}
                {module.Content?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-600 mb-1">Content:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      {module.Content.map((content, idx) => (
                        <li
                          key={idx}
                          className="ml-3 cursor-pointer hover:text-blue-600"
                          onClick={() => setSelectedVideo(content.Video)} // Set video on click
                        >
                          {content.Title} - {content.Duration} seconds
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Module Assessment */}
                {module.ModuleAssessment?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-600 mb-1">Module Assessment:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-500">
                      {module.ModuleAssessment.map((assessment, idx) => (
                        <li key={idx} className="ml-3">
                          {assessment.Question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No modules available.</p>
          )}
        </ul>

        {/* Final Assessment */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Final Assessment</h2>
          {FinalAssessment?.MCQs?.length > 0 ? (
            <ul className="list-decimal list-inside text-sm text-gray-600">
              {FinalAssessment.MCQs.map((mcq, idx) => (
                <li key={idx} className="ml-3 mb-1">
                  {mcq.Question}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No final assessment available.</p>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-3/4 p-10">
        <h1 className="text-3xl font-bold mb-4">{courseData.Title}</h1>
        <p className="text-gray-700 mb-6">{courseData.Description}</p>
        <h2 className="text-2xl font-semibold mb-2">Category: {courseData.Category}</h2>
        <h3 className="text-lg mb-2">Price: ${courseData.Price}</h3>
        <p className="text-gray-500 mb-6">Duration: {courseData.Duration}</p>

        {/* Video Player */}
        {selectedVideo ? (
          <div>
            <VideoPlayer selectedVideo={selectedVideo} />
          </div>
        ) : (
          <div className="text-gray-500">Select a video to play.</div>
        )}
      </div>
    </div>
  );
}

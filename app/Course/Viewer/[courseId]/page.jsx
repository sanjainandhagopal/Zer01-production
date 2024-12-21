'use client';
import React, { useState, useEffect, useRef, use } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import McqValidator from '../components/McqValidator';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import { useRouter } from 'next/navigation';
import { FaceDetector } from '@/app/FaceTrackerAI/FaceDetector';

export default function CourseDetails({ params }) {
  const resolvedParams = use(params); // Unwrap the `params` Promise
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedModuleAssessment, setSelectedModuleAssessment] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null); // State to store the selected module id
  const [proctor, setProctor] = useState(false);
  const videoRef = useRef(null); // Single reference for the video element
  const router = useRouter();

  const handleProctorToggle = () => {
    setProctor((prev) => !prev);
  };

  // Play or pause video when `proctor` changes
  useEffect(() => {
    if (videoRef.current) {
      proctor ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [proctor]);

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/resource/courseData/${resolvedParams.courseId}`
        );
        if (!response.ok) throw new Error('Failed to fetch course data');

        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error.message);
      }
    };

    if (resolvedParams?.courseId) {
      fetchCourse();
    }
  }, [resolvedParams.courseId]);

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setSelectedModuleAssessment(null);
  };

  const handleAssessmentSelect = (assessmentData, moduleId) => {
    setSelectedModuleAssessment(assessmentData);
    setSelectedModuleId(moduleId); // Set the selected module id
    setSelectedVideo(null);
  };

  const handleAssessmentRoute = () => {
    router.push(`/Course/FinalAssessment/${resolvedParams.courseId}`);
  };

  if (!courseData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { Modules = [], FinalAssessment = {} } = courseData;

  return (
    <div className="flex">
      {/* Left Panel */}
      <div className="w-1/4 bg-gray-100 p-5 min-h-screen border-r">
        <h2 className="text-xl font-bold mb-4">Modules</h2>
        <ul className="space-y-4">
          {Modules.map((module, index) => (
            <li key={index} className="p-3 bg-white rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Module {index + 1}: {module.Title}
              </h3>
              {module.Content?.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-600 mb-1">Content:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-500">
                    {module.Content.map((content, idx) => (
                      <li
                        key={idx}
                        className="ml-3 cursor-pointer hover:text-blue-600"
                        onClick={() => handleVideoSelect(content.Video)}
                      >
                        {content.Title} - {content.Duration} seconds
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {module.ModuleAssessment?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-600 mb-1">Module Assessment:</h4>
                  <ul className="list-disc list-inside text-sm text-blue-500 cursor-pointer">
                    <li onClick={() => handleAssessmentSelect(module.ModuleAssessment, module._id)}>
                      <span className="hover:underline">View Module Assessment</span>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <button
            className="py-2 px-2 bg-blue-500 rounded-lg"
            onClick={handleAssessmentRoute}
          >
            Take Assessment
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/4 p-10">
        <h1 className="text-3xl font-bold mb-4">{courseData.Title}</h1>
        <p className="text-gray-700 mb-6">{courseData.Description}</p>
        <h2 className="text-2xl font-semibold mb-2">Category: {courseData.Category}</h2>
        <h3 className="text-lg mb-2">Price: ${courseData.Price}</h3>
        <p className="text-gray-500 mb-6">Duration: {courseData.Duration}</p>

        {selectedVideo && (
          <VideoPlayer selectedVideo={selectedVideo} videoRef={videoRef} />
        )}

        {selectedModuleAssessment && (
          <div className="mt-10">
            <McqValidator
              assessments={selectedModuleAssessment}
              userId={user?.id}
              courseId={resolvedParams.courseId}
              moduleId={selectedModuleId} // Ensure the moduleId is passed correctly here
            />
          </div>
        )}

        {!selectedVideo && !selectedModuleAssessment && (
          <div className="text-gray-500">Select a video or module assessment to display.</div>
        )}

        <button
          className="p-2 bg-blue-500 rounded-md"
          onClick={handleProctorToggle}
        >
          {proctor ? 'Pause course' : 'Resume course'}
        </button>

        <FaceDetector courseVideoRef={videoRef} proctor={proctor} />
      </div>
    </div>
  );
}

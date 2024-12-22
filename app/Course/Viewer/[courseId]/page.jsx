'use client';
import React, { useState, useEffect, useRef, use } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import McqValidator from '../components/McqValidator';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import { useRouter } from 'next/navigation';
import { FaceDetector } from '@/app/FaceTrackerAI/FaceDetector';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

export default function CourseDetails({ params }) {
  const handle = useFullScreenHandle();
  const resolvedParams = use(params); // Unwrap the `params` Promise
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedModuleAssessment, setSelectedModuleAssessment] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [proctor, setProctor] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null); // State to track expanded module
  const videoRef = useRef(null);
  const router = useRouter();

  const handleProctorToggle = () => {
    setProctor((prev) => !prev);
  };

  useEffect(() => {
    if (videoRef.current) {
      proctor ? videoRef.current.play() : videoRef.current.pause();
    }
    handle.enter();
  }, [proctor]);

  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

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

  const toggleModule = (moduleIndex) => {
    setExpandedModule((prev) => (prev === moduleIndex ? null : moduleIndex));
  };

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setSelectedModuleAssessment(null);
  };

  const handleAssessmentSelect = (assessmentData, moduleId) => {
    setSelectedModuleAssessment(assessmentData);
    setSelectedModuleId(moduleId);
    setSelectedVideo(null);
  };

  const handleAssessmentRoute = () => {
    router.push(`/Course/FinalAssessment/AccessValidator/${resolvedParams.courseId}`);
  };

  const isModuleLocked = (index) => {
    if (index === 0) return false; // The first module is always unlocked
    const previousModule = user?.CourseEnrollments?.find(
      (enrollment) => enrollment.CourseId === courseData._id
    )?.Modules[index - 1];
    if (!previousModule || previousModule.Status !== 'completed') return false;
    return true;
  };

  if (!courseData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { Modules = [], FinalAssessment = {} } = courseData;

  return (
    <FullScreen handle={handle}>
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="lg:w-1/4 bg-gray-50 p-5 min-h-screen border-r shadow-sm">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Course Modules</h2>
          <ul className="space-y-4">
            {Modules.map((module, index) => {
              const locked = isModuleLocked(index);

              return (
                <li
                  key={index}
                  className={`p-4 rounded-lg shadow-md transition-all ${
                    locked ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`flex justify-between items-center ${
                      locked ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={() => !locked && toggleModule(index)}
                  >
                    <h3
                      className={`text-lg font-medium ${
                        locked ? 'text-gray-500' : 'text-blue-600'
                      }`}
                    >
                      Module {index + 1}: {module.Title}
                    </h3>
                    <span className="text-lg font-bold">
                      {expandedModule === index ? '-' : '+'}
                    </span>
                  </div>
                  {expandedModule === index && !locked && (
                    <div className="mt-4">
                      {module.Content?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Content:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
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
                          <h4 className="font-medium text-gray-700 mb-2">Module Assessment:</h4>
                          <ul className="list-disc list-inside text-sm text-blue-500 cursor-pointer">
                            <li onClick={() => handleAssessmentSelect(module.ModuleAssessment, module._id)}>
                              <span className="hover:underline">View Module Assessment</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <button
              className="py-3 px-4 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition-all"
              onClick={handleAssessmentRoute}
            >
              Take Final Assessment
            </button>
          </div>
          <FaceDetector courseVideoRef={videoRef} proctor={proctor} />
        </div>

        {/* Right Panel */}
        <div className="lg:w-3/4 p-8 bg-white shadow-sm min-h-screen">
          {selectedVideo && (
            <VideoPlayer selectedVideo={selectedVideo} videoRef={videoRef} />
          )}

          {selectedModuleAssessment && (
            <div className="mt-10">
              <McqValidator
                assessments={selectedModuleAssessment}
                userId={user?.id}
                courseId={resolvedParams.courseId}
                moduleId={selectedModuleId}
              />
            </div>
          )}

          {!selectedVideo && !selectedModuleAssessment && (
            <div className="text-gray-500 text-center mt-10">
              Select a video or module assessment to display.
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <button
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              onClick={handleProctorToggle}
            >
              {proctor ? 'Pause Course' : 'Resume Course'}
            </button>
          </div>
        </div>
      </div>
    </FullScreen>
  );
}

'use client';
import React, { useEffect, useState } from 'react';
import McqPage from '../McqPage';
import ProgrammingPage from '../ProgrammingPage';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import { FaceDetector } from '@/app/FaceTrackerAI/FaceDetector';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const handle = useFullScreenHandle();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const resolvedParams = React.use(params); // Unwrap `params` using `React.use()`
  const [courseData, setCourseData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(''); // Tracks which tab is selected ('MCQ' or 'Programming')
  const [selectedProgrammingTask, setSelectedProgrammingTask] = useState(null); // Tracks the selected programming question
  const [proctor, setProctor] = useState(false);
  const videoRef = null;
  const route = useRouter();

  const handleEndTest = () => {
    route.push("/");
  }

  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  const handleProctorToggle = () => {
    setProctor((prev) => !prev);
    handle.enter();
  }

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

    if (resolvedParams?.courseId) fetchCourse();
  }, [resolvedParams?.courseId]);

  // Event Handlers for Switching Tabs
  const handleTabClick = (tab) => setSelectedTab(tab);

  // Event Handler for Selecting a Programming Question
  const handleProgrammingTaskSelect = (task) => setSelectedProgrammingTask(task);

  return (
    <FullScreen handle={handle}>
    <div className="container mx-auto p-6 text-gray-900">
      {/* Loading State */}
      {!courseData ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl font-medium text-gray-600">Loading course data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel (MCQ and Programming) */}
          <div className="col-span-3 bg-gray-100 p-6 rounded-lg shadow-md">
            {/* Header */}
            
            <h2 className="text-xl font-medium text-gray-600 mb-6">Final Assessment</h2>

            {/* Tab Selection */}
            {proctor? (
            <div className="space-y-4">
              
              {/* MCQ Button */}
              <button
                onClick={() => handleTabClick('MCQ')}
                className={`w-full px-4 py-2 text-lg rounded-lg transition ${
                  selectedTab === 'MCQ'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                MCQs
              </button>

              {/* Programming Tasks Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleTabClick('Programming')}
                  className={`w-full px-4 py-2 text-lg rounded-lg transition ${
                    selectedTab === 'Programming'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  Programming Tasks
                </button>
                {selectedTab === 'Programming' && (
                  <ul className="absolute left-0 w-full bg-white shadow-lg mt-2 rounded-lg">
                    {courseData.FinalAssessment.ProgrammingTasks.map((task, index) => (
                      <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-100 p-2"
                        onClick={() => handleProgrammingTaskSelect(task)}
                      >
                        Question No: {index+1}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            ) : "Click on the 'Start Assessment' button"}

            {/* Face Detection */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-md mt-6">
              <FaceDetector courseVideoRef={videoRef} proctor={proctor} />
            </div>

            <div className="mt-10 flex justify-center">
              {!proctor ? (
              <button
                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                onClick={handleProctorToggle}
              >
                {proctor ? 'Exit' : 'Start Assessment'}
              </button>
              ) : (
                <button
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  onClick={handleEndTest}
                >End Test</button>
              )}
            </div>
          </div>

          {/* Right Panel (Course Content) */}
          <div className="col-span-9 bg-white p-6 rounded-lg shadow-md">

            {/* Content Display */}
            {selectedTab === 'MCQ' && (
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">MCQs</h3>
                <McqPage courseData={courseData} CourseId={resolvedParams.courseId} user={user} />
              </div>
            )}

            {selectedTab === 'Programming' && (
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Programming Tasks</h3>
                {selectedProgrammingTask ? (
                  <ProgrammingPage programmingTask={selectedProgrammingTask} />
                ) : (
                  <p className="text-gray-500 mt-4">Select a programming task to view its details.</p>
                )}
              </div>
            )}

            {!selectedTab && (
              <p className="text-center text-gray-500">
                Please select either <span className="text-blue-500 font-semibold">MCQs</span> or{' '}
                <span className="text-blue-500 font-semibold">Programming Tasks</span>.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
    </FullScreen>
  );
}

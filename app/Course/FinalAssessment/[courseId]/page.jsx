'use client';
import React, { useEffect, useState } from 'react';
import McqPage from '../McqPage';
import ProgrammingPage from '../ProgrammingPage';

export default function Page({ params }) {
  const resolvedParams = React.use(params); // Unwrap `params` using `React.use()`
  const [courseData, setCourseData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(''); // Tracks which tab is selected ('MCQ' or 'Programming')
  const [selectedProgrammingTask, setSelectedProgrammingTask] = useState(null); // Tracks the selected programming question

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/resource/courseData/${resolvedParams.courseId}`
        );
        if (!response.ok) throw new Error('Failed to fetch course data');

        const data = await response.json();
        console.log('Course Data:', data); // Verify structure
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
    <div className="container mx-auto p-4">
      {/* Loading State */}
      {!courseData ? (
        <p>Loading course data...</p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">{courseData.Title}</h1>
          <h2 className="text-xl font-semibold mb-2">Final Assessment</h2>

          {/* Tab Selection */}
          <div className="flex space-x-4 mb-4">
            {/* Tab Buttons */}
            <button
              onClick={() => handleTabClick('MCQ')}
              className={`p-2 ${selectedTab === 'MCQ' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              MCQs
            </button>
            <button
              onClick={() => handleTabClick('Programming')}
              className={`p-2 ${selectedTab === 'Programming' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Programming Tasks
            </button>
          </div>

          {/* Content Display */}
          {selectedTab === 'MCQ' && (
            <div>
              <McqPage courseData={courseData} />
            </div>
          )}

          {selectedTab === 'Programming' && (
            <div>
              {/* Display Programming Tasks */}
              <h3 className="text-lg font-semibold mb-2">Programming Tasks</h3>
              <ul className="list-disc list-inside mb-4">
                {courseData.FinalAssessment.ProgrammingTasks.map((task, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={() => handleProgrammingTaskSelect(task)}
                  >
                    {task.Question}
                  </li>
                ))}
              </ul>

              {/* Show the selected programming task */}
              {selectedProgrammingTask ? (
                <ProgrammingPage programmingTask={selectedProgrammingTask} />
              ) : (
                <p>Select a programming task to view its details.</p>
              )}
            </div>
          )}

          {/* Default View */}
          {!selectedTab && <p>Please select either MCQs or Programming Tasks.</p>}
        </div>
      )}
    </div>
  );
}

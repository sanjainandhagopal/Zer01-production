'use client';
import React, { useEffect, useState } from 'react';
import { fetchCourseData } from '@/app/OperatorFunctions/courseProvider';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/app/NavigationBar/page';

export default function Summary({ params }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); // Manage dropdown state

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  // Unwrap `params` using React.use()
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setCourseId(unwrappedParams.courseId);
    };

    unwrapParams();
  }, [params]);

  // Fetch course data when `courseId` is available
  useEffect(() => {
    if (!courseId) return;

    fetchCourseData(setCourseData, setLoading, setError, courseId);
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/course/enroll`,
        {
          userId: user.id,
          courseId: courseId,
        },
        { withCredentials: true }
      );

      alert('Enrolled successfully!');
      router.push(`/Course/Viewer/PrivacyAccess/${courseId}`);
    } catch (error) {
      console.error('Enrollment error:', error);
      alert(error.response?.data?.message || 'Failed to enroll.');
    }
  };

  if (!courseId || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavigationBar user={user} />

      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">{courseData.Title}</h1>
          <p className="mt-2 text-lg">
            <strong>Category:</strong> {courseData.Category}
          </p>
          <p className="text-lg mt-2">{courseData.Description}</p>
        </div>
      </div>

      {/* Course Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 text-lg">
            <strong>Duration:</strong> {courseData.Duration}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Price:</strong> ${courseData.Price}
          </p>
        </div>

        {/* Modules */}
{courseData.Modules?.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Modules</h2>
    <div className="space-y-6">
      {courseData.Modules.map((module, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Module Header with Toggle */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <h3 className="text-xl font-bold text-indigo-600">{module.Title}</h3>
              <button
                className="text-indigo-600 hover:text-indigo-800 transition duration-300"
              >
                {isExpanded ? "▲" : "▼"}
              </button>
            </div>
            <p className="text-gray-700 mt-2">
              <strong>Score:</strong> {module.Score}
            </p>

            {/* Dropdown Content */}
            {isExpanded && module.Content?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800">Content</h4>
                <div className="space-y-4 mt-2">
                  {module.Content.map((content, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 p-4 rounded-md shadow-sm"
                    >
                      <p className="text-gray-800">
                        <strong>Title:</strong> {content.Title}
                      </p>
                      <p className="text-gray-800">
                        <strong>Description:</strong> {content.Description}
                      </p>
                      <p className="text-gray-800">
                        <strong>Duration:</strong> {content.Duration} seconds
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}


        {/* Enroll Button */}
        <div className="mt-8">
          <button
            onClick={handleEnroll}
            className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-300 text-lg"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}

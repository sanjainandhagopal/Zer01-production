'use client';
import React, { useEffect, useState } from 'react';
import { fetchCourseData } from '@/app/OperatorFunctions/courseProvider';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Summary({ params }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState(null); // Store the courseId after unwrapping `params`
  const router = useRouter();

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  // Unwrap `params` using React.use()
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setCourseId(unwrappedParams.courseId); // Extract `courseId` and store it
    };

    unwrapParams();
  }, [params]);

  // Fetch course data when `courseId` is available
  useEffect(() => {
    if (!courseId) return; // Only fetch if `courseId` is available

    fetchCourseData(setCourseData, setLoading, setError, courseId);
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/course/enroll`,
        {
          userId: user.id, // The logged-in user's ID
          courseId: courseId, // The current course's ID
        },
        { withCredentials: true } // Send cookies with the request
      );
  
      alert("Enrolled successfully!");
      router.push(`/Course/Viewer/${user.id}`);
    } catch (error) {
      console.error("Enrollment error:", error);
      alert(error.response?.data?.message || "Failed to enroll.");
      router.push(`/Course/Viewer/${user.id}`);
    }
  };
  

  if (!courseId || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome : {user?.id}</h1>
      <h1>{courseData.Title}</h1>
      <p><strong>Category:</strong> {courseData.Category}</p>
      <p><strong>Description:</strong> {courseData.Description}</p>
      <p><strong>Duration:</strong> {courseData.Duration}</p>
      <p><strong>Price:</strong> ${courseData.Price}</p>

      {/* Render Modules */}
      {courseData.Modules?.length > 0 && (
        <div>
          <h2>Modules</h2>
          {courseData.Modules.map((module, index) => (
            <div key={index}>
              <h3>{module.Title}</h3>
              <p><strong>Score:</strong> {module.Score}</p>

              {/* Render Module Content */}
              {module.Content?.length > 0 && (
                <div>
                  <h4>Content</h4>
                  {module.Content.map((content, idx) => (
                    <div key={idx}>
                      <p><strong>Title:</strong> {content.Title}</p>
                      <p><strong>Description:</strong> {content.Description}</p>
                      <p><strong>Duration:</strong> {content.Duration} seconds</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleEnroll}>Enroll</button>
    </div>
  );
}

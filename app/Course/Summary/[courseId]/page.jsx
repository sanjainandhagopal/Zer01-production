'use client';
import React, { useEffect, useState } from 'react';
import { fetchCourseData } from '@/app/OperatorFunctions/courseProvider';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/app/NavigationBar/page';
import Description from '../Components/Description';
import { Slab } from 'react-loading-indicators';

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

  if (!courseId || loading) 
  return  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
            <div style={{ transform: 'rotate(180deg)' }}>
              <Slab color="#0e1c8e" size="large" text="" textColor="" />
            </div>
          </div>; 
  if (error) return router.push(`/Login`);

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <NavigationBar user={user} />

      <Description user={user} course={courseData} courseId={courseId} />
    </div>
  );
}

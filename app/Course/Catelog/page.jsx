'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { fetchCourses } from "@/app/OperatorFunctions/courseProvider";
import { fetchUser } from "@/app/OperatorFunctions/userVerifier";
import NavigationBar from "@/app/NavigationBar/page";

export default function Catelog() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);

  const router = useRouter(); // Initialize Next.js router

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  // Fetch all courses on mount
  useEffect(() => {
    fetchCourses(setCourses, setLoadingCourses, setErrorCourses);
  }, []);

  // Navigate to the course details page
  const handleViewCourse = (id) => {
    router.push(`/Course/Summary/${id}`); // Navigate to dynamic route `/course/[id]`
  };

  if (loadingUser || loadingCourses) return <div>Loading...</div>;
  if (errorUser) return <div>{errorUser}</div>;
  if (errorCourses) return <div>{errorCourses}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavigationBar user={user} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white py-10">
        <h2 className="text-center text-3xl font-bold">Course Catalog</h2>
        <p className="text-center mt-2 text-lg">Explore our wide range of courses designed just for you!</p>
      </div>

      {/* Course List */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Course Header */}
              <div className="bg-indigo-500 text-white rounded-t-lg p-4">
                <h3 className="text-lg font-bold">{course.Title}</h3>
                <p className="text-sm mt-1">{course.Category}</p>
              </div>

              {/* Course Body */}
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Description:</strong> {course.Description}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Duration:</strong> {course.Duration}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  <strong>Price:</strong> ${course.Price}
                </p>
                <button
                  onClick={() => handleViewCourse(course._id)}
                  className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No courses available.</p>
        )}
      </div>
    </div>
  );
}

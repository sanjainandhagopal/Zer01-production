'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { fetchCourses } from "@/app/OperatorFunctions/courseProvider";
import { fetchUser } from "@/app/OperatorFunctions/userVerifier";
import NavigationBar from "@/app/NavigationBar/page";
import { Slab } from "react-loading-indicators";
import Categories from "@/app/Index/Categories/Categories";

export default function Catelog() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [category, setCategory] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState(null);

  const router = useRouter(); // Initialize Next.js router
  const [loading, setLoading] = useState(false);

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

  // Fetch all courses on mount
  useEffect(() => {
    fetchCourses((fetchedCourses) => {
      setCourses(fetchedCourses);
      setFilteredCourses(fetchedCourses); // Initially show all courses
      setLoadingCourses(false);
    }, setLoadingCourses, setErrorCourses);
  }, []);

  // Update filtered courses when category changes
  useEffect(() => {
    if (category === "") {
      setFilteredCourses(courses); // Show all courses if no category selected
    } else {
      setFilteredCourses(courses.filter((course) => course.Category === category));
    }
  }, [category, courses]);

  // Navigate to the course details page
  const handleViewCourse = (id) => {
    setLoading(true);
    router.push(`/Course/Summary/${id}`); // Navigate to dynamic route `/course/[id]`
  };

  if (loadingUser || loadingCourses)
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
        <div style={{ transform: 'rotate(180deg)' }}>
          <Slab color="#0e1c8e" size="large" text="" textColor="" />
        </div>
      </div>
    );
  if (errorUser) return router.push(`/Login`);
  if (errorCourses) return <div>{errorCourses}</div>;

  return (
    <div className="min-h-screen bg-black">
      {/* Full-Page Loader */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
          <div style={{ transform: 'rotate(180deg)' }}>
            <Slab color="#0e1c8e" size="large" text="" textColor="" />
          </div>
        </div>
      )}
      {/* Navigation Bar */}
      <NavigationBar user={user} />

      {/* Page Header */}
      <div className="bg-black text-white py-10 mt-10">
        <h2 className="text-center text-3xl font-bold">Course Catalog</h2>
        <p className="text-center mt-2 text-lg">Explore our wide range of courses designed just for you!</p>
        <Categories setCategory={setCategory} />
      </div>

      {/* Course List */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 snap-start border-y-2 rounded-2xl border-gray-100 backdrop-blur-xl text-gray-100">
              {/* Course Header with Background Image */}
              <div
                className="h-40 bg-cover bg-center bg-no-repeat rounded-t-2xl flex flex-col justify-center p-4"
                style={{
                  backgroundImage: "url('/ccourse.png')", // Replace with your image path
                }}
              >
                <h3 className="text-xl font-bold text-white">{course.Title}</h3>
                <p className="text-sm font-medium text-gray-300 mt-1">{course.Category}</p>
              </div>

              {/* Course Body */}
              <div className="p-4">
                <p className="text-sm mb-2">
                  <strong>Description:</strong> {course.Description}
                </p>
                <p className="text-sm mb-2">
                  <strong>Duration:</strong> {course.Duration}
                </p>
                <p className="text-sm mb-4">
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
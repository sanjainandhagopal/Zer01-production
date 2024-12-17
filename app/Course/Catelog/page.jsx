'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import Next.js router
import { fetchCourses } from "@/app/OperatorFunctions/courseProvider";
import { fetchUser } from "@/app/OperatorFunctions/userVerifier";

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
    <div>
      <h1>Welcome, {user?.id || "User"}</h1>
      <h2>Course Catalog</h2>
      <div>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>{course.Title}</h3>
              <p><strong>Category:</strong> {course.Category}</p>
              <p><strong>Description:</strong> {course.Description}</p>
              <p><strong>Duration:</strong> {course.Duration}</p>
              <p><strong>Price:</strong> ${course.Price}</p>
              <button onClick={() => handleViewCourse(course._id)}>View</button>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}

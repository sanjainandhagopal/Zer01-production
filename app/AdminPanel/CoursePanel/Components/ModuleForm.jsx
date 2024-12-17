'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModuleForm() {
  const [courses, setCourses] = useState([]); // To store fetched courses
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course ID
  const [moduleData, setModuleData] = useState({
    title: "",
    score: 100,
    content: [],
    moduleAssessment: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch courses from the database when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/getCourse`); // Replace with your backend endpoint
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    }

    const newModule = {
      ...moduleData,
    };

    try {
        setIsLoading(true);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/${selectedCourse}/modules`, newModule); // Replace with your backend endpoint
        alert("Module added successfully!");
        setModuleData({
            title: "",
            score: 100,
            content: [],
            moduleAssessment: [],
        });
        setIsLoading(false);
    } catch (error) {
      console.error("Error adding module:", error);
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add Module</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown to select course */}
        <div>
          <label htmlFor="course">Select Course:</label>
          <select
            id="course"
            name="course"
            className="text-gray-900"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select a Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.Title}
              </option>
            ))}
          </select>
        </div>

        {/* Input for module title */}
        <div>
          <label htmlFor="title">Module Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="text-gray-900"
            value={moduleData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Input for module score */}
        <div>
          <label htmlFor="score">Module Score:</label>
          <input
            type="number"
            id="score"
            name="score"
            className="text-gray-900"
            value={moduleData.score}
            onChange={handleChange}
            required
          />
        </div>

        {/* You can add additional fields for `content` and `moduleAssessment` here */}

        <button type="submit">{isLoading ? "Loading" : "Add Module"}</button>
      </form>
    </div>
  );
}

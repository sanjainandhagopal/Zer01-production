'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ContentForm() {
  const [courses, setCourses] = useState([]); // To store fetched courses
  const [selectedCourse, setSelectedCourse] = useState(''); // Selected course ID
  const [selectedModule, setSelectedModule] = useState(''); // Selected module ID
  const [contentData, setContentData] = useState({
    title: '',
    description: '',
    duration: 0,
  }); // Content form data
  const [videoFile, setVideoFile] = useState(null); // To store the uploaded video file
  const [isLoading, setIsLoading] = useState(false);

  // Fetch courses and modules from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/getCourse`
        ); // Backend endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Handle form submission to add content
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !selectedModule) {
      alert('Please select both a course and a module.');
      return;
    }

    if (!videoFile) {
      alert('Please upload a video file.');
      return;
    }

    try {
      setIsLoading(true);

      // Create FormData to include the video file and other form data
      const formData = new FormData();
      formData.append('Title', contentData.title); // Correct field names
      formData.append('Description', contentData.description);
      formData.append('Video', videoFile); // Correct field name
      formData.append('Duration', parseInt(contentData.duration, 10)); // Convert duration to integer

      // Send the FormData to the backend
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/${selectedCourse}/modules/${selectedModule}/content`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Content added successfully!');
      setContentData({ title: '', description: '', duration: 0 }); // Reset form fields
      setVideoFile(null); // Reset video file
    } catch (error) {
      console.error('Error adding content:', error);
      alert('Failed to add content.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContentData({ ...contentData, [name]: value });
  };

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        {/* Dropdown to select course */}
        <div className="mb-4">
          <label htmlFor="course" className="block mb-2">
            Select Course:
          </label>
          <select
            id="course"
            name="course"
            className="block w-full border rounded p-2 text-gray-900"
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

        {/* Dropdown to select module */}
        <div className="mb-4">
          <label htmlFor="module" className="block mb-2">
            Select Module:
          </label>
          <select
            id="module"
            name="module"
            className="block w-full border rounded p-2 text-gray-900"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="">-- Select a Module --</option>
            {selectedCourse &&
              courses
                .find((course) => course._id === selectedCourse)
                ?.Modules.map((module) => (
                  <option key={module._id} value={module._id}>
                    {module.Title}
                  </option>
                ))}
          </select>
        </div>

        {/* Form fields for content details */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Content Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="block w-full border rounded p-2 text-gray-900"
            value={contentData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="block w-full border rounded p-2 text-gray-900"
            value={contentData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block mb-2">
            Duration (seconds):
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            className="block w-full border rounded p-2 text-gray-900"
            value={contentData.duration}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block mb-2">
            Upload Video:
          </label>
          <input
            id="video"
            name="video"
            type="file"
            accept="video/*"
            className="block w-full border rounded p-2 text-gray-900"
            onChange={handleVideoChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Content'}
        </button>
      </form>
    </div>
  );
}

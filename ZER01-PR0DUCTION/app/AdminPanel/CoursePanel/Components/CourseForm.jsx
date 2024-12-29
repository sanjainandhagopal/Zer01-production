'use client';
import React, { useState } from "react";
import axios from "axios";

export default function CourseForm() {
  // State to store form inputs
  const [formData, setFormData] = useState({
    Title: "",
    Category: "",
    Description: "",
    Duration: "",
    Price: 0,
    NumberOfModules: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Predefined category options
  const categories = [
    "Prompt Engineering",
    "Cloud Computing",
    "AI & ML",
    "Networking",
    "Web Development",
    "Mechanical Design",
    "IoT",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Send a POST request to your backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/createCourse`, formData);
      alert("Course created successfully!");
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Title" className="block text-sm font-medium text-gray-700">Course Title</label>
          <input
            type="text"
            name="Title"
            id="Title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="Category"
            id="Category"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            value={formData.Category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="Description"
            id="Description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            value={formData.Description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Duration" className="block text-sm font-medium text-gray-700">Duration (e.g., "3 hours")</label>
          <input
            type="text"
            name="Duration"
            id="Duration"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            value={formData.Duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="Price"
            id="Price"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            value={formData.Price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="NumberOfModules" className="block text-sm font-medium text-gray-700">Number of Modules</label>
          <input
            type="number"
            name="NumberOfModules"
            id="NumberOfModules"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            value={formData.NumberOfModules}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Loading..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

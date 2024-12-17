'use client';
import React, { useState } from "react";
import axios from "axios"; // Assuming you're using Axios for API calls

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
    <div>
      <h1>Create a New Course</h1>
      <form onSubmit={handleSubmit} className="">
        <label htmlFor="Title">Course Title:</label>
        <input
          type="text"
          name="Title"
          id="Title"
          className="text-gray-900"
          value={formData.Title}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="Category">Category:</label>
        <input
          type="text"
          name="Category"
          id="Category"
          className="text-gray-900"
          value={formData.Category}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="Description">Description:</label>
        <textarea
          type="text"
          name="Description"
          id="Description"
          className="text-gray-900"
          value={formData.Description}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="Duration">Duration (e.g., "3 hours"):</label>
        <input
          type="text"
          name="Duration"
          id="Duration"
          className="text-gray-900"
          value={formData.Duration}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="Price">Price:</label>
        <input
          type="number"
          name="Price"
          id="Price"
          className="text-gray-900"
          value={formData.Price}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="NumberOfModules">Number of Modules:</label>
        <input
          type="number"
          name="NumberOfModules"
          id="NumberOfModules"
          className="text-gray-900"
          value={formData.NumberOfModules}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">{isLoading ? "Loading..." : "Create Course"}</button>
      </form>
    </div>
  );
}

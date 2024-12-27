'use client';
import React, { useRef, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";

export default function CreateBlog() {
  const editor = useRef(null);

  // State to store form inputs
  const [formData, setFormData] = useState({
    BlogTitle: "",
    Content: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes for BlogTitle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle content changes for Jodit Editor
  const handleEditorChange = (newContent) => {
    setFormData({
      ...formData,
      Content: newContent,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Send a POST request to your backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adminBlog/createBlog`,
        formData
      );
      alert("Blog created successfully!");
      console.log(response.data);
      setFormData({ BlogTitle: "", Content: "" }); // Reset form
    } catch (error) {
      console.error("Error creating Blog:", error);
      alert("Failed to create Blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="BlogTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Title
          </label>
          <input
            type="text"
            name="BlogTitle"
            id="BlogTitle"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            value={formData.BlogTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="Content"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Content
          </label>
          <JoditEditor
            ref={editor}
            value={formData.Content}
            onChange={handleEditorChange} // Updates the Content field in formData
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Loading..." : "Post Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

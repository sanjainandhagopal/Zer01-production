'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";

export default function Viewer({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap the params promise
  const { blogId } = params; // Extract blog ID from route parameters
  const [blogData, setBlogData] = useState(null); // State to store blog data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/resource/blogData/${blogId}`);
        setBlogData(response.data); // Set the fetched blog data
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load the blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!blogData) {
    return <div>No blog found.</div>;
  }

  return (
    <div className=" mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blogData.BlogTitle}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on: {new Date(blogData.CreateDate).toLocaleDateString()}
      </p>
      <div className=" text-gray-800" dangerouslySetInnerHTML={{ __html: blogData.Content }}>
      </div>
    </div>
  );
}

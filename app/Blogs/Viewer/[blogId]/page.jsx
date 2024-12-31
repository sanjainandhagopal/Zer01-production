
'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";
import { Slab } from "react-loading-indicators";
import { useRouter } from "next/navigation";

export default function Viewer({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap the params promise
  const { blogId } = params; // Extract blog ID from route parameters
  const [blogData, setBlogData] = useState(null); // State to store blog data
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const route = useRouter();

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
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
        <div style={{ transform: 'rotate(180deg)' }}>
            <Slab color="#0e1c8e" size="large" text="" textColor="" />
        </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-500">No blog found.</p>
      </div>
    );
  }

  const handleExit = () => {
    setLoading(true);
    route.push("/Blogs/Catelog");
  }

  return (
    <div className="min-h-screen bg-gray-950 py-10">
      <button 
        onClick={handleExit}
        className='w-20 py-2 px-4 rounded-md bg-indigo-500 text-white'>Exit</button>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Blog Header */}
        <div className="bg-gray-900 p-10">
          <h1 className="text-4xl font-bold mb-2">{blogData.BlogTitle}</h1>
          <p className="text-sm font-medium">
            Published on: {new Date(blogData.CreateDate).toLocaleDateString()}
          </p>
        </div>

        {/* Blog Content */}
        <div className="p-8">
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogData.Content }}
          ></div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center">
          <p className="text-sm text-gray-500">
            Thank you for reading! Share your thoughts in the comments below.
          </p>
        </div>
      </div>
    </div>
  );
}

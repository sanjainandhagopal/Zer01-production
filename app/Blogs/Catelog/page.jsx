'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Catelog() {
  const [blogs, setBlogs] = useState([]); // State to store blogs
  const [loadingBlogs, setLoadingBlogs] = useState(true); // State to track loading
  const [errorBlogs, setErrorBlogs] = useState(null); // State to track errors
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/resource/blogList`);
        setBlogs(response.data); // Set the fetched blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setErrorBlogs("Failed to load blogs. Please try again later.");
      } finally {
        setLoadingBlogs(false); // Stop the loading state
      }
    };

    fetchBlogs();
  }, []);

  const handleViewBlog = (id) => {
    router.push(`/Blogs/Viewer/${id}`);
  }

  if (loadingBlogs) {
    return <div>Loading blogs...</div>;
  }

  if (errorBlogs) {
    return <div className="text-red-500">{errorBlogs}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Blog Catalog</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-4 border rounded-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-700">{blog.BlogTitle}</h2>
            <p className="text-sm text-gray-500">
              {new Date(blog.CreateDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleViewBlog(blog._id)}
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavigationBar from "@/app/NavigationBar/page";
import { fetchUser } from "@/app/OperatorFunctions/userVerifier";

export default function Catelog() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [blogs, setBlogs] = useState([]); // State to store blogs
  const [loadingBlogs, setLoadingBlogs] = useState(true); // State to track loading
  const [errorBlogs, setErrorBlogs] = useState(null); // State to track errors
  const router = useRouter();

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);

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
    <div className="">
      <NavigationBar user={user} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 mt-20">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="hero-card border border-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          {/* Left Section - Image */}
          <div className="w-full h-40 sm:h-48 md:h-52">
            <img src="../../ccourse.png" // Placeholder image
              alt="Blog"
              className="w-full h-full object-cover p-2"
            />
          </div>
  
          {/* Right Section */}
          <div className="p-4 flex flex-col justify-between">
            {/* Title */}
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug mb-4 line-clamp-2">
              {blog.BlogTitle}
            </h2>
  
            {/* Button */}
            <button
              className="bg-blue-500 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => handleViewBlog(blog._id)}
            >
              View Blog
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

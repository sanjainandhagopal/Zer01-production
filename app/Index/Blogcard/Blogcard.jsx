
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function BlogCard() {
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
    router.push(`/Blogs/Viewer/${id}`); // Navigate to the blog detail page
  };

  if (loadingBlogs) {
    return <div>Loading blogs...</div>;
  }

  if (errorBlogs) {
    return <div className="text-red-500">{errorBlogs}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="hero-card border border-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          {/* Left Section - Image */}
          <div className="w-full h-40 sm:h-48 md:h-52">
            <img src="ccourse.png" // Placeholder image
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
              className="text-[10px] md:text-lg btn mx-auto"
              onClick={() => handleViewBlog(blog._id)}
            >View Blog</button>
          </div>
        </div>
      ))}
    </div>
  );
  
    
}

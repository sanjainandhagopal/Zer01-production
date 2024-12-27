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
    <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-4 px-5">
      {blogs.map((blog) => (
        <div
          key={blog._id} // Unique key for each blog
          className="hero-card border-y-2 border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Section - Image */}
          <div className="md:w-1/3 h-52 p-2 md:p-0">
            <img
              src="https://via.placeholder.com/150" // Placeholder image
              alt="Blog"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Section */}
          <div className="w-2/3 md:p-4 py-2 flex flex-col md:justify-between justify-center mx-auto">
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-800 leading-tight mb-2 line-clamp-2">
              {blog.BlogTitle} {/* Dynamic title */}
            </h2>

            {/* Button */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => handleViewBlog(blog._id)} // Handle navigation
            >
              View Blog
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

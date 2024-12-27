import React, { useState } from "react";
import StickyCard from "./StickyCard";
import { Expand, Hourglass, Star } from "lucide-react";
import Topics from "./Topics";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Slab } from "react-loading-indicators";

export default function Description({ user, course, courseId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEnroll = async () => {
    try {
      if(!user) {
        router.push(`/Login`);
      }
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/course/enroll`,
        {
          userId: user.id,
          courseId: courseId,
        },
        { withCredentials: true }
      );
      router.push(`/Course/Viewer/PrivacyAccess/${courseId}`);
    } catch (error) {
      console.error("Enrollment error:", error);
      alert(error.response?.data?.message || "Failed to enroll.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 mt-10">
      {/* Full-Page Loader */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
          <div style={{ transform: 'rotate(180deg)' }}>
            <Slab color="#0e1c8e" size="large" text="" textColor="" />
          </div>
        </div>
      )}
      {/* Description Card */}
      <div className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col-reverse sm:flex-row items-start gap-4 p-4">
          {/* Left Section */}
          <div className="flex flex-col p-4 shadow-md rounded-lg w-full sm:w-1/2">
            <header>
              <h1 className="text-2xl px-2 font-bold text-center">
                {course.Title}
              </h1>
            </header>
            <section className="mt-5">
              <p className="text-sm sm:text-lg text-left w-full max-w-[600px] px-2 leading-relaxed">
                {course.Description}
              </p>
            </section>
            <div className="flex flex-wrap justify-center items-center gap-2 p-2">
              {/* Timer Button */}
              <button className="rounded-xl flex items-center justify-center gap-1 text-sm bg-indigo-500 w-full sm:w-auto px-3 py-2 hover:scale-105 transition-all duration-300">
                <Hourglass size={16} />
                <p>{course.Duration}</p>
              </button>
            </div>
            {/* Topics and Video Section */}
            <div className="flex flex-col sm:flex-row gap-4 bg-gray-950 shadow-lg rounded-lg mt-6 p-4">
              {/* Course Topics */}
              <div className="w-full p-2 wh-card bg-gray-900 shadow-md rounded-lg">
                <Topics modules={course.Modules} />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-gray-950 border-y-2 border-white shadow-md rounded-lg p-4 mx-auto">
            <StickyCard />
            <div
              onClick={handleEnroll}
              className="rounded-xl flex items-center justify-center gap-1 px-3 py-2 mt-2 bg-indigo-500 text-white border-indigo-500 border-2 w-full sm:w-auto hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Expand size={16} />
              <span>ENROLL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { truncateText } from "@/app/OperatorFunctions/DataTruncate";

export default function Cardlist({ courses, category }) {
  const router = useRouter();

  // Helper function to group courses by category and pick one card per category
  const getOneCardPerCategory = (courses) => {
    const categoryMap = {};
    courses.forEach((card) => {
      if (!categoryMap[card.Category]) {
        categoryMap[card.Category] = card; // Add the first card of this category
      }
    });
    return Object.values(categoryMap);
  };

  // Filtered courses logic
  const filteredCourses = category
    ? courses.filter((card) => card.Category === category)
    : getOneCardPerCategory(courses);

  // Navigate to the course details page
  const handleViewCourse = (id) => {
    router.push(`/Course/Summary/${id}`); // Navigate to dynamic route `/course/[id]`
  };

  return (
    <div className="mx-auto">
      <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 px-6 py-5 overflow-hidden scrollbar-star">
        {filteredCourses.map((card) => (
          <div
            key={card._id}
            className="flex flex-col snap-start border-y-2 rounded-3xl border-gray-100 md:h-full w-32 min-w-[10rem] md:w-64 md:min-w-[16rem] p-5 items-center justify-center hero-card backdrop-blur-xl"
          >
            <div className="relative">
              {/* First image */}
              <Image
                src="/ccourse.png"
                width={180}
                height={180}
                alt="Course Background"
              />

              {/* Second image */}
              <div className="absolute top-10 md:top-16 left-0 z-10 p-5">
                <Image
                  src="/next.svg"
                  width={180}
                  height={180}
                  alt="Overlay Image"
                />
              </div>
            </div>

            <div className="text-sm md:text-lg mt-3">
              <span>{truncateText(card.Title, 15)}</span>
            </div>
            <div className="text-[10px] md:text-sm text-center hidden md:block justify-center">
              {truncateText(card.Description, 50)} {/* Limit to 50 characters */}
            </div>
            <div className="flex mt-3 justify-between w-full text-sm md:px-5">
              <div className="time border p-1 rounded-lg flex items-center text-[10px] md:text-sm">
                {card.Duration}
              </div>
              <div className="enrollcounts md:border md:p-1 rounded-lg flex items-center justify-between">
                <div className="">
                  <UserPlus className="h-[1em]" />
                </div>
                <div>123</div>
              </div>
            </div>
            <div className="mx-auto mt-3">
              <button
                onClick={() => handleViewCourse(card._id)}
                className="text-[10px] md:text-lg btn"
              >
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

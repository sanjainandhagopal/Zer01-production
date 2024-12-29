import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserPlus } from 'lucide-react';
import PrblmCat from "../Categories/PrblmCat";
import { useRouter } from "next/navigation";
import { fetchProblems } from "@/app/OperatorFunctions/problemDataProvider";
import { truncateText } from "@/app/OperatorFunctions/DataTruncate";

export default function Prblmcard() {
  const [problems, setProblems] = useState([]);
  const [problemLoading, setProblemLoading] = useState(true);
  const [problemError, setProblemError] = useState(null);
  const router = useRouter();
  const [category, setCategory] = useState("");

  // Helper function to group problems by category and pick one card per category
  const getOneCardPerCategory = (problems) => {
    const categoryMap = {};
    problems.forEach((card) => {
      if (!categoryMap[card.Category]) {
        categoryMap[card.Category] = card; // Add the first card of this category
      }
    });
    return Object.values(categoryMap);
  };

  // Filtered courses logic
  const filteredCourses = category
    ? problems.filter((card) => card.Category === category)
    : getOneCardPerCategory(problems);
  
  useEffect(() => {
      fetchProblems(setProblems, setProblemLoading, setProblemError);
  }, []);

  const handleSubmit = (id) => {
    router.push(`/Programming/Solver/${id}`);
  };

  if (problemLoading) {
    return <div className="text-center text-lg font-semibold text-blue-600">Loading problems...</div>;
  }

  if (problemError) {
      return <div className="text-center text-lg font-semibold text-red-600">{problemError}</div>;
  }

  return (
    <div className="mx-auto">
      <PrblmCat setCategory={setCategory} />
      <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 px-6 py-5 overflow-hidden scrollbar-star justify-center">
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

            <div className="text-sm md:text-lg mt-3 text-center">
              <span>{truncateText(card.Title, 15)}</span>
            </div>
            <div className="mx-auto mt-3">
              <button 
                onClick={() => handleSubmit(card._id)}
                className="text-[10px] md:text-lg btn">
                Solve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>  
  );
}

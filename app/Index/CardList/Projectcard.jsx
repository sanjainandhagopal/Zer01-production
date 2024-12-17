import React from "react";
import Image from "next/image";

const cardData = [
  {
    id: 1,
    title: "Java",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    time: "24:24:24",
    enrollStatus: "Enrolled",
  },
  {
    id: 2,
    title: "JavaScript",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    time: "18:15:32",
    enrollStatus: "Enrolled",
  },
  {
    id: 3,
    title: "Python",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    time: "12:30:45",
    enrollStatus: "Enrolled",
  },
  {
    id: 4,
    title: "React",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    time: "20:10:10",
    enrollStatus: "Enrolled",
  },
  {
    id: 5,
    title: "Node.js",
    description:
      "Lorem elit. ",
    time: "15:20:30",
    enrollStatus: "Enrolled",
  },
];

export default function Projectcard() {
  return (
    <div className="mx-auto">
      <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 px-6 py-5 overflow-hidden scrollbar-star">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="flex  flex-row snap-start border-y-2 rounded-3xl border-gray-100 h-56 w-72  min-w-[20rem] p-5 items-center justify-center hero-card backdrop-blur-xl"
          >
            {/* Left Image */}
             <div className="relative">
                          {/* First image */}
                          <Image
                            src="/ccourse.png"
                            width={180}
                            height={180}
                            alt="Course Background"
                          />
                        </div>

            {/* Right Content */}
            <div className="w-2/3 pl-5 flex flex-col justify-between">
              <div>
                <h3 className="md:text-xl text-lg font-semibold mt-3 md:mb-2 text-center">{card.title}</h3>
                <p className="text-gray-600 text-sm sm:text-center ">{card.description}</p>
              </div>
              <div className="mt-3">
                <button className="text-[10px] md:text-sm btn ">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

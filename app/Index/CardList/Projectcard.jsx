import React from "react";
import Image from "next/image";

const cardData = [
  {
    id: 1,
    title: "Java",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
    time: "24:24:24",
    enrollStatus: "Enrolled",
  },
  {
    id: 2,
    title: "JavaScript",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
    time: "18:15:32",
    enrollStatus: "Enrolled",
  },
  {
    id: 3,
    title: "Python",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
    time: "12:30:45",
    enrollStatus: "Enrolled",
  },
  {
    id: 4,
    title: "React",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
    time: "20:10:10",
    enrollStatus: "Enrolled",
  },
  {
    id: 5,
    title: "Node.js",
    description:
      "Lorem elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
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
            className="flex flex-col h-full w-64 md:flex-row snap-start border-y-2 rounded-3xl border-gray-100 md:h-72 md:w-64  md:min-w-[32rem] min-w-[16rem] p-5 items-center justify-center hero-card backdrop-blur-xl"
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
            
            
                          {/* Second image */}
                          <div className="absolute top-16 left-0 z-10 p-5">
                            <Image
                              src="/next.svg"
                              width={180}
                              height={180}
                              alt="Overlay Image"
                            />
                          </div>
                        </div>

            {/* Right Content */}
            <div className="md:w-2/3 md:pl-5 md:flex md:flex-col md:justify-between">
              <div>
                <h3 className="md:text-xl text-lg font-semibold mt-3 md:mb-2 text-center">{card.title}</h3>
                <p className="text-gray-600 text-sm sm:text-center ">{card.description}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-500 text-sm">{card.time}</div>
                <div className="text-sm font-medium text-green-500">
                  {card.enrollStatus}
                </div>
              </div>

              <div className="mt-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mx-20 ">
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

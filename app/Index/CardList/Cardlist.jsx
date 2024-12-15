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
    title: "React",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
    time: "20:10:10",
    enrollStatus: "Enrolled",
  },
  {
    id: 6,
    title: "React",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
    time: "20:10:10",
    enrollStatus: "Enrolled",
  },
  {
    id: 7,
    title: "React",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquam non dolorem voluptates nemo voluptatibus quis.",
    time: "20:10:10",
    enrollStatus: "Enrolled",
  },
];

export default function Cardlist() {
  return (
    <div className=" mx-auto">
      <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 px-6 py-5 overflow-hidden scrollbar-star">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="flex flex-col snap-start border-y-2 rounded-3xl border-gray-100 h-full w-64 min-w-[16rem] p-5 items-center justify-center hero-card backdrop-blur-xl"
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
              <div className="absolute top-16 left-0 z-10 p-5">
                <Image
                  src="/next.svg"
                  width={180}
                  height={180}
                  alt="Overlay Image"
                />
              </div>
            </div>

            <div className="text-lg mt-3">
              <span>{card.title}</span>
            </div>
            <div className="text-sm text-center">{card.description}</div>
            <div className="flex mt-3 justify-between w-full">
              <div className="time">{card.time}</div>
              <div className="enrollcounts">{card.enrollStatus}</div>
            </div>
            <div className="view mx-auto mt-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

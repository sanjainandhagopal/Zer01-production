import React from 'react'
import Image from 'next/image'
import { Smile } from 'lucide-react';

export default function Hero() {
  return (
    <div>
    <div className="flex flex-col md:flex-row items-center mt-20 max-h-screen">
      <div className="mx-auto">
        <div
          className="hero-text tracking-wide text-center md:text-left"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Experience True Learning,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Like Never Before.
        </div>
        <div className="flex flex-col md:flex-row mt-10 items-center">
          <button className="flex justify-center w-48 p-2 bg-gradient-to-l from-teal-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
            <div className="text-xl">Hello Buddy</div>
            <Smile className="text-white mt-1 ml-2" />
          </button>
          <button className="mt-4 md:mt-0 md:ml-10 bg-gradient-to-l from-teal-600 via-purple-600 to-red-600 px-4 rounded-lg">
            <div>Explore</div>
          </button>
        </div>
      </div>
  
      {/* Right Section - Hidden in Phone View */}
      <div className="hidden md:flex mx-auto">
        <div className="z-20 mt-10 flex flex-row -mr-10">
          <div>
            <div className="flex flex-col border-y-2 rounded-3xl border-gray-100 h-60 w-52 items-center justify-center hero-card backdrop-blur-xl">
              {/* Image Section */}
              <div className="p-2">
                <Image
                  src="/prj.png"
                  alt="Example Image"
                  width={150}
                  height={150}
                  className="rounded-lg shadow-lg"
                />
              </div>
              {/* Text Section */}
              <div className="text-sm p-1 font-bold">Projects</div>
              <div className="text-sm pb-2">100+</div>
            </div>
          </div>
        </div>
  
        <div className="z-30 flex flex-row">
          <div className="flex flex-col border-y-2 rounded-3xl border-gray-100 h-60 w-52 items-center justify-center hero-card backdrop-blur-xl">
            {/* Image Section */}
            <div className="p-2">
              <Image
                src="/course.png"
                alt="Example Image"
                width={150}
                height={150}
                className="rounded-lg shadow-lg"
              />
            </div>
            {/* Text Section */}
            <div className="text-sm p-1 font-bold">Course</div>
            <div className="text-sm pb-2">100+</div>
          </div>
        </div>
  
        <div className="z-0 mt-20 flex flex-row -ml-10">
          <div className="">
            <div className="flex flex-col border-y-2 rounded-3xl border-gray-100 h-60 w-52 items-center justify-center hero-card backdrop-blur-xl">
              {/* Image Section */}
              <div className="p-2">
                <Image
                  src="/prblm.png"
                  alt="Example Image"
                  width={150}
                  height={150}
                  className="rounded-lg shadow-lg"
                />
              </div>
              {/* Text Section */}
              <div className="text-sm p-1 font-bold">Problems</div>
              <div className="text-sm pb-2">100+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Full-Width Image */}
    <div className="mt-0">
      <Image
        src="/Milky.svg"
        alt="Example Image"
        width={1600}
        height={800}
        className="rounded-lg shadow-lg"
      />
    </div>
  </div>
  
  )
}

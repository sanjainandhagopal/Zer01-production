import React from 'react'
import Image from 'next/image'
import { Smile } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero({user, setLoading}) {
  const route = useRouter();

  const handleRouteCourse = () => {
    setLoading(true);
    route.push("/Course/Catelog")
  }

  const handleRouteProblem = () => {
    setLoading(true);
    route.push("/Programming/Catelog")
  }

  const handleRouteProject = () => {
    setLoading(true);
    route.push("/Project/Catelog")
  }

  const handleProfileRoute = () => {
    setLoading(true);
    route.push("/Profile")
  }

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
          <button 
            onClick={handleProfileRoute}
            className="flex justify-center w-fit p-2 bg-gradient-to-l from-teal-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
            <div className="text-xl">Hello {user ? user.name : "Buddy"}</div>
            <Smile className="text-white mt-1 ml-2" />
          </button>
        </div>
      </div>
  
      {/* Right Section - Hidden in Phone View */}
      <div className="hidden md:flex mx-auto">
        <div
          
          className="z-20 mt-10 flex flex-row -mr-10">
          <div>
            <div
              onClick={handleRouteProject}
              className="flex flex-col cursor-pointer border-y-2 rounded-3xl border-gray-100 h-60 w-52 items-center justify-center hero-card backdrop-blur-xl">
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
              <div className="text-sm pb-2">7</div>
            </div>
          </div>
        </div>
  
        <div 
          onClick={handleRouteCourse}
          className="z-30 flex flex-row">
          <div className="flex flex-col border-y-2 cursor-pointer rounded-3xl border-gray-100 h-60 w-52 items-center justify-center hero-card backdrop-blur-xl">
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
            <div className="text-sm pb-2">60</div>
          </div>
        </div>
  
        <div 
          onClick={handleRouteProblem}
          className="z-0 mt-20 flex flex-row -ml-10">
          <div className="">
            <div className="flex flex-col border-y-2 cursor-pointer rounded-3xl border-gray-100 h-60 w-52 items-center justify-center hero-card backdrop-blur-xl">
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
              <div className="text-sm pb-2">4</div>
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

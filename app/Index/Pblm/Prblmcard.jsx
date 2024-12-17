import React from "react";

export default function Prblmcard() {
  return (
    <div className=" mx-auto flex justify-center">
      <div className="cards flex flex-row group p-4">
        {/* Card 1 */}
        <div>
        <div className="prblm-card border-y-2  border-gray-100  bg-red-500 text-white flex flex-col items-center justify-center text-center h-40 w-40 sm:h-48 sm:w-48 rounded-lg cursor-pointer transform transition duration-300 group-hover:blur-sm group-hover:scale-90 hover:!blur-none hover:!scale-110 hover:shadow-lg hover:shadow-gray-500/50">
          <p className="text-lg font-bold">Data Structure</p>
          <p className="text-sm opacity-80 group-hover:opacity-100">
            Lorem Ipsum
          </p>
        </div>
         {/* Card 2 */}
         <div className="prblm-card border-y-2  border-gray-100 bg-blue-500 mt-1 text-white flex flex-col items-center justify-center text-center h-40 w-40 sm:h-48 sm:w-48 rounded-lg cursor-pointer transform transition duration-300 group-hover:blur-sm group-hover:scale-90 hover:!blur-none hover:!scale-110 hover:shadow-lg hover:shadow-gray-500/50 ">
          <p className="text-lg font-bold">Mathematics</p>
          <p className="text-sm opacity-80 group-hover:opacity-100">
            Lorem Ipsum
          </p>
        </div>
        </div>
        {/* Card 3 */}
        <div>
        <div className="prblm-card border-y-2  border-gray-100 bg-green-500 text-white flex flex-col items-center justify-center text-center h-full w-40 sm:h-full sm:w-48 rounded-lg cursor-pointer transform transition duration-300 group-hover:blur-sm group-hover:scale-90 hover:!blur-none hover:!scale-110 hover:shadow-lg hover:shadow-gray-500/50">
          <p className="text-lg font-bold">Algorithms</p>
          <p className="text-sm opacity-80 group-hover:opacity-100">
            Lorem Ipsum
          </p>
        </div>
        </div>
        
      </div>
    </div>
  );
}

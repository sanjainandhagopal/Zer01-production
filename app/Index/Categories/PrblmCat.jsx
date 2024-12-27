import React from 'react';
import Image from 'next/image';

import { Cloud, Cpu, Network, SquareDashedBottomCode, PencilRuler, CircuitBoard } from 'lucide-react';

export default function PrblmCat({setCategory}) {
  return (
     <div className='container mx-auto mt-8 '>
            <div className="icon flex md:justify-center ">
              <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 px-6 py-5 overflow-hidden scrollbar-star ">
                <button 
                  onClick={() => setCategory("Algorithms")}
                  className="brutalist-button scroll-ms-6 snap-start algo flex-shrink-0 flex flex-col items-center p-4  h-28 w-28 md:h-32  md:w-32">
                  <div className="algo-logo mb-2">
                    <Image src="/algo.svg" width={60} height={60} alt='algo'  />
                  </div>
                  <div className="button-text ">
                    <span>Algorithm</span>
                  </div>
                </button>
    
                <button 
                  onClick={() => setCategory("DataStructures")}
                  className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start cloud flex flex-col items-center p-4  h-28 w-28 md:h-32  md:w-32">
                  <div className="cloud-logo mb-2">
                  <Image src="/Data.svg" width={60} height={60} alt='algo'  />
                  </div>
                  <div className="button-text">
                    <span>Data Structure</span>
                  </div>
                </button>
    
                <button 
                  onClick={() => setCategory("Mathematics")}
                  className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start maths flex flex-col items-center p-4  h-28 w-28 md:h-32  md:w-32">
                  <div className="maths-logo mb-2">
                  <Image src="/maths.svg" width={60} height={60} alt='algo'  />
                  </div>
                  <div className="button-text">
                    <span>Mathematics</span>
                  </div>
                </button>
    
                <button 
                  onClick={() => setCategory("DailyProblems")}
                  className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start daily flex flex-col items-center p-4  h-28 w-28 md:h-32  md:w-32">
                  <div className="daily-logo mb-2">
                  <Image src="/daily.svg" width={60} height={60} alt='algo'  />
                  </div>
                  <div className="button-text">
                    <span>Daily Problems</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
  )
}

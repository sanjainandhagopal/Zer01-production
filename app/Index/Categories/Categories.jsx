import React from 'react';
import { Cloud, Cpu, Network, SquareDashedBottomCode, PencilRuler, CircuitBoard } from 'lucide-react';

  export default function Categories({setCategory}) {
    return (
      <div className='container px-5 mx-auto mt-8'>
        <div className="icon flex md:justify-center">
          <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 px-6 py-5 overflow-hidden scrollbar-star ">
            <button 
              onClick={() => setCategory("Prompt Engineering")}
              className="brutalist-button scroll-ms-6 snap-start openai flex-shrink-0 flex flex-col items-center p-4 h-28 w-28 md:h-32 md:w-32">
              <div className="openai-logo mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="openai-icon w-12 h-12"
                >
                  <path
                    fill="#10A37F"
                    d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
                  ></path>
                </svg>
              </div>
              <div className="button-text ">
                <span>Prompt Engineering</span>
              </div>
            </button>

            <button 
              onClick={() => setCategory("Cloud Computing")}
              className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start cloud flex flex-col items-center p-4 h-28 w-28 md:h-32 md:w-32">
              <div className="cloud-logo mb-2">
                <Cloud className='text-white cloud-icon w-12 h-12' />
              </div>
              <div className="button-text">
                <span>Cloud Computing</span>
              </div>
            </button>

            <button 
              onClick={() => setCategory("AI & ML")}
              className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start cpu flex flex-col items-center p-4 h-28 w-28 md:h-32 md:w-32">
              <div className="cpu-logo mb-2">
                <Cpu className='text-white cpu-icon w-12 h-12' />
              </div>
              <div className="button-text">
                <span>AI & ML</span>
              </div>
            </button>

            <button 
              onClick={() => setCategory("Networking")}
              className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start network flex flex-col items-center p-4 h-28 w-28 md:h-32 md:w-32">
              <div className="network-logo mb-2">
                <Network className='text-white network-icon w-12 h-12' />
              </div>
              <div className="button-text">
                <span>Networking</span>
              </div>
            </button>

            <button 
              onClick={() => setCategory("Web Development")}
              className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start web flex flex-col items-center p-4 h-28 w-28 md:h-32 md:w-32">
              <div className="web-logo mb-2">
                <SquareDashedBottomCode className='text-white web-icon w-12 h-12' />
              </div>
              <div className="button-text">
                <span>Web Development</span>
              </div>
            </button>

            <button 
              onClick={() => setCategory("IoT")}
              className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start mech flex flex-col items-center p-4 h-28 w-28 md:h-32 md:w-32">
              <div className="mech-logo mb-2">
                <PencilRuler className='text-white mech-icon w-12 h-12' />
              </div>
              <div className="button-text">
                <span>Mechanical Design</span>
              </div>
            </button>

            <button 
              onClick={() => setCategory("Cloud Computing")}
              className="brutalist-button flex-shrink-0 scroll-ms-6 snap-start iot flex flex-col items-center p-4 h-28 w-28 md:h-32 md:w-32">
              <div className="iot-logo mb-2">
                <CircuitBoard className='text-white iot-icon w-12 h-12' />
              </div>
              <div className="button-text">
                <span>IOT</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

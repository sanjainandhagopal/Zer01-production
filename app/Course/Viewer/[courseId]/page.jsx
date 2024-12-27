'use client';
import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import McqValidator from '../components/McqValidator';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';
import { useRouter } from 'next/navigation';
import { FaceDetector } from '@/app/FaceTrackerAI/FaceDetector';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { ArrowBigLeft } from 'lucide-react';
import { Slab } from 'react-loading-indicators';

export default function CourseDetails({ params: paramsPromise }) {
  const handle = useFullScreenHandle();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [timeStamp, setTimeStamp] = useState(0);
  const [selectedModuleAssessment, setSelectedModuleAssessment] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [proctor, setProctor] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [params, setParams] = useState(null);
  const videoRef = useRef(null);
  const router = useRouter();

  const handleProctorToggle = () => {
    setProctor((prev) => !prev);
    if(proctor){
      handle.exit();
    } else {
      handle.enter();
    }
    
  }

  useEffect(() => {
    if (videoRef.current) {
      proctor ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [proctor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch params and user in parallel
        const [resolvedParams, fetchedUser] = await Promise.all([
          paramsPromise,
          new Promise((resolve) => fetchUser(resolve, () => resolve(null))),
        ]);

        setParams(resolvedParams);
        setUser(fetchedUser);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [paramsPromise]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!params?.courseId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/resource/courseData/${params.courseId}`
        );
        if (!response.ok) throw new Error('Failed to fetch course data');

        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error.message);
      }
    };

    fetchCourse();
  }, [params]);

  const toggleModule = (moduleIndex) => {
    setExpandedModule((prev) => (prev === moduleIndex ? null : moduleIndex));
  };

  const handleVideoSelect = (videoUrl, videoId, moduleId) => {
    // Find the course enrollment based on the course ID
    const enrollmentData = user?.courseEnrollments?.find(
        (enrollment) => {
            return enrollment.CourseId._id.toString() === courseData._id.toString();
        }
    );

    // Find the module data within the course enrollment
    const moduleData = enrollmentData?.Modules.find(
        (module) => {
            return module.ModuleId.toString() === moduleId.toString();
        }
    );

    // Find the video progress data within the module
    const videoProgressData = moduleData?.VideosProgress.find(
        (video) => {
            return video.VideoId.toString() === videoId.toString();
        }
    );

    // Extract the timestamp from the video progress data
    const VideoTimeStamp = videoProgressData?.Timestamp || 0;

    // Update state with the timestamp and video details
    setTimeStamp(VideoTimeStamp);
    setSelectedVideo(videoUrl);
    setSelectedVideoId(videoId);
    setSelectedModuleAssessment(null);
  };

  const handleAssessmentSelect = (assessmentData, moduleId) => {
    setSelectedModuleAssessment(assessmentData);
    setSelectedModuleId(moduleId);
    setSelectedVideo(null);
  };

  const handleAssessmentRoute = () => {
    router.push(`/Course/FinalAssessment/AccessValidator/${params.courseId}`);
  };

  // Locking logic for modules based on the user's progress
  const isModuleLocked = (index) => {
    if (index === 0) return false; // First module is always unlocked

    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => {
        return enrollment.CourseId._id.toString() == courseData._id.toString();
      }
    );

    if (!enrollmentData) return true; // If the user is not enrolled, lock all modules

    const previousModule = enrollmentData.Modules[index - 1];
    return !(previousModule && previousModule.Status === 'completed');
  };

  const isModuleAssessmentLoked = (index) => {
    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => {
        return enrollment.CourseId._id.toString() == courseData._id.toString();
      }
    );
  
    if (!enrollmentData) return true; // If the user is not enrolled, lock the assessment
  
    const currentModule = enrollmentData.Modules[index];
    
    // Check the last video in the module for IsWatched status
    const lastVideoProgress = currentModule?.VideosProgress?.[currentModule?.VideosProgress.length - 1];
  
    if (lastVideoProgress?.IsWatched === false) {
      return true; // Lock the module assessment if the last video is not watched
    }
  
    return false; // Unlock the module assessment if the last video is watched
  };
  

  const isAssessmentLoked = () => {
    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => {
        return enrollment.CourseId._id.toString() == courseData._id.toString();
      }
    );

    if (!enrollmentData) return true; // If the user is not enrolled, Final assessment is locked

    const lastModule = enrollmentData.Modules[enrollmentData.Modules.length - 1];
    return !(lastModule && lastModule.Status === 'completed');
  }

  // Check if the video content is unlocked (previous videos must be watched)
  const isVideoLocked = (moduleIndex, videoIndex) => {
    if (moduleIndex === 0 && videoIndex === 0) return false; // First video of the first module is unlocked

    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => enrollment.CourseId._id.toString() === courseData._id.toString()
    );

    if (!enrollmentData) return true; // If the user is not enrolled, lock all videos

    const moduleProgress = enrollmentData.Modules[moduleIndex];
    const previousVideoProgress = moduleProgress.VideosProgress[videoIndex - 1];
    
    // Check if the previous video is watched
    return previousVideoProgress?.IsWatched === false;
  };

  const handleExitCourse = () => {
    router.push(`/Course/Summary/${params.courseId}`);
  }

  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
            <div style={{ transform: 'rotate(180deg)' }}>
              <Slab color="#0e1c8e" size="large" text="" textColor="" />
            </div>
          </div>;
  }

  if (!courseData) {
    return <div className="text-center py-10">No course data found.</div>;
  }

  const { Modules = [], FinalAssessment = {} } = courseData;

  return (
    <FullScreen handle={handle}>
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="lg:w-1/4 bg-gray-900 p-5 min-h-screen border-r shadow-sm">
          <button 
            className="px-3 py-2 mb-2 flex bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={handleExitCourse}
          ><ArrowBigLeft /> Exit Course</button>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Course Modules</h2>
          {proctor? (
          <ul className="space-y-4">
            {Modules.map((module, index) => {
              const locked = isModuleLocked(index);

              return (
                <li
                  key={index}
                  className={`p-4 rounded-lg shadow-md transition-all ${
                    locked ? 'bg-gray-950 cursor-not-allowed' : 'bg-white hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`flex justify-between items-center ${
                      locked ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={() => !locked && toggleModule(index)}
                  >
                    <h3
                      className={`text-lg font-medium ${
                        locked ? 'text-gray-500' : 'text-blue-600'
                      }`}
                    >
                      Module {index + 1}: {module.Title}
                    </h3>
                    <span className="text-lg font-bold">
                      {expandedModule === index ? '-' : '+'}
                    </span>
                  </div>
                  {expandedModule === index && !locked && (
                    <div className="mt-4">
                      {module.Content?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Content:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {module.Content.map((content, idx) => {
                              const locked = isVideoLocked(index, idx);

                              return (
                                <li
                                  key={idx}
                                  className={`ml-3 cursor-pointer ${
                                    locked ? 'text-gray-500' : 'text-blue-600 hover:text-blue-800'
                                  }`}
                                  onClick={() => !locked && handleVideoSelect(content.Video, content._id, module._id)}
                                >
                                  {content.Title} - {content.Duration} seconds
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      {module.ModuleAssessment?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Module Assessment:</h4>
                        <ul className="list-disc list-inside text-sm text-blue-500 cursor-pointer">
                          <li
                            onClick={() => {
                              // Check if the module is locked based on the video's progress
                              if (!isModuleAssessmentLoked(index)) {
                                handleAssessmentSelect(module.ModuleAssessment, module._id);
                              }
                            }}
                            className={`cursor-pointer ${isModuleAssessmentLoked(index) ? 'text-gray-500 cursor-not-allowed' : 'text-blue-500 hover:text-blue-800'}`}
                          >
                            <span className="hover:underline">
                              {isModuleAssessmentLoked(index) ? 'Assessment Locked' : 'View Module Assessment'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          ) : "Please enable proctoring"}
          <div className="mt-8">
            <button
              className={`py-3 px-4 rounded-lg w-full transition-all ${
                isAssessmentLoked()
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              onClick={() => {
                if (!isAssessmentLoked()) {
                  handleAssessmentRoute();
                } else {
                  alert('You need to complete all modules to take the final assessment.');
                }
              }}
              disabled={isAssessmentLoked()}
            >
              Take Final Assessment
            </button>
          </div>

          <FaceDetector courseVideoRef={videoRef} proctor={proctor} FaceData={user.FaceData} coursePanel={true} />
          <div className="mt-10 flex justify-center">
            <button
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              onClick={handleProctorToggle}
            >
              {proctor ? 'Pause Course' : 'Resume Course'}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:w-3/4 p-8 shadow-sm min-h-screen">
          {selectedVideo && proctor && (
            <VideoPlayer
              selectedVideo={selectedVideo}
              videoRef={videoRef}
              userId={user?.id}
              courseId={params?.courseId}
              moduleId={expandedModule !== null ? Modules[expandedModule]._id : null}
              videoId={selectedVideoId} // Assuming `selectedVideo` has an `id` field for the video
              setUser={setUser}
              TimeStamp={timeStamp}
            />
          )}

          {selectedModuleAssessment && proctor && (
            <div className="mt-10">
              <McqValidator
                assessments={selectedModuleAssessment}
                userId={user?.id}
                courseId={params?.courseId}
                moduleId={selectedModuleId}
                setUser={setUser}
              />
            </div>
          )}

          {!selectedVideo && !selectedModuleAssessment && (
            <div className="text-gray-500 text-center mt-10">
              Select a video or module assessment to display.
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
}

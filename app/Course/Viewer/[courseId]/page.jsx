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
    if (proctor) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      proctor ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [proctor]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => enrollment.CourseId._id.toString() === courseData._id.toString()
    );

    const moduleData = enrollmentData?.Modules.find(
      (module) => module.ModuleId.toString() === moduleId.toString()
    );

    const videoProgressData = moduleData?.VideosProgress.find(
      (video) => video.VideoId.toString() === videoId.toString()
    );

    const VideoTimeStamp = videoProgressData?.Timestamp || 0;

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

  const isModuleLocked = (index) => {
    if (index === 0) return false;

    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => enrollment.CourseId._id.toString() === courseData._id.toString()
    );

    if (!enrollmentData) return true;

    const previousModule = enrollmentData.Modules[index - 1];
    return !(previousModule && previousModule.Status === 'completed');
  };

  const isModuleAssessmentLocked = (index) => {
    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => enrollment.CourseId._id.toString() === courseData._id.toString()
    );

    if (!enrollmentData) return true;

    const currentModule = enrollmentData.Modules[index];

    const lastVideoProgress =
      currentModule?.VideosProgress?.[currentModule?.VideosProgress.length - 1];

    if (lastVideoProgress?.IsWatched === false) {
      return true;
    }

    return false;
  };

  const isAssessmentLocked = () => {
    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => enrollment.CourseId._id.toString() === courseData._id.toString()
    );

    if (!enrollmentData) return true;

    const lastModule = enrollmentData.Modules[enrollmentData.Modules.length - 1];
    return !(lastModule && lastModule.Status === 'completed');
  };

  const isVideoLocked = (moduleIndex, videoIndex) => {
    if (moduleIndex === 0 && videoIndex === 0) return false;

    const enrollmentData = user?.courseEnrollments?.find(
      (enrollment) => enrollment.CourseId._id.toString() === courseData._id.toString()
    );

    if (!enrollmentData) return true;

    const moduleProgress = enrollmentData.Modules[moduleIndex];
    const previousVideoProgress = moduleProgress.VideosProgress[videoIndex - 1];

    return previousVideoProgress?.IsWatched === false;
  };

  const handleExitCourse = () => {
    router.push(`/Course/Summary/${params.courseId}`);
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
        <div style={{ transform: 'rotate(180deg)' }}>
          <Slab color="#0e1c8e" size="large" text="" textColor="" />
        </div>
      </div>
    );
  }

  if (!courseData) {
    return <div className="text-center py-10">No course data found.</div>;
  }

  const { Modules = [], FinalAssessment = {} } = courseData;

  return (
    <FullScreen handle={handle}>
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="lg:w-1/4  p-5 min-h-screen border-r shadow-sm space-y-4">
          <button
            className="px-3 py-2 flex items-center justify-start bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={handleExitCourse}
          >
            <ArrowBigLeft className="mr-2" /> Exit Course
          </button>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Course Modules</h2>
          {proctor ? (
          <ul className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
          {Modules.map((module, index) => {
            const locked = isModuleLocked(index);
        
            return (
              <li
                key={index}
                className={`p-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 ${
                  locked
                    ? 'bg-gray-700 cursor-not-allowed opacity-70'
                    : 'bg-gray-900 hover:shadow-lg '
                }`}
              >
                <div
                  className={`p-4 flex justify-between items-center rounded-lg ${
                    locked ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  onClick={() => !locked && toggleModule(index)}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      locked ? 'text-gray-500' : 'text-cyan-400'
                    }`}
                  >
                    Module {index + 1}: {module.Title}
                  </h3>
                  <span className={`text-xl font-bold ${locked ? 'text-gray-500' : 'text-cyan-400'}`}>
                    {expandedModule === index ? '-' : '+'}
                  </span>
                </div>
                {expandedModule === index && !locked && (
                  <div className="mt-4">
                    {module.Content?.length > 0 && (
                      <div>
                        <h4 className="font-medium text-cyan-400 mb-2">Content:</h4>
                        <ul className="list-none text-sm space-y-2">
                          {module.Content.map((content, idx) => {
                            const locked = isVideoLocked(index, idx);
        
                            return (
                              <li
                                key={idx}
                                className={`ml-3 cursor-pointer border border-gray-700 p-3 rounded-xl transition-transform transform hover:scale-105 duration-200 ${
                                  locked
                                    ? 'text-gray-500 bg-gray-800 cursor-not-allowed'
                                    : 'text-white bg-gray-700 hover:text-cyan-300 hover:bg-gray-600'
                                }`}
                                onClick={() =>
                                  !locked &&
                                  handleVideoSelect(content.Video, content._id, module._id)
                                }
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
                        <h4 className="font-medium text-cyan-400 mb-2">Module Assessment:</h4>
                        <ul className="list-none text-sm space-y-2">
                          <li
                            onClick={() => {
                              if (!isModuleAssessmentLocked(index)) {
                                handleAssessmentSelect(module.ModuleAssessment, module._id);
                              }
                            }}
                            className={`p-3 rounded-lg transition-transform transform hover:scale-105 duration-200 ${
                              isModuleAssessmentLocked(index)
                                ? 'text-gray-500 bg-gray-800 cursor-not-allowed'
                                : 'text-cyan-300 bg-gray-700 hover:bg-gray-600 hover:text-cyan-200'
                            }`}
                          >
                            <span className="hover:underline">
                              {isModuleAssessmentLocked(index)
                                ? 'Assessment Locked'
                                : 'View Module Assessment'}
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
        
          ) : (
            'Please enable proctoring'
          )}
          <div className="mt-8">
            <button
              className={`py-3 px-4 rounded-lg w-full transition-all ${
                isAssessmentLocked()
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              onClick={() => {
                if (!isAssessmentLocked()) {
                  handleAssessmentRoute();
                } else {
                  alert('You need to complete all modules to take the final assessment.');
                }
              }}
              disabled={isAssessmentLocked()}
            >
              Take Final Assessment
            </button>
          </div>

          <FaceDetector
            courseVideoRef={videoRef}
            proctor={proctor}
            FaceData={user.FaceData}
            coursePanel={true}
          />
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
              videoId={selectedVideoId}
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

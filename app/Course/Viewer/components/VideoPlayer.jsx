import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { fetchUser } from "@/app/OperatorFunctions/userVerifier";

const VideoPlayer = ({ selectedVideo, videoRef, userId, courseId, moduleId, videoId, setUser, TimeStamp }) => {
  const intervalRef = useRef(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [validTimeRange, setValidTimeRange] = useState({
    start: 0,
    end: TimeStamp || 0, // Allow user to set the end timestamp or default to 0
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = selectedVideo;
      videoRef.current.pause(); // Ensure the video doesn't auto-play unnecessarily

      // Set the video currentTime to TimeStamp when metadata is loaded
      const handleMetadataLoaded = () => {
        if (TimeStamp && TimeStamp > 0) {
          videoRef.current.currentTime = TimeStamp;
        }
      };

      const handleTimeUpdate = async () => {
        const currentTime = Math.floor(videoRef.current.currentTime); // Current time in seconds
        const duration = Math.floor(videoRef.current.duration); // Video duration in seconds
        const progress = Math.round((currentTime / duration) * 100); // Calculate progress percentage

        // Update timestamp and progress if the currentTime exceeds TimeStamp
        if (currentTime > TimeStamp) {
          // Call API to update progress every minute
          if (!intervalRef.current || Math.abs(currentTime - intervalRef.current) >= 60) {
            intervalRef.current = currentTime; // Prevent frequent API calls
            try {
              console.log(`User Id : ${userId}`);
              console.log(`course Id : ${courseId}`);
              console.log(`module Id : ${moduleId}`);
              console.log(`video Id : ${videoId}`);
              console.log(`progress value : ${progress}`);
              console.log(`timestamp value : ${currentTime}`);
              await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/course/track`, {
                userId,
                courseId,
                moduleId,
                videoId,
                progress,
                timestamp: currentTime,
              });
              fetchUser(setUser, setLoadingUser, setErrorUser);
            } catch (error) {
              // Log detailed error information
              if (error.response) {
                console.error("Error response:");
                console.error(`Status: ${error.response.status}`);
                console.error("Data:", error.response.data);
                console.error("Headers:", error.response.headers);
              } else if (error.request) {
                console.error("Error request:");
                console.error(error.request);
              } else {
                console.error("Error message:", error.message);
              }
              console.error("Error config:", error.config);
            }
          }
        }
      };

      // Prevent skipping forward beyond the valid timestamp
      const handleSeek = () => {
        const currentTime = videoRef.current.currentTime;
        if (currentTime > validTimeRange.end) {
          videoRef.current.currentTime = validTimeRange.end;
        }
      };

      videoRef.current.addEventListener("loadedmetadata", handleMetadataLoaded);
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("seeked", handleSeek);

      return () => {
        // Safely remove the event listeners
        if (videoRef.current) {
          videoRef.current.removeEventListener("loadedmetadata", handleMetadataLoaded);
          videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
          videoRef.current.removeEventListener("seeked", handleSeek);
        }
      };
    }
  }, [selectedVideo, videoRef, userId, courseId, moduleId, videoId, TimeStamp, validTimeRange]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Playing Video</h2>
      <video
        ref={videoRef}
        controls
        className="w-full rounded-lg shadow-lg"
      />
    </div>
  );
};

export default VideoPlayer;

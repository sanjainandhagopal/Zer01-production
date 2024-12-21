import React, { useEffect, forwardRef } from 'react';

const VideoPlayer = ({ selectedVideo, videoRef }) => {
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = selectedVideo;
      videoRef.current.pause(); // Ensure the video doesn't auto-play unnecessarily
    }
  }, [selectedVideo, videoRef]);

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

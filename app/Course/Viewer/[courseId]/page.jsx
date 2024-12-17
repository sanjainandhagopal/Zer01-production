'use client';
import React, { useEffect, useState } from 'react';

export default function Viewer({ params }) {
  const [courseId, setCourseId] = useState(null);

  // Unwrap `params` using React.use() and handle the Promise
  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const unwrappedParams = await params; // Await the params Promise
        setCourseId(unwrappedParams.courseId); // Extract `courseId` and store it in state
      } catch (error) {
        console.error("Error unwrapping params:", error);
      }
    };

    unwrapParams();
  }, [params]);

  // Show a loading state while `params` is being resolved
  if (!courseId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Viewer: {courseId}
    </div>
  );
}

'use client'; // Ensure this component is client-side only

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CreateBlog to avoid SSR issues
const CreateBlog = dynamic(() => import('./BlogPanel/CreateBlog'), { ssr: false });

export default function Page() {
  return (
    <div>
      <CreateBlog />
    </div>
  );
}

import Compiler from '@/app/Compiler/Compiler'
import React from 'react'

export default function ProgrammingPage({ programmingTask }) {
  return (
    <div className="container mx-auto bg-gray-50 min-h-screen">
      <div className="mx-auto bg-white rounded-lg shadow-xl">
        {/* Title Section */}
        <div className="mb-8">
          <p className="text-lg text-gray-600">{programmingTask.Description}</p>
        </div>
        <Compiler TestCases={programmingTask.TestCases} />
      </div>
    </div>
  )
}

import Compiler from '@/app/Compiler/Compiler'
import React from 'react'

export default function ProgrammingPage({programmingTask}) {
  return (
    <div>
      <h1>{programmingTask.Question}</h1>
      <h1>{programmingTask.TestCases[0].Input}</h1>
      <Compiler TestCases={programmingTask.TestCases} />
    </div>
  )
}

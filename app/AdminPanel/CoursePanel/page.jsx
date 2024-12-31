'use client';
import React, { useState } from 'react';
import CourseForm from './Components/CourseForm';
import ModuleForm from './Components/ModuleForm';
import ContentForm from './Components/ContentForm';
import ModuleAssessmentForm from './Components/ModuleAssessmentForm';
import FinalAssessmentMCQ from './Components/FinalAssessmentMCQ';
import FinalAssessmentProgramming from './Components/FinalAssessmentProgramming';
import ProjectForm from './Components/ProjectForm';
import ProblemTaskForm from './ProblemSolvingComponent/ProblemTaskForm';

export default function Coursepanel() {
  const [activeComponent, setActiveComponent] = useState('ModuleForm');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'CourseForm':
        return <CourseForm />;
      case 'ModuleForm':
        return <ModuleForm />;
      case 'ContentForm':
        return <ContentForm />;
      case 'ModuleAssessmentForm':
        return <ModuleAssessmentForm />;
      case 'FinalAssessmentMCQ':
        return <FinalAssessmentMCQ />;
      case 'FinalAssessmentProgramming':
        return <FinalAssessmentProgramming />;
      case 'ProjectForm':
        return <ProjectForm />;
      case 'ProblemTaskForm':
        return <ProblemTaskForm />;
      default:
        return <ModuleForm />;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <nav className="mb-6 p-4 shadow-md rounded-lg flex flex-wrap gap-2 justify-center">
        <button
          className={`px-4 py-2 rounded-md font-medium transition ${
            activeComponent === 'CourseForm'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('CourseForm')}
        >
          Course Form
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            activeComponent === 'ModuleForm'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('ModuleForm')}
        >
          Module Form
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            activeComponent === 'ContentForm'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('ContentForm')}
        >
          Content Form
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            activeComponent === 'ModuleAssessmentForm'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('ModuleAssessmentForm')}
        >
          Module Assessment Form
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            activeComponent === 'FinalAssessmentMCQ'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('FinalAssessmentMCQ')}
        >
          Final Assessment (MCQ)
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            activeComponent === 'FinalAssessmentProgramming'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('FinalAssessmentProgramming')}
        >
          Final Assessment (Programming)
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            activeComponent === 'ProjectForm'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('ProjectForm')}
        >
          Project Form
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium text-white transition ${
            activeComponent === 'ProblemTaskForm'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
          onClick={() => setActiveComponent('ProblemTaskForm')}
        >
          Problem Task Form
        </button>
      </nav>
      <div className="p-6 shadow-md rounded-lg">{renderComponent()}</div>
    </div>
  );
}

'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ProjectForm() {
    const [courses, setCourses] = useState([]); // To store fetched courses
    const [selectedCourse, setSelectedCourse] = useState(''); // Selected course ID
    const [projectTitle, setProjectTitle] = useState(''); // Project title
    const [projectDescription, setProjectDescription] = useState(''); // Project description
    const [projectUrl, setProjectUrl] = useState(''); // Project URL
    const [projectTotalScore, setProjectTotalScore] = useState(0); // Project total score

    // Fetch courses from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/getCourse`
                ); // Backend endpoint
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse || !projectTitle || !projectDescription) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/admin/addProject`,
                {
                    courseId: selectedCourse,
                    project: {
                        ProjectTitle: projectTitle,
                        Description: projectDescription,
                        Url: projectUrl,
                        TotalScore: projectTotalScore,
                    },
                }
            );
            alert('Project added successfully!');
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Failed to add project. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Dropdown to select course */}
                <div className="mb-4">
                    <label htmlFor="course" className="block mb-2">
                        Select Course:
                    </label>
                    <select
                        id="course"
                        name="course"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">-- Select a Course --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.Title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Project Title */}
                <div className="mb-4">
                    <label htmlFor="projectTitle" className="block mb-2">
                        Project Title:
                    </label>
                    <input
                        type="text"
                        id="projectTitle"
                        name="projectTitle"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Project Description */}
                <div className="mb-4">
                    <label htmlFor="projectDescription" className="block mb-2">
                        Project Description:
                    </label>
                    <textarea
                        id="projectDescription"
                        name="projectDescription"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* Project URL */}
                <div className="mb-4">
                    <label htmlFor="projectUrl" className="block mb-2">
                        Project URL (optional):
                    </label>
                    <input
                        type="text"
                        id="projectUrl"
                        name="projectUrl"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={projectUrl}
                        onChange={(e) => setProjectUrl(e.target.value)}
                    />
                </div>

                {/* Project Total Score */}
                <div className="mb-4">
                    <label htmlFor="projectTotalScore" className="block mb-2">
                        Total Score (optional):
                    </label>
                    <input
                        type="number"
                        id="projectTotalScore"
                        name="projectTotalScore"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={projectTotalScore}
                        onChange={(e) => setProjectTotalScore(Number(e.target.value))}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Project
                </button>
            </form>
        </div>
    );
}

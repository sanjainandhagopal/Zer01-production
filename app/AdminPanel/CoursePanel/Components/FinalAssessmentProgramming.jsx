'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function FinalAssessmentProgramming() {
    const [courses, setCourses] = useState([]); // To store fetched courses
    const [selectedCourse, setSelectedCourse] = useState(''); // Selected course ID
    const [programmingTask, setProgrammingTask] = useState({
        Question: '',
        TestCases: [], // Test cases stored here
    });
    const [newTestCase, setNewTestCase] = useState({ Input: '', ExpectedOutput: '' }); // New test case input fields

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

    // Handle changes for programming question
    const handleProgrammingTaskChange = (e) => {
        const { name, value } = e.target;
        setProgrammingTask({ ...programmingTask, [name]: value });
    };

    // Handle changes for the new test case input
    const handleNewTestCaseChange = (e) => {
        const { name, value } = e.target;
        setNewTestCase({ ...newTestCase, [name]: value });
    };

    // Add the new test case to the TestCases array
    const addTestCase = () => {
        if (!newTestCase.Input || !newTestCase.ExpectedOutput) {
            alert('Please fill both Input and Expected Output fields.');
            return;
        }
        setProgrammingTask({
            ...programmingTask,
            TestCases: [...programmingTask.TestCases, newTestCase],
        });
        setNewTestCase({ Input: '', ExpectedOutput: '' }); // Reset input fields
    };

    // Remove a specific test case
    const removeTestCase = (index) => {
        const updatedTestCases = programmingTask.TestCases.filter((_, idx) => idx !== index);
        setProgrammingTask({ ...programmingTask, TestCases: updatedTestCases });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse || !programmingTask.Question) {
            alert('Please select a course and fill in the programming question.');
            return;
        }

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/admin/addProgrammingTask`,
                {
                    courseId: selectedCourse,
                    programmingTask,
                }
            );
            alert('Programming task added successfully!');
            // Reset the form
            setProgrammingTask({
                Question: '',
                TestCases: [],
            });
        } catch (error) {
            console.error('Error adding programming task:', error);
            alert('Failed to add programming task.');
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

                {/* Input for programming question */}
                <div className="mb-4">
                    <label htmlFor="question" className="block mb-2">
                        Programming Question:
                    </label>
                    <textarea
                        id="question"
                        name="Question"
                        rows="4"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={programmingTask.Question}
                        onChange={handleProgrammingTaskChange}
                    ></textarea>
                </div>

                {/* Add a new test case */}
                <div className="mb-4">
                    <label className="block mb-2">Add Test Case:</label>
                    <textarea
                        name="Input"
                        placeholder="Input (Multiline supported)"
                        className="block w-full border rounded p-2 text-gray-900 mb-2"
                        rows="3"
                        value={newTestCase.Input}
                        onChange={handleNewTestCaseChange}
                    ></textarea>
                    <textarea
                        name="ExpectedOutput"
                        placeholder="Expected Output (Multiline supported)"
                        className="block w-full border rounded p-2 text-gray-900 mb-2"
                        rows="3"
                        value={newTestCase.ExpectedOutput}
                        onChange={handleNewTestCaseChange}
                    ></textarea>
                    <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={addTestCase}
                    >
                        Add Test Case
                    </button>
                </div>

                {/* Display list of test cases */}
                <div className="mb-4">
                    <label className="block mb-2">Test Cases:</label>
                    {programmingTask.TestCases.length === 0 ? (
                        <p>No test cases added yet.</p>
                    ) : (
                        programmingTask.TestCases.map((testCase, index) => (
                            <div
                                key={index}
                                className="mb-2 p-2 border rounded flex justify-between items-center"
                            >
                                <div>
                                    <div>
                                        <strong>Input:</strong>
                                        <pre>{testCase.Input}</pre>
                                    </div>
                                    <div>
                                        <strong>Expected Output:</strong>
                                        <pre>{testCase.ExpectedOutput}</pre>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                    onClick={() => removeTestCase(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Programming Assessment
                </button>
            </form>
        </div>
    );
}

'use client';
import axios from 'axios';
import React, { useState } from 'react';

export default function ProblemTaskForm() {
    // State to store form inputs
    const [problemData, setProblemData] = useState({
        Title: "",
        Category: "",
        Description: "",
        TestCases: [],
    });

    const [newTestCase, setNewTestCase] = useState({ Input: '', ExpectedOutput: '' });

    // Update form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblemData({ ...problemData, [name]: value });
    };

    // Update new test case fields
    const handleTestCaseChange = (e) => {
        const { name, value } = e.target;
        setNewTestCase({ ...newTestCase, [name]: value });
    };

    // Add a new test case
    const addTestCase = () => {
        if (!newTestCase.Input || !newTestCase.ExpectedOutput) {
            alert('Please fill both Input and Expected Output fields.');
            return;
        }

        setProblemData({
            ...problemData,
            TestCases: [...problemData.TestCases, newTestCase],
        });

        setNewTestCase({ Input: '', ExpectedOutput: '' }); // Reset test case fields
    };

    // Remove a specific test case
    const removeTestCase = (index) => {
        const updatedTestCases = problemData.TestCases.filter((_, idx) => idx !== index);
        setProblemData({ ...problemData, TestCases: updatedTestCases });
    };

    // Submit the form data
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/problemSolving/CreateData`,
                problemData
            );
            alert('Problem-solving task added successfully!');
            // Reset the form
            setProblemData({
                Title: "",
                Category: "",
                Description: "",
                TestCases: [],
            });
        } catch (error) {
            console.error('Error adding problem-solving task: ', error);
            alert('Failed to add programming task.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit}>
                {/* Problem Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-bold">
                        Problem Title:
                    </label>
                    <input
                        type="text"
                        name="Title"
                        id="title"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={problemData.Title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Problem Category */}
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 font-bold">
                        Problem Category:
                    </label>
                    <select
                        name="Category"
                        id="category"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={problemData.Category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="DailyProblems">Daily Problems</option>
                        <option value="DataStructures">Data Structures</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Algorithms">Algorithms</option>
                    </select>
                </div>

                {/* Problem Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-bold">
                        Problem Description:
                    </label>
                    <textarea
                        name="Description"
                        id="description"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={problemData.Description}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Test Cases */}
                <div className="mb-4">
                    <h3 className="font-bold mb-2">Test Cases:</h3>
                    {problemData.TestCases.map((testCase, index) => (
                        <div key={index} className="mb-2 flex items-center">
                            <span className="flex-1">
                                <strong>Input:</strong> {testCase.Input} | <strong>Expected Output:</strong> {testCase.ExpectedOutput}
                            </span>
                            <button
                                type="button"
                                className="text-red-500 ml-4"
                                onClick={() => removeTestCase(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Add New Test Case */}
                    <div className="flex items-center space-x-2">
                        <textarea
                            type="text"
                            name="Input"
                            placeholder="Input"
                            className="flex-1 border rounded p-2 text-gray-900"
                            value={newTestCase.Input}
                            onChange={handleTestCaseChange}
                        ></textarea>
                        <textarea
                            type="text"
                            name="ExpectedOutput"
                            placeholder="Expected Output"
                            className="flex-1 border rounded p-2 text-gray-900"
                            value={newTestCase.ExpectedOutput}
                            onChange={handleTestCaseChange}
                        ></textarea>
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={addTestCase}
                        >
                            Add Test Case
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Submit Problem
                </button>
            </form>
        </div>
    );
}

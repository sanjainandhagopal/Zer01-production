'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function FinalAssessmentMCQ() {
    const [courses, setCourses] = useState([]); // To store fetched courses
    const [selectedCourse, setSelectedCourse] = useState(''); // Selected course ID
    const [question, setQuestion] = useState(''); // New MCQ question
    const [options, setOptions] = useState(['', '', '', '']); // Options array
    const [correctOption, setCorrectOption] = useState(''); // Correct answer (selected from options)

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

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);

        // Automatically update the correct option if it's empty or matches the edited option
        if (correctOption === options[index]) {
            setCorrectOption(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCourse || !question || !correctOption) {
            alert('Please fill in all required fields.');
            return;
        }

        const newMCQ = {
            Question: question,
            Options: options.map((option) => ({ Option: option })), // Format options
            CorrectOption: correctOption,
        };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/insertFinalMCQ`, {
                courseId: selectedCourse,
                mcq: newMCQ, // Add MCQ to the final assessment
            });

            alert('MCQ added successfully!');
            // Reset form fields
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption('');
        } catch (error) {
            console.error('Error adding MCQ:', error);
            alert('Failed to add MCQ.');
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

                {/* Question input */}
                <div className="mb-4">
                    <label htmlFor="question" className="block mb-2">
                        Question:
                    </label>
                    <input
                        id="question"
                        name="question"
                        type="text"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                {/* Options input */}
                {options.map((option, index) => (
                    <div className="mb-4" key={index}>
                        <label htmlFor={`option${index}`} className="block mb-2">
                            Option {index + 1}:
                        </label>
                        <input
                            id={`option${index}`}
                            name={`option${index}`}
                            type="text"
                            className="block w-full border rounded p-2 text-gray-900"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    </div>
                ))}

                {/* Correct answer dropdown */}
                <div className="mb-4">
                    <label htmlFor="correctOption" className="block mb-2">
                        Correct Option:
                    </label>
                    <select
                        id="correctOption"
                        name="correctOption"
                        className="block w-full border rounded p-2 text-gray-900"
                        value={correctOption}
                        onChange={(e) => setCorrectOption(e.target.value)}
                    >
                        <option value="">-- Select Correct Option --</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                Option {index + 1}: {option}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add MCQ
                </button>
            </form>
        </div>
    );
}

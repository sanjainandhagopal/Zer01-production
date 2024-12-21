'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Compiler from '@/app/Compiler/Compiler';

export default function Solver({ params }) {
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [problemId, setProblemId] = useState(null); // State to hold unwrapped params

    useEffect(() => {
        const unwrapParams = async () => {
            const unwrappedParams = await params; // Await the params Promise
            setProblemId(unwrappedParams.problemId); // Set the unwrapped problemId
        };

        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (problemId) {
            const fetchProblem = async () => {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/problemSolver/problem/${problemId}`
                    );
                    setProblem(response.data);
                    setLoading(false);
                } catch (err) {
                    console.error('Error fetching problem data:', err);
                    setError('Failed to load problem data.');
                    setLoading(false);
                }
            };

            fetchProblem();
        }
    }, [problemId]);

    if (loading) {
        return <div>Loading problem data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">{problem.Title}</h1>
            <p>
                <strong>Category:</strong> {problem.Category}
            </p>
            <p>
                <strong>Description:</strong> {problem.Description}
            </p>
            <div>
                <h3 className="font-bold">Test Cases:</h3>
                <ul className="list-disc pl-5">
                    {problem.TestCases.map((testCase, index) => (
                        <li key={index}>
                            <strong>Input:</strong> {testCase.Input} |{' '}
                            <strong>Expected Output:</strong> {testCase.ExpectedOutput}
                        </li>
                    ))}
                </ul>
            </div>
            <Compiler TestCases={problem.TestCases} />
        </div>
    );
}

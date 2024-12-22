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
        return (
            <div className="text-center text-lg font-semibold text-blue-600">Loading problem data...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-lg font-semibold text-red-600">{error}</div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">{problem.Title}</h1>
            <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Problem Overview</h2>
                    <p className="text-gray-600"><strong>Category:</strong> {problem.Category}</p>
                    <p className="text-gray-600"><strong>Description:</strong> {problem.Description}</p>
                </div>

            </div>

            {/* Compiler Component Section */}
            <div className="mt-8">
                <Compiler TestCases={problem.TestCases} />
            </div>
        </div>
    );
}

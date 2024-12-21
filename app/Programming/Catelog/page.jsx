'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Catelog() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/problemSolver/list`);
                setProblems(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching problems:", err);
                setError("Failed to load problems.");
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    if (loading) {
        return <div>Loading problems...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleSubmit = (id) => {
      router.push(`/Programming/Solver/${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Problem-Solving Catalog</h1>
            {problems.length === 0 ? (
                <div>No problems found.</div>
            ) : (
                <ul>
                    {problems.map((problem) => (
                        <li key={problem._id} className="mb-4 p-4 border rounded shadow">
                            <h2 className="text-lg font-bold">{problem.Title}</h2>
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
                                            <strong>Input:</strong> {testCase.Input} |{" "}
                                            <strong>Expected Output:</strong> {testCase.ExpectedOutput}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() =>handleSubmit(problem._id)}>Solve</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

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
        return <div className="text-center text-lg font-semibold text-blue-600">Loading problems...</div>;
    }

    if (error) {
        return <div className="text-center text-lg font-semibold text-red-600">{error}</div>;
    }

    const handleSubmit = (id) => {
      router.push(`/Programming/Solver/${id}`);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Problem-Solving Catalog</h1>
            {problems.length === 0 ? (
                <div className="text-center text-lg text-gray-500">No problems found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {problems.map((problem) => (
                        <div key={problem._id} className="flex flex-col bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{problem.Title}</h2>
                            <p className="text-gray-600 mb-3">
                                <strong>Category:</strong> {problem.Category}
                            </p>
                            <p className="text-gray-600 mb-3">
                                <strong>Description:</strong> {problem.Description}
                            </p>
                            <div className="flex-grow"></div> {/* This ensures the button is at the bottom */}
                            <button 
                                onClick={() => handleSubmit(problem._id)} 
                                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out"
                            >
                                Solve
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from "@/app/NavigationBar/page";
import { useRouter } from 'next/navigation';
import { fetchProblems } from '@/app/OperatorFunctions/problemDataProvider';
import { Slab } from 'react-loading-indicators';
import { fetchUser } from '@/app/OperatorFunctions/userVerifier';

export default function Catelog() {
    const [problems, setProblems] = useState([]);
    const [problemLoading, setProblemLoading] = useState(true);
    const [problemError, setProblemError] = useState(null);
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);

    useEffect(() => {
        fetchUser(setUser, setLoadingUser, setErrorUser);
    }, []);

    useEffect(() => {
        fetchProblems(setProblems, setProblemLoading, setProblemError);
    }, []);

    if (problemError) {
        return <div className="text-center text-lg font-semibold text-red-600">{problemError}</div>;
    }

    const handleSubmit = (id) => {
        setProblemLoading(true);
        router.push(`/Programming/Solver/${id}`);
    };

    if (problemLoading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
            <div style={{ transform: 'rotate(180deg)' }}>
                <Slab color="#0e1c8e" size="large" text="" textColor="" />
            </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-black rounded-lg shadow-lg">
            <div className=' mb-10 ' >
            <NavigationBar user={user}/>
            </div>
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Problem-Solving Catalog</h1>
            {problems.length === 0 ? (
                <div className="text-center text-lg text-white">No problems found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {problems.map((problem) => (
                        <div key={problem._id} className="flex flex-col  p-6  rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300  border-y-2 border-gray-100 backdrop-blur-xl hero-card">
                            <h2 className="text-xl font-semibold text-white mb-4">{problem.Title}</h2>
                            <p className="text-white mb-3">
                                <strong>Category:</strong> {problem.Category}
                            </p>
                            <p className="text-white mb-3">
                                <strong>Description:</strong> {problem.Description}
                            </p>
                            <div className="flex-grow"></div> {/* This ensures the button is at the bottom */}
                            <button 
                                onClick={() => handleSubmit(problem._id)} 
                                className="text-[10px] md:text-lg btn mx-auto"
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

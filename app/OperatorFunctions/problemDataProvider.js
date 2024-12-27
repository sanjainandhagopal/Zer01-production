import axios from "axios";

export const fetchProblems = async (setProblems, setProblemLoading, setProblemError) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/problemSolver/list`);
        setProblems(response.data);
        setProblemLoading(false);
    } catch (err) {
        console.error("Error fetching problems:", err);
        setProblemError("Failed to load problems.");
        setProblemLoading(false);
    }
};
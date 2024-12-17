import axios from "axios";

export const fetchCourses = async (setCourses, setLoadingCourses, setErrorCourses) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/resource/courseList`); // Update with your actual API endpoint
      setCourses(response.data.courses); // Assuming the API returns a 'courses' array
      setLoadingCourses(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setErrorCourses("Failed to load courses. Please try again later.");
      setLoadingCourses(false);
    }
};

export const fetchCourseData = async (setCourseData, setLoading, setError, courseId) => {
    try {
      // Fetch course details using the courseId
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/resource/courseData/${courseId}` // Pass courseId to the API endpoint
      );

      setCourseData(response.data); // Set the fetched course data
      setLoading(false);
    } catch (err) {
      console.error("Error fetching course data:", err);
      setError("Failed to load course data. Please try again later.");
      setLoading(false);
    }
};
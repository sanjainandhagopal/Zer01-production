import axios from "axios";

export const fetchUser = async (setUser, setLoading, setError) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/userAuth`,
        { withCredentials: true } // Send cookies with the request
      );

      setUser(response.data); // Set the user data
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.response?.data?.message || "Failed to authenticate.");
    } finally {
      setLoading(false); // End the loading state
    }
};

//Usage guide
// const [user, setUser] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
// fetchUser(setUser, setLoading, setError);
// }, []);
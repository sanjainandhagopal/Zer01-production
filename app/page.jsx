'use client';
import { useEffect, useState } from "react";
import Index from "./Index/page";
import NavigationBar from "./NavigationBar/page";
import { fetchUser } from "./OperatorFunctions/userVerifier";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  // Fetch user details on mount
  useEffect(() => {
    fetchUser(setUser, setLoadingUser, setErrorUser);
  }, []);
  return (
    <div>
      <NavigationBar user={user} />
      {/* <Login /> */}
      <Index/>
    </div>
  );
}

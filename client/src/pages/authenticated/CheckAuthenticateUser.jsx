import axios from "axios";
import { useEffect, useState } from "react";
import AdminAuthenticatedApp from "./AdminAuthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";

function checkAuthenticateUser() {
  const [user, setUser] = useState(null);
  const checkUser = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/post/check`);
      setUser(result.data.data.role);
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  if (user === "Admin") {
    return <AdminAuthenticatedApp />;
  }
  if (user === "Users") {
    return <AuthenticatedApp />;
  }
  return null;
}

export default checkAuthenticateUser;

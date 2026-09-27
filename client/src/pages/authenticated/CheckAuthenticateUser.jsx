import axios from "axios";
import { useEffect, useState } from "react";
import AdminAuthenticatedApp from "./AdminAuthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";

function CheckAuthenticateUser() {
  const [role, setRole] = useState(null);
  const checkUser = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/post/check`);
      setRole(result.data.data.role);
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  if (typeof role !== "string") {
    return null;
  }
  if (role.toLowerCase() === "admin") {
    return <AdminAuthenticatedApp />;
  }
  return <AuthenticatedApp />;
}

export default CheckAuthenticateUser;

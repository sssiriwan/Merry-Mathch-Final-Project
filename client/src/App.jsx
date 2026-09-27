import "./App.css";
import { useAuth } from "./contexts/authentication";
import UnauthenticatedApp from "./pages/unauthenticated/UnauthenticatedApp";
import CheckAuthenticateUser from "./pages/authenticated/CheckAuthenticateUser";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const auth = useAuth();
  return (
    <>
      {auth.isAuthenticated ? (
        <CheckAuthenticateUser />
      ) : (
        <UnauthenticatedApp />
      )}
      <Toaster />
    </>
  );
}

export default App;

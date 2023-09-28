import "./App.css";
import { useAuth } from "./contexts/authentication";
import UnauthenticatedApp from "./pages/unauthenticated/UnauthenticatedApp";
import CheckAuthenticateUser from "./pages/authenticated/CheckAuthenticateUser";

function App() {
  const auth = useAuth();
  return (
    <>
      {auth.isAuthenticated ? (
        <CheckAuthenticateUser />
      ) : (
        <UnauthenticatedApp />
      )}
    </>
  );
}

export default App;

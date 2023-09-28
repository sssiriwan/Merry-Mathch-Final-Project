import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplaintDetailPage from "./pages/ComplaintActionPage";
import Package from "./pages/Package";
import Payment_1 from "./pages/Payment_1";
import Payment_2 from "./pages/Payment_2";
import ComplaintFormPage from "./pages/ComplaintFormPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPageStep1 } from "./pages/RegisterPageStep1";
import ComplaintListPage from "./pages/ComplaintListPage";
import PackageAddPage from "./pages/PackageAddPage";
import Form from "./pages/register/Form";
// import LoginPageTest from "./pages/LoginPageTest";
import MatchingPage from "./pages/MatchingPage";
import PackageListPage from "./pages/PackageListPage";
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
    // <Routes>
    //   <Route path="/register" element={<Form />} />
    //   <Route path="/" element={<Home />} />
    //   <Route path="/package" element={<Package />} />
    //   <Route path="/payment_1" element={<Payment_1 />} />
    //   <Route path="/payment_2" element={<Payment_2 />} />
    //   <Route path="/admin" element={<PackageListPage />} />
    //   <Route path="/admin/package" element={<PackageAddPage />} />
    //   <Route path="/admin/complain" element={<ComplaintListPage />} />
    //   <Route path="/admin/complain/complainId" element={<ComplaintDetailPage />} />
    //   <Route path="/complaint" element={<ComplaintFormPage />} />
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/matching" element={<MatchingPage />} />
    // </Routes>
  );
}

export default App;

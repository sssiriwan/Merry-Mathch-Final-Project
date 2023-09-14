import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { LoginPage } from "../LoginPage";
import Form from "../register/Form";
import RegisterPage from "../step-form/RegisterPage";

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Form />} />
      <Route path="/testregister" element={<RegisterPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default UnauthenticatedApp;

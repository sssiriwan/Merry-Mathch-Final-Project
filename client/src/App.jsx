import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplaintDetailPage from "./pages/ComplaintDetailPage";
import Package from "./pages/Package";
import Payment_1 from "./pages/Payment_1";
import Payment_2 from "./pages/Payment_2";
import ComplaintFormPage from "./pages/ComplaintFormPage";
import { LoginPage } from "./pages/LoginPage";
import ComplaintListPage from "./pages/ComplaintListPage";
import PackageAddPage from "./pages/PackageAddPage";
import Form from "./pages/register/Form";
import LoginPageTest from "./pages/LoginPageTest";
import RegisterPageMock from "./pages/RegisterPageMock";

function App() {
  return (
      <Routes>
        <Route path="/register" element={<Form />} />
        <Route path="/" element={<Home />} />
        <Route path="/package" element={<Package />} />
        <Route path="/payment_1" element={<Payment_1 />} />
        <Route path="/payment_2" element={<Payment_2 />} />
        <Route path="/admin/complain" element={<ComplaintListPage />} />
        <Route path="/admin" element={<PackageAddPage />} />
        <Route path="/complaint" element={<ComplaintFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<RegisterPageMock />} />
      </Routes>
  );
}

export default App;

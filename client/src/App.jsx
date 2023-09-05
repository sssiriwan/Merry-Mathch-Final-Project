import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplaintDetailPage from "./pages/ComplaintDetailPage";
import Package from "./pages/Package";
import Payment_1 from "./pages/Payment_1";
import Payment_2 from "./pages/Payment_2";
import ComplaintFormPage from "./pages/ComplaintFormPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPageStep1 } from "./pages/RegisterPageStep1";
import ComplaintListPage from "./pages/ComplaintListPage";
import PackageAddPage from "./pages/PackageAddPage";
import Form from "./pages/register/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Form />} />
        <Route path="/aaaa" element={<Home />} />
        <Route path="/aaa" element={<Package />} />
        <Route path="/payment_1" element={<Payment_1 />} />
        <Route path="/payment_2" element={<Payment_2 />} />
        <Route path="/admin" element={<ComplaintDetailPage />} />
        <Route path="/complaint" element={<ComplaintFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPageStep1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

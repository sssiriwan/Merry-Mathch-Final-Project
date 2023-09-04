import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplaintDetailPage from "./pages/ComplaintDetailPage";
import Package from "./pages/Package";
import Payment from "./pages/Payment";
import ComplaintFormPage from "./pages/ComplaintFormPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPageStep1 } from "./pages/RegisterPageStep1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/aaa" element={<Home />} />
        <Route path="/aaaa" element={<Package />} />
        <Route path="/rrrrr" element={<Payment />} />
        <Route path="/admin" element={<ComplaintDetailPage />} />
        <Route path="/complaint" element={<ComplaintFormPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<RegisterPageStep1/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

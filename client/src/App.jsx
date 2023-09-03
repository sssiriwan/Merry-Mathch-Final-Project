import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplaintDetailPage from "./pages/ComplaintDetailPage";
import Package from "./pages/Package";
import Payment from "./pages/Payment";
import ComplaintFormPage from "./pages/ComplaintFormPage";
import ComplaintListPage from "./pages/ComplaintListPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/aaaa" element={<Package />} />
        <Route path="/aaa" element={<Payment />} />
        <Route path="/admin" element={<ComplaintDetailPage />} />
        <Route path="/complaint" element={<ComplaintFormPage />} />
        <Route path="/complaint-list" element={<ComplaintListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

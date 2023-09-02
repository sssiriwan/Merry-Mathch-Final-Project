import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplaintDetailPage from "./pages/ComplaintDetailPage";
import Package from "./pages/Package";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Home />} />
        <Route path="/" element={<Package />} />
        <Route path="/aaa" element={<ComplaintDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

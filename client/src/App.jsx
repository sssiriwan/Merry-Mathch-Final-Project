import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplaintDetailPage from "./pages/admin/ComplaintDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<ComplaintDetailPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

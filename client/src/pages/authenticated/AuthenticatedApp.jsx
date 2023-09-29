import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { LoginPage } from "../LoginPage";
import MatchingPage from "../MatchingPage";
import ComplaintFormPage from "../ComplaintFormPage";
import ProfileEditPage from "../ProfileEditPage";
import MerryList from "../MerryList";
import PreviewCard from "../PreviewCard";
import Package from "../Package";
import ChatPage from "../Chat";
import Payment_1 from "../Payment_1";
import Membership from "../Membership";

function AuthenticatedApp() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/complaint" element={<ComplaintFormPage />} />
          <Route path="/profile" element={<ProfileEditPage />} />
          <Route path="/profile/:userId" element={<PreviewCard />} />
          <Route path="/merry-list" element={<MerryList />} />
          <Route path="/package" element={<Package />} />
          <Route path="/chat/:matchListId" element={<ChatPage/>}/>
          <Route path="/payment" element={<Payment_1 />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="*" element={<Home />} />
        </Routes>
    </>
  );
}

export default AuthenticatedApp;

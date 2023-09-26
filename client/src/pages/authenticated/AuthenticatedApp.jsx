import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import { LoginPage } from "../LoginPage";
import MatchingPage from "../MatchingPage";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";
import AdminAuthenticatedApp from "./AdminAuthenticatedApp";
import { useEffect, useState } from "react";
import ComplaintFormPage from "../ComplaintFormPage";
import ProfileEditPage from "../ProfileEditPage";
import MerryList from "../MerryList";
import PreviewCard from "../PreviewCard";
import Package from "../Package";
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
          <Route path="/membership" element={<Membership />} />
          <Route path="*" element={<Home />} />
        </Routes>
    </>
  );
}

export default AuthenticatedApp;

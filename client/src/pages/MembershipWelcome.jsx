import React from "react";
import Navbar, { NavbarRegistered } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { useAuth } from "@/contexts/authentication";
// import MembershipDetail from "./membership/MembershipDetail";
import WelcomeMessage from "./membership/WelcomeMessage";
import PackageDetail from "./membership/PackageDetail";
import { Package } from "lucide-react";

function MembershipWelcome() {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuthenticated ? <NavbarRegistered /> : <Navbar />}

      <div className="w-screen h-[936px] mt-20 flex  justify-evenly">
        <WelcomeMessage />
        <PackageDetail />
      </div>
      <Footer />
    </div>
  );
}

export default MembershipWelcome;

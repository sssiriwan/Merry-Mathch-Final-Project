import React from "react";
import Navbar, { NavbarRegistered } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { useAuth } from "@/contexts/authentication";
import MembershipDetail from "./membership/MembershipDetail";

function Membership() {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuthenticated ? <NavbarRegistered /> : <Navbar />}

      <div className="w-screen h-[1585px] flex justify-center">
        <div className="flex flex-col  ">
          {/* หัวข้อ merry membership */}
          <div className="w-[1119px] h-[225px] flex flex-col justify-center">
            <h2 className="text-sm text-pbeige-700">Merry Membership</h2>
            <p className="mt-[8px] text-5xl font-extrabold text-ppurple-500">
              Be part of Merry Membership
            </p>
            <p className="text-5xl font-extrabold text-ppurple-500">
              to make more Merry!
            </p>
          </div>
          {/* กล่อง membership  */}
          <MembershipDetail />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Membership;

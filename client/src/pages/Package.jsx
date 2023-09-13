import React from "react";
import Navbar, { NavbarRegistered } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import CardsPackage from "@/components/base/cards/CardsPackage";
import { useAuth } from "@/contexts/authentication";

const Package = () => {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuthenticated ? <NavbarRegistered /> : <Navbar />}
      <div className="w-screen h-[903px] flex justify-center items-center">
        <div className="flex flex-col justify-between ">
          <div className="w-[1119px] h-[225px]">
            <h2 className="text-sm text-pbeige-700">Merry Membership</h2>
            <p className="mt-[8px] text-5xl font-extrabold text-ppurple-500">
              Be part of Merry Membership
            </p>
            <p className="text-5xl font-extrabold text-ppurple-500">to make more Merry!</p>
          </div>
          <div>
            <CardsPackage />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Package;

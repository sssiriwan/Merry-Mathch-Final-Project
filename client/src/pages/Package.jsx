import React from "react";
import Navbar, { NavbarRegistered } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import CardsPackage from "@/components/base/cards/CardsPackage";
import { useAuth } from "@/contexts/authentication";
import { TypographySmall } from "@/components/base/button/Typography";

const Package = () => {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuthenticated ? <NavbarRegistered /> : <Navbar />}
      <div className="flex justify-center items-center mb-10">
        <div className="flex flex-col items-center ">
          <div className="w-[1119px] my-10 text-pbeige-700">
            <TypographySmall>Merry Membership</TypographySmall>
            <p className="mt-[8px] text-5xl font-extrabold text-ppurple-500">
              Be part of Merry Membership
            </p>
            <p className="text-5xl font-extrabold text-ppurple-500">
              to make more Merry!
            </p>
          </div>
          <div className="flex justify-center items-center">
            <CardsPackage />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Package;

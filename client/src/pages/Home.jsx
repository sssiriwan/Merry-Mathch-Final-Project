import React from "react";
import Sec1 from "./home-sec/Sec-1";
import Sec2 from "./home-sec/Sec-2";
import Sec3 from "./home-sec/Sec-3";
import Sec4 from "./home-sec/Sec-4";
import Navbar, { NavbarRegistered } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { useAuth } from "@/contexts/authentication";

const Home = () => {
  const auth = useAuth();
  return (
    <div>
      {auth.isAuthenticated ? <NavbarRegistered /> : <Navbar />}
      <div className="h-[257vh] bg-putility-400 flex flex-col items-center text-center ">
        <Sec1 />
        <Sec2 />
        <Sec3 />
        <Sec4 />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

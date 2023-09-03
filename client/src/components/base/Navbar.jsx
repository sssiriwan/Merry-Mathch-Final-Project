import React from "react";
import { ButtonPrimary } from "./button/Button";

const Navbar = () => {
  return (
    <nav className=" w-screen h-[80px] flex justify-between items-center shadow-3xl">
      <div className="">
        <img src="./imgs/logo.png" className="ml-[160px]" alt="merry match" />
      </div>
      <div className="menuBar">
        <div className="mr-[160px] h-[60px] w-[550px] flex items-center">
          <a href="#sec2">
            <span className=" mx-[24px] text-xl">Why Merry Match?</span>
          </a>
          <a href="#sec4">
            <span className=" mx-[24px] text-xl">How to Merry</span>
          </a>
          <ButtonPrimary>Login</ButtonPrimary>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

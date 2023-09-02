import React from "react";

const Navbar = () => {
  return (
    <nav className=" w-screen h-[80px] flex justify-between items-center">
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
          <button className="w-[100px] h-[50px] ml-[32px] text-xl text-white rounded-full bg-red-600">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

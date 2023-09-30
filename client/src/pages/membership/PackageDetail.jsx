import React from "react";
import axios from "axios";

function PackageDetail() {
  return (
    <div className="flex-col mt-6 w-[357px] h-[450px]  p-8  rounded-[32px]  bg-gradient-to-br from-ppurple-800 to-ppurple-400 shadow-xl">
      {/* icon  */}
      <div className="flex-col">
        <img className="w-[60px] h-[60px]" src="" alt="" />

        {/* ชื่อ ราคา */}
        <div className="mt-6">
          <h1 className=" text-3xl  text-white">Premium</h1>
          <h2 className="  text-xl text-white">THB 159 /Month</h2>
        </div>
        {/* detail */}
        <div className="mt-6">
          <h3 className=" text-base  text-purple-100">‘Merry’ more than a daily limited</h3>
          <h3 className="text-base text-purple-100">Up to 50 Merry per day</h3>
        </div>
        <hr className=" mt-9" />
        <div className=" mt-6">
          <div className="flex justify-between">
            <h3 className="text-ppurple-200">Start Membership</h3>
            <h3 className="text-white">01/04/2022</h3>
          </div>
          <div className="flex justify-between">
            <h3 className=" text-ppurple-200">Next Billing</h3>
            <h3 className=" text-white">01/05/2022</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;

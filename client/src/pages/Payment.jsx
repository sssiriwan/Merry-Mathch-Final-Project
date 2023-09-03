import React from "react";
import Navbar from "@/components/base/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Payment = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen h-[936px] flex justify-center">
        <div className="w-[928px] h-[554px] flex justify-between mt-[80px]">
          <div className="w-[358px] h-[244px] bg-pgray-100 flex flex-col justify-center items-center border rounded-3xl border-pgray-400">
            <div className="w-[310px] h-[180px] flex flex-col justify-between">
              <div className="w-[310px] h-[30px] flex items-center">
                <img src="./icons/package.png" alt="package" />
                <p className="ml-[12px] text-xl text-pgray-700">
                  Merry Membership
                </p>
              </div>
              <div className="w-[310px] h-[126px]">
                <div className="w-[310px] h-[48px] flex justify-between items-center">
                  <span className="text-base text-pgray-700">Package</span>
                  <span className="text-base text-pgray-700">
                    Price (Monthly)
                  </span>
                </div>
                <div className="w-[310px] h-[78px] flex justify-between items-center border-t-2 border-pgray-300">
                  <span className="text-xl text-pgray-900">Premium</span>
                  <span className="text-xl text-pgray-900">THB 59.00</span>
                </div>
              </div>
            </div>
          </div>
          <form className="w-[548px] h-[554px] z-50 bg-pgray-100 border rounded-3xl border-pgray-400">
            <div className="w-[548px] h-[78px] flex justify-center items-center">
              <div className="w-[500px] h-[30px] flex justify-between items-center">
                <p className="text-xl text-pgray-700">Credit Card</p>
                <div className="w-[100px] h-[28px] flex justify-between items-center">
                  <img src="./icons/bank_Visa.png" alt="Visa" />
                  <img src="./icons/bank_MasterCard.png" alt="MasterCard" />
                </div>
              </div>
            </div>
            <div className="w-[548px] h-[372px] bg-white border">
              <p>asdfw</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;

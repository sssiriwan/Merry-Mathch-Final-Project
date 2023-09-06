import React from "react";

const CardsPackage = () => {
  return (
    <div>
      <div className="w-[277px] h-[358px] flex flex-col justify-between">
        <div className="w-[60px] h-[60px] flex justify-center items-center bg-pgray-100 rounded-2xl ">
          <img src="./icons/icon_vector.png" alt="icon_vector" />
        </div>
        <div className="w-[277px] h-[78px]">
          <p className="text-2xl text-ppurple-800 ">Basic</p>
          <span className="text-xl text-pgray-900">THB 59.00</span>
          <span className="text-base text-pgray-600">/Month</span>
        </div>
        <div className="w-[277px] h-[100px]  border-b border-pgray-300">
          <div className="w-screen flex">
            <img src="./icons/check.png" alt="icon_check" />
            <span className="ml-[12px] text-base text-pgray-800">
              ‘Merry’ more than a daily limited
            </span>
          </div>
          <div className="w-[277px] flex mt-[16px]">
            <img src="./icons/check.png" alt="icon_check" />
            <span className="ml-[12px] text-base text-pgray-800">
              Up to 25 Merry per day
            </span>
          </div>
        </div>
        <div>
          <button className="w-[277px] h-[48px] text-base font-extrabold text-pred-600 rounded-full bg-red-100">
            Choose Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsPackage;

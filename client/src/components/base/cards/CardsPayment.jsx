import React from "react";

const CardsPayment = () => {
  return (
    <div className="w-[357px] h-[454px] bg-bg-3 flex justify-center items-center border rounded-3xl">
      <div className="w-[277px] h-[374px] flex flex-col justify-between">
        <div className="w-[60px] h-[60px] bg-white flex justify-center items-center rounded-2xl">
          <img src="./icons/icon_premium.png" alt="premium" />
        </div>
        <div className="w-full h-[78px] flex flex-col justify-between">
          <p className="text-3xl font-bold text-white">Premium</p>
          <div>
            <span className="text-xl text-white">THB 149.00</span>
            <span className="ml-[6px] text-base text-white">/Month</span>
          </div>
        </div>
        <div className="w-full h-[100px] border-b">
          <div className="flex">
            <img src="./icons/check_2.png" alt="check" />
            <p className="ml-[12px] text-base text-ppurple-100">
              ‘Merry’ more than a daily limited
            </p>
          </div>
          <div className="bt-[16px] flex">
            <img src="./icons/check_2.png" alt="check" />
            <p className="ml-[12px] text-base text-ppurple-100">
              Up to 50 Merry per day
            </p>
          </div>
        </div>
        <div className="w-full h-[64px]">
          <div className="w-full flex justify-between">
            <div>
              <p className="text-base text-ppurple-200">Start Membership</p>
            </div>
            <div className="text-base text-white">
              <p>01/04/2022</p>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div>
              <p className="text-base text-ppurple-200">Next billing</p>
            </div>
            <div className="text-base text-white">
              <p>01/05/2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsPayment;

import React from "react";
import Navbar from "@/components/base/Navbar";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@/components/base/button/Button";
import CardsPayment from "@/components/base/cards/CardsPayment";

const Payment_2 = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[936px] flex justify-center">
        <div className="w-[1112px] h-[454px] mt-[88px] flex justify-between">
          {/* left card */}
          <div className="w-[641px] h-[393px]">
            <div>
              <img src="./icons/success_paied.png" alt="succes" />
            </div>
            <div className="w-full h-[145px] mt-[40px]">
              <p className="text-sm text-pbeige-700">AYMENT SUCCESS</p>
              <p className="text-5xl font-bold text-ppurple-500">
                Welcom Merry Membership!
              </p>
              <p className="text-5xl font-bold text-ppurple-500">
                Thank you for joining us
              </p>
            </div>
            <div className="w-[300px] h-[48px] mt-[80px] flex justify-between items-center">
              <ButtonSecondary className="w-[150px] h-[48]">
                Back to home
              </ButtonSecondary>
              <ButtonPrimary className="w-[190px] h-[48]">
                Check Membership
              </ButtonPrimary>
            </div>
          </div>

          {/* right card */}
          <CardsPayment />
        </div>
      </div>
    </div>
  );
};

export default Payment_2;

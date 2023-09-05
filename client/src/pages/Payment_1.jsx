import React from "react";
import Navbar from "@/components/base/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonPrimary } from "@/components/base/button/Button.jsx";

const Payment_1 = () => {
  return (
    <div>
      <Navbar />

      <div className="w-screen h-[936px] flex justify-center">
        <div className="w-[928px] h-[554px] flex justify-between mt-[80px]">
          {/* left card */}
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

          {/* form of register credit card */}
          <form className="w-[548px] h-[554px]">
            <div>
              {/* head */}
              <div className="w-full h-[78px] flex justify-center items-center bg-pgray-100 border-t border-x border-pgray-400 rounded-t-3xl ">
                <div className="w-[500px] h-[30px] flex justify-between items-center">
                  <div className=" text-pgray-700 text-xl font-bold">
                    <h2>Credit Card</h2>
                  </div>
                  <div className="w-[100px] h-[28px] flex justify-between items-center">
                    <img src="./icons/bank_Visa.png" alt="Visa" />
                    <img src="./icons/bank_MasterCard.png" alt="MasterCar" />
                  </div>
                </div>
              </div>

              {/* body */}
              <div className="w-[548px] h-[372px] flex justify-center items-center border-x border-pgray-400">
                <div className="w-[500px] h-[324px] flex flex-col justify-between items-center">
                  {/* card number */}
                  <div className="w-[500px] h-[76px]">
                    <div className="h-[24px] flex">
                      <Label htmlFor="CardNumber" class="text-base">
                        Card number <span class="text-putility-300">*</span>
                      </Label>
                    </div>
                    <Input
                      class="w-full h-[48px] border rounded-xl pl-[10px]"
                      type="CardNumber"
                      id="CardNumber"
                      placeholder="Number of number"
                    />
                  </div>

                  {/* card owner */}
                  <div className="w-[500px] h-[76px]">
                    <div className="h-[24px] flex">
                      <Label htmlFor="name" class="text-base">
                        Card owner <span class="text-putility-300">*</span>
                      </Label>
                    </div>
                    <Input
                      class="w-full h-[48px] border rounded-xl pl-[10px]"
                      type="name"
                      id="name"
                      placeholder="Holder of card"
                    />
                  </div>

                  {/* expire && CCV */}
                  <div className="w-[500px] h-[76px] flex justify-between">
                    <div className="w-[239px]">
                      <div className="h-[24px] flex">
                        <Label htmlFor="CardNumber" class="text-base">
                          Expiry date <span class="text-putility-300">*</span>
                        </Label>
                      </div>
                      <Input
                        class="w-[239px] h-[48px] border rounded-xl pl-[10px]"
                        type="CardNumber"
                        id="CardNumber"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="w-[239px]">
                      <div className="h-[24px] flex">
                        <Label htmlFor="CardNumber" class="text-base">
                          CVC/CVV <span class="text-putility-300">*</span>
                        </Label>
                      </div>
                      <Input
                        class="w-[239px] h-[48px] border rounded-xl pl-[10px]"
                        type="CardNumber"
                        id="CardNumber"
                        placeholder="x x x"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* foot */}
              <div className="w-[548px] h-[104px] flex justify-center items-center border-x border-y border-pgray-400 rounded-b-3xl">
                <div className="w-[500px] h-[56px] flex justify-between items-center">
                  <div className="text-base text-pred-500 font-bold">
                    Cancel
                  </div>
                  <ButtonPrimary> Payment1 Confirm</ButtonPrimary>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment_1;

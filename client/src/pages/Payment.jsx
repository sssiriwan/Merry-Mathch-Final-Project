import React from "react";
import Navbar from "@/components/base/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Payment = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen h-[936px] flex justify-center">
        <div className="w-[928px] h-[554px] mt-[80px] ml- border">
          <div className="w-[358px] h-[244px] border"></div>
          <div>
            <Label htmlFor="email">Card number</Label>
            <Input
              type="Card Number"
              id="Card Number"
              placeholder="Number of card"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

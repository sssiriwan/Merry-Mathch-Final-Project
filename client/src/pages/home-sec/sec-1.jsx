import { ButtonHome } from "@/components/base/button/Button";
import React from "react";

const Sec1 = () => {
  return (
    <section className="w-[1366px] h-[768px] bg-bg-1 flex justify-center items-center">
      <div className="h-[380px] w-[450px] flex flex-col justify-between items-center">
        <span className="text-6xl text-white font-black text-center">
          Make the
        </span>
        <span className="text-6xl text-white font-black text-center">
          first ‘Merry’
        </span>
        <div className="text-white text-center">
          <p>If you feel lonely, let’s start meeting</p>
          <p>new people in your area!</p>
          <p>Dont’t forget to get Merry with us</p>
        </div>
        <div className="text-center">
          <ButtonHome>Start matching!</ButtonHome>
        </div>
      </div>
    </section>
  );
};

export default Sec1;

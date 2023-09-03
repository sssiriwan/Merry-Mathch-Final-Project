import { ButtonSecondary } from "@/components/base/button/Button";
import React from "react";

const Sec4 = () => {
  return (
    <section
      id="sec4"
      className="w-[1440px] h-[570px] flex justify-center items-center"
    >
      <div className="w-[1120px] h-[370px] flex flex-col justify-center items-center bg-bg-2 rounded-4xl">
        <p className="text-5xl text-white">Let’s start finding</p>
        <p className="text-5xl text-white">and matching someone new</p>
        <ButtonSecondary>
          Start Matching!
        </ButtonSecondary>
      </div>
    </section>
  );
};

export default Sec4;

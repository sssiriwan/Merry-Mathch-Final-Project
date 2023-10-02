import { ButtonSecondary } from "@/components/base/button/Button";
import React from "react";
import { motion } from "../../../node_modules/framer-motion";
import { fedeIn } from "../variants";

const Sec4 = () => {
  return (
    <motion.section
      id="sec4"
      variants={fedeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ one: false, amount: 0.6 }}
      className="w-[1440px] h-[570px] flex justify-center items-center"
    >
      <div className="w-[1120px] h-[370px] flex flex-col justify-center items-center bg-bg-2 rounded-4xl">
        <p className="text-5xl text-white font-bold">Let’s start finding</p>
        <p className="text-5xl text-white font-bold">
          and matching someone new
        </p>
        <div className="mt-[40px]">
          <ButtonSecondary>
            <a href="/matching">Start Matching!</a>
          </ButtonSecondary>
        </div>
      </div>
    </motion.section>
  );
};

export default Sec4;

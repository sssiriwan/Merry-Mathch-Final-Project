import { ButtonPrimary } from "@/components/base/button/Button";
import React from "react";
import { motion } from "../../../node_modules/framer-motion";
import { fedeIn } from "../variants";

const Sec1 = () => {
  return (
    <section className="w-[1366px] h-[768px] bg-bg-1 flex justify-center items-center">
      <div className="h-[380px] w-[450px] flex flex-col justify-between items-center">
        <span className="text-6xl text-white font-black text-center">
          <motion.h1
            variants={fedeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ one: false, amount: 0.6 }}
            className="h1"
          >
            Make the
          </motion.h1>
        </span>
        <span className="text-6xl text-white font-black text-center">
          <motion.h1
            variants={fedeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ one: false, amount: 0.6 }}
            className="h1"
          >
            first ‘Merry’
          </motion.h1>
        </span>
        <div className="text-white text-center">
          <motion.p
            variants={fedeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ one: false, amount: 0.6 }}
            className="h1"
          >
            <p>If you feel lonely, let’s start meeting</p>
            <p>new people in your area!</p>
            <p>Dont’t forget to get Merry with us</p>
          </motion.p>
        </div>
        <div className="text-center">
          <motion.button
            variants={fedeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ one: false, amount: 0.6 }}
            className="h1"
          >
            <ButtonPrimary>
              <a href="/matching">Start matching!</a>
            </ButtonPrimary>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Sec1;

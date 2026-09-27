import { ButtonSecondary } from "@/components/base/button/Button";
import { motion } from "../../../node_modules/framer-motion";
import { fedeIn } from "../variants";

const Sec4 = () => {
  return (
    <motion.section
      id="sec4"
      variants={fedeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full py-[6rem] flex justify-center items-center"
    >
      <div className="w-[calc(100%-48px)] max-w-[1120px] h-[250px] md:h-[370px] px-6 flex flex-col justify-center items-center bg-bg-2 rounded-4xl">
        <p className="text-2xl md:text-5xl text-white font-bold">Let’s start finding</p>
        <p className="text-2xl md:text-5xl text-white font-bold">
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

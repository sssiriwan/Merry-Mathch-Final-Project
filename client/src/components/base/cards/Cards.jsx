import { datas } from "./cardsMockData/data";
import { motion } from "../../../../node_modules/framer-motion";
import { fedeIn } from "@/pages/variants";

const Cards = () => {
  return (
    <motion.div
      variants={fedeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
    >
      {datas.map((data) => (
        <div
          key={data.id}
          className="w-full max-w-[420px] mx-auto md:max-w-none h-auto md:h-[368px] flex flex-row md:flex-col justify-center items-center gap-4 md:gap-5 px-5 md:px-2 py-5 md:py-0 bg-ppurple-900 rounded-3xl lg:rounded-4xl"
        >
          <div className="w-1/3 md:w-auto flex items-center justify-center">
          <div className="w-[72px] md:w-[96px] lg:w-[120px] aspect-square shrink-0 flex justify-center items-center bg-ppurple-800 rounded-full">
            <img src={data.image} alt="" className="w-[44px] md:w-[50px]" />
          </div>
          </div>
          <div className="w-2/3 md:w-full flex flex-col items-start md:items-center text-left md:text-center">
            <p className="text-white text-lg md:text-base lg:text-lg xl:text-xl font-extrabold text-left md:text-center">
              {data.text1}
            </p>
            <p className="text-white text-lg md:text-base lg:text-lg xl:text-xl font-extrabold text-left md:text-center">
              {data.text2}
            </p>
            <p className="text-white text-sm md:text-base font-extralight text-left md:text-center mt-[12px]">
              Lorem ipsum is a
            </p>
            <p className="text-white text-sm md:text-base font-extralight text-left md:text-center">
              placeholder text
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Cards;

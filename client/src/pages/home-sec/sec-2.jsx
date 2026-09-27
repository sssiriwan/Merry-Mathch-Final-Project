import { motion } from "../../../node_modules/framer-motion";
import { fedeIn } from "../variants";

const Sec2 = () => {
  return (
    <section id="sec2" className="w-full py-[8rem]">
      <div className="w-full max-w-[1280px] px-6 mx-auto flex flex-col lg:flex-row lg:items-center gap-12">
        <motion.div
          variants={fedeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-[570px] lg:shrink-0"
        >
          <h2 className="text-ppurple-300 text-left text-5xl font-bold">
            Why Merry Match?
          </h2>
          <p className="text-white text-left text-xl font-bold mt-10">
            Merry Match is a new generation of online dating website for everyone
          </p>
          <p className="text-white text-left text-lg mt-5">
            Whether you’re committed to dating, meeting new people, expanding your
            social network, meeting locals while traveling, or even just making a
            small chat with strangers.
          </p>
          <p className="text-white text-left text-lg mt-5">
            This site allows you to make your own dating profile, discover new
            people, save favorite profiles, and let them know that you’re
            interested
          </p>
        </motion.div>
        <div className="w-full max-w-[450px] mx-auto lg:w-[559px] lg:shrink-0">
          <img
            src="/imgs/vector.png"
            className="w-full h-auto"
            alt="Merry Match illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Sec2;

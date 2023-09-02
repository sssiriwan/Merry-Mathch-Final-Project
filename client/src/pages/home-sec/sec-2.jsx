import React from "react";

const Sec2 = () => {
  return (
    <section id="sec2" className="my-[8rem]">
      <div className="w-[80rem] flex justify-around">
        <div className="w-[570px] h-[40px]">
          <h2 className="text-ppurple-300 text-left text-5xl font-bold">
            Why Merry Match?
          </h2>
          <p className="text-white text-left text-xl font-bold mt-10">
            Merry Match is a new generation of online dating website for
            everyone
          </p>
          <p className="text-white text-left text-lg mt-5">
            Whether you’re committed to dating, meeting new people, expanding
            your social network, meeting locals while traveling, or even just
            making a small chat with strangers.
          </p>
          <p className="text-white text-left text-lg mt-5">
            This site allows you to make your own dating profile, discover new
            people, save favorite profiles, and let them know that you’re
            interested
          </p>
        </div>
        <div>
          <img src="./imgs/vector.png" className="w-[600px]" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Sec2;
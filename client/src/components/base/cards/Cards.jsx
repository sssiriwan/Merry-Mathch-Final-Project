import React from "react";
import { datas } from "./cardsMockData/data";

const Cards = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {datas.map((data) => (
        <div
          key={data.id}
          className="w-[262px] h-[368px] flex flex-col items-center bg-ppurple-900 rounded-4xl m-4"
        >
          <div className="w-[120px] h-[120px] flex justify-center items-center bg-ppurple-800 rounded-full mt-[32px]">
            <img src={data.image} alt="emoji" />
          </div>
          <div className="flex flex-col justify-between mt-[40px]">
            <p className="text-white text-2xl font-extrabold text-center">
              {data.text1}
            </p>
            <p className="text-white text-2xl font-extrabold text-center">
              {data.text2}
            </p>
            <p className="text-white font-extralight text-center mt-[12px]">
              Lorem ipsum is a
            </p>
            <p className="text-white font-extralight text-center">
              placeholder text
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;

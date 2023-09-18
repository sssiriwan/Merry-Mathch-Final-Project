import React from "react";
import Hook from "@/components/base/Hook";
import { useState, useNavigate, useEffect } from "react";
import TinderCard from "react-tinder-card";

const MatchFunction = () => {
  const data = Hook();
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (fullname) => {
    console.log(fullname + " left the screen!");
  };

  const swipeLeft = async () => {};

  const swipeRight = async () => {};

  const db = [
    {
      fullname: "Richard",
      avtar_url:
        "https://cdn.pic.in.th/file/picinth/cute-dog-shiba-inu-ryuji-japan-44.md.jpeg",
      age: "20",
    },
    {
      fullname: "Erlich",
      avtar_url: "https://cdn.pic.in.th/file/picinth/104.-Cute-cat.md.jpeg",
      age: "20",
    },
    {
      fullname: "Monica",
      avtar_url: "https://cdn.pic.in.th/file/picinth/7.-Ant-appears.md.jpeg",
      age: "20",
    },
    {
      fullname: "Jared",
      avtar_url:
        "https://cdn.pic.in.th/file/picinth/Muichiro_looking_at_the_sky.jpeg",
      age: "20",
    },
    {
      fullname: "Dinesh",
      avtar_url: "https://cdn.pic.in.th/file/picinth/56.-nature-girl.jpeg",
      age: "20",
    },
  ];
  return (
    <section className="w-[905px] h-[936px] p-[9rem]">
      {db.map((user) => (
        <TinderCard
          className="swipe"
          key={user.fullname}
          onSwipe={(dir) => swiped(dir, user.fullname)}
          onCardLeftScreen={() => outOfFrame(user.fullname)}
        >
          <div
            style={{ backgroundImage: `url(${user.avtar_url})` }}
            className="h-[620px] w-[620px] bg-cover absolute flex flex-col justify-between rounded-3xl"
          >
            {/* Card content */}
            <div></div>
            <div className="h-[152px] flex justify-center items-center static">
              <div className="w-[540px] h-[40px] flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-white text-3xl font-bold">
                    {user.fullname}
                  </span>
                  <span className="ml-[8px] text-white text-3xl font-bold">
                    {user.age}
                  </span>
                  {/* profile button */}
                  <img
                    src="./icons/action_button.png"
                    className="cursor-pointer"
                    alt="see a profile"
                  />
                </div>
                {/* slide imgs bt */}
                <div className="w-[80px] flex">
                  <img
                    src="./icons/arrow_left.png"
                    className="cursor-pointer"
                    alt="slide a picture to the left"
                  />
                  <img
                    src="./icons/arrow_right.png"
                    className="cursor-pointer"
                    alt="slide a picture to the right"
                  />
                </div>
              </div>
            </div>
            {/* Like and Dislike buttons */}
            <div className="w-[184px] h-[80px] flex absolute left-56 bottom-[-35px]">
              <button
                onClick={() => swiped("left")}
                className="w-[80px] h-full flex justify-center items-center bg-white rounded-2xl"
              >
                <img src="./icons/x.png" alt="dislike" />
              </button>
              <button className="ml-[24px] w-[80px] h-full flex justify-center items-center bg-white rounded-2xl">
                <img src="./icons/like.png" alt="like" />
              </button>
            </div>
          </div>
        </TinderCard>
      ))}
      <div className="h-[750px] flex justify-center items-end">
        <div></div>
        <div className="mb-[28px]">
          <span className="text-pgray-700 text-base">Match limit today</span>
          <span className="text-pred-400 text-base">2/20</span>
        </div>
      </div>
    </section>
  );
};

export default MatchFunction;

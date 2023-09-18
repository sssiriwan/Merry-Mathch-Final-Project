import React from "react";
import axios from "axios";
import { useState, useNavigate, useEffect } from "react";
import TinderCard from "react-tinder-card";
import PreviewCard from "../PreviewCard";

const MatchFunction = () => {
  const [data, setData] = useState();
  const [lastDirection, setLastDirection] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [limits, setLimits] = useState(2);

  const getData = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/auth");
      const users = response.data.data.data;
      setData(users);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    handleLimitsCount();
  };

  const outOfFrame = (fullname) => {
    console.log(fullname + " left the screen!");
  };

  const swipeLeft = async () => {};

  const swipeRight = async () => {};

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleLimitsCount = () => {
    if (limits > 0) {
      setLimits(limits - 1);
    } else {
      alert("You've reached your daily match limit.");
    }
  };

  const db = [
    {
      fullname: "Richard",
      avatar_url:
        "https://cdn.pic.in.th/file/picinth/cute-dog-shiba-inu-ryuji-japan-44.md.jpeg",
      age: "20",
    },
    {
      fullname: "Erlich",
      avatar_url: "https://cdn.pic.in.th/file/picinth/104.-Cute-cat.md.jpeg",
      age: "20",
    },
    {
      fullname: "Monica",
      avatar_url: "https://cdn.pic.in.th/file/picinth/7.-Ant-appears.md.jpeg",
      age: "20",
    },
    {
      fullname: "Jared",
      avatar_url:
        "https://cdn.pic.in.th/file/picinth/Muichiro_looking_at_the_sky.jpeg",
      age: "20",
    },
    {
      fullname: "Dinesh",
      avatar_url: "https://cdn.pic.in.th/file/picinth/56.-nature-girl.jpeg",
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
            style={{ backgroundImage: `url(${user.avatar_url})` }}
            className="h-[620px] w-[620px] bg-cover absolute flex flex-col justify-between rounded-3xl"
          >
            {showProfile && <PreviewCard setShowProfile={setShowProfile} />}
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
                    onClick={handleProfileClick}
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
          <span className="text-pred-400 text-base ml-3">{limits}</span>
        </div>
      </div>
    </section>
  );
};

export default MatchFunction;

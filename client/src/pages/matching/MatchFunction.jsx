import React from "react";
import Hook from "@/components/base/Hook";
import TinderCard from "react-tinder-card";

const MatchFunction = () => {
  const data = Hook();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <>
      {data.map((dataItem) => (
        <TinderCard
          className="swipe"
          key={dataItem.fullname}
          //   onSwipe={(dir) => swiped(dir, dataItem.fullname)}
          //   onCardLeftScreen={() => outOfFrame(dataItem.fullname)}
        >
          <div
            style={{ backgroundImage: `url(${dataItem.avatar_url})` }}
            className="h-[620px] w-[620px] border border-indigo-500 rounded-3xl"
          >
            <h3>{dataItem.fullname}</h3>
          </div>
        </TinderCard>
      ))}
    </>
  );
};

export default MatchFunction;

import React from "react";
import { TypographyH3 } from "@/components/base/button/Typography";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatCard from "./ChatCard";
import ChatCardChosen from "./ChatCardChosen";

const ChatList = () => {
  const [userId, setUserId] = useState(null);
  const [matchList, setMatchList] = useState();
  //console.log(matchList);

  const [isLoading, setIsLoading] = useState(false);

  const getUserProfile = async () => {
    setIsLoading(true);
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/post/profile`,
    );
    //console.log(result.data.data.profile_id);
    setUserId(result.data.data.user_id);
    setIsLoading(false);
  };

  const getMatchList = async () => {
    if (userId) {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("match_list")
        .select("*")
        .or(`chooser.eq.${userId},chosen_one.eq.${userId}`)
        .eq("status", "match");
      //console.log("match จะมาไหม", data);

      setMatchList(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMatchList();
    getUserProfile();
  }, [userId]);

  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col">
      <div className="shrink-0">
        <TypographyH3>Chat with Merry Match</TypographyH3>
      </div>
      {!isLoading && (
        <div className="flex min-h-[72px] w-full flex-1 flex-col items-center overflow-y-auto [&>*]:shrink-0">
          {matchList?.map((item, index) => {
            //mapคนที่เขาปัดเราเขาเป็็น chooser
            if (item.chooser !== userId) {
              //console.log("เขาปัดเรา");
              return <ChatCard matchList={item} key={index} />;
            }
            //mapคนที่เราปัดเขาเขาเป็น chosen ส่ง userid เขาเพื่อไป get profile เอารูปกับชื่อ ส่งเลขห้องเพื่อไปดึงแชทล่าสุดของห้องนี้
            if (item.chooser == userId) {
              //console.log("เราปัดเขา");
              return <ChatCardChosen matchList={item} key={index} />;
            }
          })}
        </div>
      )}

      {isLoading && (
        <div className="flex min-h-[80px] flex-1 items-center justify-center">
          <div className="custom-loader"></div>
        </div>
      )}
    </div>
  );
};

export default ChatList;

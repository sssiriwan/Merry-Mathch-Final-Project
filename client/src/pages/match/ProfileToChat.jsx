import React from "react";
import { TypographyH3 } from "@/components/base/button/Typography";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileChooser from "./ProfileChooser";
import ProfileChosen from "./ProfileChosen";

const ProfileToChat = () => {
  const [userId, setUserId] = useState(null);
  const [matchList, setMatchList] = useState();
  //console.log(matchList);

  const [isLoading, setIsLoading] = useState(false);

  const getUserProfile = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:4000/post/profile");
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
    getUserProfile();
  }, []);

  useEffect(() => {
    getMatchList();
  }, [userId]);

  return (
    <>
      <TypographyH3>Merry Match!</TypographyH3>
      {!isLoading && (
        <div className="overflow-x-scroll whitespace-nowrap items-center snap-always snap-x snap-mandatory scroll-pl-6 ">
          {matchList?.map((item, index) => {
            //mapคนที่เขาปัดเราเขาเป็็น chooser
            if (item.chooser !== userId) {
              console.log("เขาปัดเรา");
              return (
               // <div className="snap-always snap-start py-2">
                  <ProfileChooser matchList={item} key={index} />
                //</div>
              );
            }
            //mapคนที่เราปัดเขาเขาเป็น chosen ส่ง userid เขาเพื่อไป get profile เอารูปกับชื่อ ส่งเลขห้องเพื่อไปดึงแชทล่าสุดของห้องนี้
            if (item.chooser == userId) {
              console.log("เราปัดเขา");
              return (
               // <div className="snap-always snap-start py-2">
                  <ProfileChosen matchList={item} key={index} />
               // </div>
              );
            }
          })}
        </div>
      )}

      {isLoading && (
        <>
          <div class="h-[500px] flex items-center">
            <div class="custom-loader"></div>
          </div>
        </>
      )}
    </>
  );
};
export default ProfileToChat;

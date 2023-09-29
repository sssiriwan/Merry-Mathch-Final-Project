import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { TypographySmall } from "@/components/base/button/Typography";
import { useNavigate } from "react-router-dom";

const ChatCard = (props) => {
  const matchList = props.matchList;
  const userId = matchList.chooser;
  //console.log("มาถึงไหม", userId);
  const roomId = matchList.matchlist_id;

  const navigate = useNavigate();

  const [image, setImage] = useState();
  const [fullname, setFullname] = useState();
  const [conversation, setConversation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async (item) => {
    //console.log(item);
    setIsLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "*, users(email, username, user_id),hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1, img_2, img_3,img_4,img_5)"
      )
      .eq("user_id", item);

    //console.log("ไอดีถูกไหม", data[0].user_id);
    setIsLoading(false);
    setFullname(data[0].fullname);
    setImage(data[0].profile_image.img_1);
  };

  const getLastMessage = async () => {
    //console.log("TEST");
    const { data, error } = await supabase
      .from("chat_message")
      .select("*")
      .order("timestampt", { ascending: false })
      .limit(1)
      .eq("matchlist_id", roomId);
    setConversation(data[0].message_content);
  };

  //console.log("แชทมาไหม", conversation);

  useEffect(() => {
    //console.log("ทำงานไหม");
    getProfile(userId);
    getLastMessage();
  }, [userId, roomId]);

  return (
    <>
      {!isLoading && (
        <button
          className=" w-full  hover:ring-[2px] hover:ring-ppurple-500 hover:ring-inset hover:bg-pgray-200 hover:rounded-2xl"
          onClick={() => {
            navigate(`/chat/${roomId}`);
          }}
        >
          <div className="flex mt-2 p-3 items-start w-full">
            <img className=" w-16 h-16 rounded-full object-cover" src={image} />
            <div className="flex flex-col justify-start   ml-3 text-pgray-700">
              <p className="text-black mb-2 mt-3 ">{fullname}</p>
              <TypographySmall>{conversation}</TypographySmall>
            </div>
          </div>
        </button>
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

export default ChatCard;

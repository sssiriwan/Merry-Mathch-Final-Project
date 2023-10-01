import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/contexts/authentication";
import { NavbarRegistered } from "@/components/base/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "./match/SideBar";

const ChatPage = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { state } = useAuth();
  const [messageUser, setMessageUser1] = useState("");
  const [roomId, setRoomId] = useState();
  console.log(roomId);
  const [conversation, setConversation] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  console.log(userId);
  const [authen, setAuthen] = useState(false);
  const [fullname, setFullname] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();

  const getAllMessage = async (roomId) => {
    console.log(roomId);
    setIsLoading(true);
    const { data, error } = await supabase
      .from("chat_message")
      .select("*, profiles(profile_image(img_1))")
      .eq("matchlist_id", roomId);

    setIsLoading(false);
    setConversation(data);
  };

  const getRoomChat = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("match_list")
      .select("*")
      .eq("matchlist_id", param.matchListId);
      setIsLoading(false); //มาเข้า state
    if (data.length > 0) {
      const roomId = data[0].matchlist_id;
      setRoomId(roomId);
      getAllMessage(roomId);
    }
  };

  const authenUser = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("match_list")
      .select("*")
      .or(`chooser.eq.${userId},chosen_one.eq.${userId}`)
      .eq("matchlist_id", roomId);
    console.log(data);
    setIsLoading(false);
    if (data.length > 0) {
      setAuthen(true);
    } else {
      setAuthen(false);
      navigate(`/merry-list`);
    }
  };

  const getUserProfile = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:4000/post/profile");
    console.log(result.data.data.profile_id);
    setIsLoading(false);
    setUser(result.data.data.profile_id);
    setUserId(result.data.data.user_id);
    setFullname(data[0].fullname);
  };

  const sendMessageUser1 = async () => {
    const { data, error } = await supabase.from("chat_message").insert({
      profile_id: user, // เป็นคอลัม profile_id
      message_content: messageUser,
      matchlist_id: roomId,
      timestampt: new Date(),
    });
    setMessageUser1("");
  };

  const getLastMessage = async () => {
    console.log("TEST");
    setIsLoading(true);
    const { data, error } = await supabase
      .from("chat_message")
      .select("*, profiles(profile_image(img_1))")
      .order("timestampt", { ascending: false })
      .limit(1);
    setConversation((prev) => [...prev, data[0]]);
    setIsLoading(false);
  };

  const convertTime = (timestamp) => {
    const date = new Date(timestamp);
    // Format the Date object as a time string
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      //second: "2-digit",
    });
    return timeString;
  };

  // lisnter message event
  useEffect(() => {
    const channelA = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_message",
          filter: `matchlist_id=eq.${roomId}`,
        },
        async (payload) => {
          await getLastMessage();
        }
      )
      .subscribe();

    return () => {
      channelA.unsubscribe();
    };
  }, [roomId]);

  useEffect(() => {
    getRoomChat();
    getUserProfile();
  }, [param.matchListId]);

  useEffect(() => {
    authenUser();
  }, [roomId, userId]);

  const styleLayoutChat = (messageId) => {
    if (messageId !== user) {
      const style =
        "w-full  flex flex-row items-center justify-start space-x-2 space-y-4";
      return style;
    } else {
      const style =
        "w-full pr-4  flex flex-row items-center justify-end space-x-2 space-y-4 ";
      return style;
    }
  };

  const styleChat = (messageId) => {
    if (messageId !== user) {
      const style =
        " text-black bg-ppurple-200 w-max p-[10px] mb-[10px] rounded-tr-full rounded-br-full rounded-tl-full";
      return style;
    } else {
      const style =
        " mr-2 text-white bg-ppurple-600 w-max p-[10px] mb-[10px] rounded-tl-full rounded-bl-full rounded-tr-full";
      return style;
    }
  };

  if (!authen) return null;

  return (
    <div>
      <NavbarRegistered />
      <section className="flex justify-center">
        {/* แถบด้านซ้ายหลังจากทำแชทเสร็จจะกลับมาทำ */}
        <SideBar />

        {/* ห้องแชท */}
        <div className="bg-putility-400 w-[75%] text-white ">
          <div className="p-10 ">
            <div className="mt-10 h-[750px] overflow-auto ">
              {conversation?.map((item, index) => {
                //mapคนที่เขาปัดเราเขาเป็็น chooser
                console.log(item);
                if (item.profile_id !== user) {
                  return (
                    <div
                      key={item.message_id}
                      className={styleLayoutChat(item.profile_id)}
                    >
                      <img
                        className=" w-[50px] h-[50px] rounded-full object-cover  "
                        src={item.profiles.profile_image.img_1}
                      />
                      <div className={styleChat(item.profile_id)}>
                        {item.message_content}
                      </div>
                      <div className=" text-[10px]">
                        {convertTime(item.timestampt)}{" "}
                      </div>
                    </div>
                  );
                }
                if (item.profile_id == user) {
                  return (
                    <div
                      key={item.message_id}
                      className={styleLayoutChat(item.profile_id)}
                    >
                      <div className=" text-[10px]">
                        {convertTime(item.timestampt)}{" "}
                      </div>
                      <div className={styleChat(item.profile_id)}>
                        {item.message_content}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div>
              <hr className="border border-pgray-900 " />
              <div className=" pt-2">
                <button className=" w-max  border-none outline-none bg-pgray-100  cursor-pointer rounded-full p-3  ">
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.25 2C0.25 1.50272 0.447544 1.02581 0.799175 0.674175C1.15081 0.322544 1.62772 0.125 2.125 0.125H15.875C16.3723 0.125 16.8492 0.322544 17.2008 0.674175C17.5525 1.02581 17.75 1.50272 17.75 2V12C17.75 12.4973 17.5525 12.9742 17.2008 13.3258C16.8492 13.6775 16.3723 13.875 15.875 13.875H2.125C1.62772 13.875 1.15081 13.6775 0.799175 13.3258C0.447544 12.9742 0.25 12.4973 0.25 12V2ZM1.5 10.3833V12C1.5 12.345 1.78 12.625 2.125 12.625H15.875C16.0408 12.625 16.1997 12.5592 16.3169 12.4419C16.4342 12.3247 16.5 12.1658 16.5 12V10.3833L14.2583 8.1425C14.024 7.90842 13.7063 7.77693 13.375 7.77693C13.0437 7.77693 12.726 7.90842 12.4917 8.1425L11.7583 8.875L12.5667 9.68333C12.6281 9.74055 12.6773 9.80955 12.7115 9.88622C12.7456 9.96288 12.764 10.0456 12.7655 10.1296C12.767 10.2135 12.7515 10.2968 12.7201 10.3747C12.6887 10.4525 12.6419 10.5232 12.5825 10.5825C12.5232 10.6419 12.4525 10.6887 12.3747 10.7201C12.2968 10.7515 12.2135 10.767 12.1296 10.7655C12.0456 10.764 11.9629 10.7456 11.8862 10.7115C11.8096 10.6773 11.7406 10.6281 11.6833 10.5667L7.38333 6.2675C7.14896 6.03342 6.83125 5.90193 6.5 5.90193C6.16875 5.90193 5.85104 6.03342 5.61667 6.2675L1.5 10.3842V10.3833ZM9.9375 3.875C9.9375 3.62636 10.0363 3.3879 10.2121 3.21209C10.3879 3.03627 10.6264 2.9375 10.875 2.9375C11.1236 2.9375 11.3621 3.03627 11.5379 3.21209C11.7137 3.3879 11.8125 3.62636 11.8125 3.875C11.8125 4.12364 11.7137 4.3621 11.5379 4.53791C11.3621 4.71373 11.1236 4.8125 10.875 4.8125C10.6264 4.8125 10.3879 4.71373 10.2121 4.53791C10.0363 4.3621 9.9375 4.12364 9.9375 3.875Z"
                      fill="#9AA1B9"
                    />
                  </svg>
                </button>
                <input
                  className=" w-[80%] flex-1 border-none outline-none bg-transparent p-[10px] font-medium  mr-2"
                  placeholder= "   Messege here..."
                  onChange={(e) => setMessageUser1(e.target.value)}
                  value={messageUser}
                />
                <button
                  onClick={() => sendMessageUser1()}
                  className=" float-right w-max  border-none outline-none bg-pred-500  cursor-pointer rounded-full p-3  "
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.47842 0.405044C1.34857 0.367385 1.21094 0.365531 1.08011 0.39968C0.949287 0.433828 0.830125 0.502708 0.735237 0.59903C0.640349 0.695352 0.573265 0.815535 0.541084 0.946859C0.508903 1.07818 0.512821 1.21576 0.552425 1.34504L2.98443 9.25004H11.5004C11.6993 9.25004 11.8901 9.32906 12.0308 9.46972C12.1714 9.61037 12.2504 9.80113 12.2504 10C12.2504 10.199 12.1714 10.3897 12.0308 10.5304C11.8901 10.671 11.6993 10.75 11.5004 10.75H2.98443L0.552425 18.655C0.512821 18.7843 0.508903 18.9219 0.541084 19.0532C0.573265 19.1846 0.640349 19.3047 0.735237 19.4011C0.830125 19.4974 0.949287 19.5663 1.08011 19.6004C1.21094 19.6346 1.34857 19.6327 1.47842 19.595C8.09339 17.6714 14.3314 14.6324 19.9234 10.609C20.0201 10.5396 20.0988 10.4481 20.1531 10.3422C20.2074 10.2363 20.2357 10.119 20.2357 10C20.2357 9.88104 20.2074 9.76375 20.1531 9.65785C20.0988 9.55196 20.0201 9.4605 19.9234 9.39104C14.3314 5.36769 8.09341 2.32869 1.47842 0.405044Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ChatPage;

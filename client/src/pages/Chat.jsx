import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/contexts/authentication";
import { NavbarRegistered } from "@/components/base/Navbar";
import {
  TypographyH3,
  TypographySmall,
} from "@/components/base/button/Typography";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

  // const user1 = 278;
  // const user2 = 286;
  // const matchId = 278286; // match_list_id

  //ผู้เลือก chooser
  //ผู้ถูกเลือก chosen_one

  // room - chat
  // 1 - M

  const getAllMessage = async (roomId) => {
    console.log(roomId);
    const { data, error } = await supabase
      .from("chat_message")
      .select("*")
      .eq("matchlist_id", roomId);
    setConversation(data);
  };

  const getRoomChat = async () => {
    const { data, error } = await supabase
      .from("match_list")
      .select("*")
      .eq("matchlist_id", param.matchListId); //มาเข้า state
    if (data.length > 0) {
      const roomId = data[0].matchlist_id;
      setRoomId(roomId);
      getAllMessage(roomId);
    }
  };

  const authenUser = async () => {
    const { data, error } = await supabase
      .from("match_list")
      .select("*")
      .or(`chooser.eq.${userId},chosen_one.eq.${userId}`)
      .eq("matchlist_id", roomId);
    console.log(data);
    if (data.length > 0) {
      setAuthen(true);
    } else {
      setAuthen(false);
      navigate(`/merry-list`);
    }
  };

  const getUserProfile = async () => {
    const result = await axios.get("http://localhost:4000/post/profile");
    console.log(result.data.data.profile_id);
    setUser(result.data.data.profile_id);
    setUserId(result.data.data.user_id);
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
    const { data, error } = await supabase
      .from("chat_message")
      .select("*")
      .order("timestampt", { ascending: false })
      .limit(1);
    setConversation((prev) => [...prev, data[0]]);
  };

  const convertTime = (timestamp) => {
    const date = new Date(timestamp);

    // Format the Date object as a time string
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
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
  }, []);

  useEffect(() => {
    authenUser();
  }, [roomId, userId]);

  const styleLayoutChat = (messageId) => {
    if (messageId !== user) {
      const style = "w-full  flex flex-row items-center justify-start";
      return style;
    } else {
      const style = "w-full  flex flex-row items-center justify-end";
      return style;
    }
  };

  const styleChat = (messageId) => {
    if (messageId !== user) {
      const style =
        "  text-black bg-ppurple-200 w-max p-[10px] mb-[10px] rounded-tr-full rounded-br-full rounded-tl-full";
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
      <section className="h-[900px] flex">
        {/* แถบด้านซ้ายหลังจากทำแชทเสร็จจะกลับมาทำ */}
        <div className="h-screen w-[25%] py-7 border-r-2 border-pgray-100">
          <div className=" border-ppurple-500 bg-pgray-100 border flex flex-col justify-center items-center py-4 mx-5 rounded-2xl mb-7">
            <svg
              width="62"
              height="59"
              viewBox="0 0 62 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0682 40.3261L22.0569 40.3193L22.0142 40.2968C21.1258 39.8135 20.2533 39.3014 19.3981 38.7614C17.3593 37.4786 15.4165 36.0489 13.5852 34.4839C9.44281 30.9111 4.83887 25.5507 4.83887 19.13C4.83907 17.035 5.48871 14.9917 6.69834 13.2812C7.90798 11.5708 9.61811 10.2775 11.5933 9.57924C13.5684 8.88102 15.7115 8.81229 17.7273 9.3825C19.7431 9.95272 21.5326 11.1338 22.8494 12.7632C24.1661 11.1338 25.9556 9.95272 27.9715 9.3825C29.9873 8.81229 32.1304 8.88102 34.1055 9.57924C36.0807 10.2775 37.7908 11.5708 39.0004 13.2812C40.2101 14.9917 40.8597 17.035 40.8599 19.13C40.8599 25.5507 36.2582 30.9111 32.1136 34.4839C29.5118 36.7069 26.6871 38.6549 23.6846 40.2968L23.6419 40.3193L23.6306 40.3261H23.6261C23.3869 40.4528 23.1204 40.5193 22.8497 40.5197C22.579 40.52 22.3123 40.4544 22.0727 40.3284L22.0682 40.3261Z"
                fill="#FF1659"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M39.8885 21.6787C37.0009 21.6787 34.2315 22.8258 32.1896 24.8677C30.1478 26.9095 29.0007 29.6789 29.0007 32.5665C29.0007 35.4542 30.1478 38.2235 32.1896 40.2654C34.2315 42.3072 37.0009 43.4543 39.8885 43.4543C42.7761 43.4543 45.5455 42.3072 47.5873 40.2654C49.6292 38.2235 50.7763 35.4542 50.7763 32.5665C50.7763 29.6789 49.6292 26.9095 47.5873 24.8677C45.5455 22.8258 42.7761 21.6787 39.8885 21.6787ZM26.0313 32.5665C26.0314 30.3507 26.563 28.1672 27.5813 26.1992C28.5997 24.2313 30.0751 22.5362 31.8839 21.2562C33.6926 19.9763 35.7819 19.1487 37.9766 18.843C40.1712 18.5373 42.4072 18.7623 44.4969 19.4992C46.5866 20.2361 48.4691 21.4634 49.9865 23.0781C51.504 24.6928 52.612 26.6479 53.2178 28.7793C53.8236 30.9107 53.9094 33.1564 53.4681 35.3278C53.0267 37.4992 52.0711 39.5331 50.6813 41.259L57.2694 47.8491C57.4153 47.985 57.5323 48.1489 57.6134 48.331C57.6946 48.5132 57.7382 48.7098 57.7417 48.9091C57.7453 49.1085 57.7086 49.3065 57.6339 49.4913C57.5592 49.6762 57.4481 49.8442 57.3071 49.9851C57.1661 50.1261 56.9982 50.2373 56.8133 50.3119C56.6284 50.3866 56.4304 50.4233 56.2311 50.4198C56.0317 50.4163 55.8351 50.3726 55.653 50.2915C55.4709 50.2103 55.307 50.0933 55.171 49.9475L48.5809 43.3593C46.545 44.9992 44.0867 46.0297 41.49 46.3318C38.8933 46.634 36.2641 46.1954 33.906 45.0668C31.548 43.9382 29.5573 42.1655 28.1638 39.9536C26.7704 37.7417 26.0311 35.1808 26.0313 32.5665Z"
                fill="#95002B"
              />
            </svg>
            <h1 className="font-bold text-2xl tracking-tight transition-colors first:mt-0 text-pred-600">
              Discover New Match
            </h1>
            <small className="text-pgray-700">
              Start find and Merry to get know
            </small>
            <small className="text-pgray-700">
              and connect with new friend!
            </small>
          </div>
          <hr className="border border-pgray-300" />
          <div className=" mt-5 ml-3">
            <div>
              <TypographyH3>Merry Match!</TypographyH3>
              <div id="container" className="flex mt-3">
                <div className="relative ml-5">
                  <svg
                    className="absolute bottom-0 right-0"
                    width="35"
                    height="20"
                    viewBox="0 0 35 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_60_1663)">
                      <path
                        d="M10.4334 17.0658C10.8314 17.3171 11.2375 17.5555 11.6511 17.7805L11.651 17.7805L11.6575 17.7839L11.6715 17.7924L11.7006 17.8069C11.9481 17.9348 12.2228 18.0014 12.5016 18.001C12.6848 18.0008 12.8661 17.9716 13.0391 17.9151H13.124L13.3425 17.7839L13.3438 17.7833L13.3508 17.7794C14.7449 17.0171 16.0565 16.1125 17.2646 15.0803L17.2646 15.0803L17.2679 15.0775C19.1466 13.458 21.5 10.8191 21.5 7.50006V7.49997C21.4999 6.36264 21.1472 5.25332 20.4905 4.32474C19.8338 3.39617 18.9054 2.69401 17.8331 2.31495C16.7608 1.93589 15.5973 1.89858 14.503 2.20815C13.766 2.41662 13.0847 2.77551 12.5 3.25785C11.9153 2.77551 11.234 2.41662 10.497 2.20815C9.40265 1.89858 8.23921 1.93589 7.16691 2.31495C6.09461 2.69401 5.1662 3.39617 4.50949 4.32474C3.85279 5.25332 3.50011 6.36264 3.5 7.49997V7.50006C3.5 10.8192 5.85457 13.4581 7.73187 15.0773L7.73532 15.0803C8.58531 15.8067 9.48704 16.4703 10.4334 17.0658ZM10.4334 17.0658C10.4337 17.066 10.4341 17.0662 10.4344 17.0665L10.967 16.2201L10.4331 17.0656C10.4332 17.0657 10.4333 17.0657 10.4334 17.0658Z"
                        fill="#FF1659"
                        stroke="white"
                        stroke-width="2"
                      />
                    </g>
                    <g clip-path="url(#clip1_60_1663)">
                      <path
                        d="M22.4334 17.0658C22.8314 17.3171 23.2375 17.5555 23.6511 17.7805L23.651 17.7805L23.6575 17.7839L23.6715 17.7924L23.7006 17.8069C23.9481 17.9348 24.2228 18.0014 24.5016 18.001C24.6848 18.0008 24.8661 17.9716 25.0391 17.9151H25.124L25.3425 17.7839L25.3438 17.7833L25.3508 17.7794C26.7449 17.0171 28.0565 16.1125 29.2646 15.0803L29.2646 15.0803L29.2679 15.0775C31.1466 13.458 33.5 10.8191 33.5 7.50006V7.49997C33.4999 6.36264 33.1472 5.25332 32.4905 4.32474C31.8338 3.39617 30.9054 2.69401 29.8331 2.31495C28.7608 1.93589 27.5973 1.89858 26.503 2.20815C25.766 2.41662 25.0847 2.77551 24.5 3.25785C23.9153 2.77551 23.234 2.41662 22.497 2.20815C21.4027 1.89858 20.2392 1.93589 19.1669 2.31495C18.0946 2.69401 17.1662 3.39617 16.5095 4.32474C15.8528 5.25332 15.5001 6.36264 15.5 7.49997V7.50006C15.5 10.8192 17.8546 13.4581 19.7319 15.0773L19.7353 15.0803C20.5853 15.8067 21.487 16.4703 22.4334 17.0658ZM22.4334 17.0658C22.4337 17.066 22.4341 17.0662 22.4344 17.0665L22.967 16.2201L22.4331 17.0656C22.4332 17.0657 22.4333 17.0657 22.4334 17.0658Z"
                        fill="#FF1659"
                        stroke="white"
                        stroke-width="2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_60_1663">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(2.5)"
                        />
                      </clipPath>
                      <clipPath id="clip1_60_1663">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(14.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <img
                    className="w-20 h-20 rounded-xl"
                    src="https://avatars.githubusercontent.com/u/134696384?v=4"
                  />
                </div>
                <div className="relative ml-5">
                  <svg
                    className="absolute bottom-0 right-0"
                    width="35"
                    height="20"
                    viewBox="0 0 35 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_60_1663)">
                      <path
                        d="M10.4334 17.0658C10.8314 17.3171 11.2375 17.5555 11.6511 17.7805L11.651 17.7805L11.6575 17.7839L11.6715 17.7924L11.7006 17.8069C11.9481 17.9348 12.2228 18.0014 12.5016 18.001C12.6848 18.0008 12.8661 17.9716 13.0391 17.9151H13.124L13.3425 17.7839L13.3438 17.7833L13.3508 17.7794C14.7449 17.0171 16.0565 16.1125 17.2646 15.0803L17.2646 15.0803L17.2679 15.0775C19.1466 13.458 21.5 10.8191 21.5 7.50006V7.49997C21.4999 6.36264 21.1472 5.25332 20.4905 4.32474C19.8338 3.39617 18.9054 2.69401 17.8331 2.31495C16.7608 1.93589 15.5973 1.89858 14.503 2.20815C13.766 2.41662 13.0847 2.77551 12.5 3.25785C11.9153 2.77551 11.234 2.41662 10.497 2.20815C9.40265 1.89858 8.23921 1.93589 7.16691 2.31495C6.09461 2.69401 5.1662 3.39617 4.50949 4.32474C3.85279 5.25332 3.50011 6.36264 3.5 7.49997V7.50006C3.5 10.8192 5.85457 13.4581 7.73187 15.0773L7.73532 15.0803C8.58531 15.8067 9.48704 16.4703 10.4334 17.0658ZM10.4334 17.0658C10.4337 17.066 10.4341 17.0662 10.4344 17.0665L10.967 16.2201L10.4331 17.0656C10.4332 17.0657 10.4333 17.0657 10.4334 17.0658Z"
                        fill="#FF1659"
                        stroke="white"
                        stroke-width="2"
                      />
                    </g>
                    <g clip-path="url(#clip1_60_1663)">
                      <path
                        d="M22.4334 17.0658C22.8314 17.3171 23.2375 17.5555 23.6511 17.7805L23.651 17.7805L23.6575 17.7839L23.6715 17.7924L23.7006 17.8069C23.9481 17.9348 24.2228 18.0014 24.5016 18.001C24.6848 18.0008 24.8661 17.9716 25.0391 17.9151H25.124L25.3425 17.7839L25.3438 17.7833L25.3508 17.7794C26.7449 17.0171 28.0565 16.1125 29.2646 15.0803L29.2646 15.0803L29.2679 15.0775C31.1466 13.458 33.5 10.8191 33.5 7.50006V7.49997C33.4999 6.36264 33.1472 5.25332 32.4905 4.32474C31.8338 3.39617 30.9054 2.69401 29.8331 2.31495C28.7608 1.93589 27.5973 1.89858 26.503 2.20815C25.766 2.41662 25.0847 2.77551 24.5 3.25785C23.9153 2.77551 23.234 2.41662 22.497 2.20815C21.4027 1.89858 20.2392 1.93589 19.1669 2.31495C18.0946 2.69401 17.1662 3.39617 16.5095 4.32474C15.8528 5.25332 15.5001 6.36264 15.5 7.49997V7.50006C15.5 10.8192 17.8546 13.4581 19.7319 15.0773L19.7353 15.0803C20.5853 15.8067 21.487 16.4703 22.4334 17.0658ZM22.4334 17.0658C22.4337 17.066 22.4341 17.0662 22.4344 17.0665L22.967 16.2201L22.4331 17.0656C22.4332 17.0657 22.4333 17.0657 22.4334 17.0658Z"
                        fill="#FF1659"
                        stroke="white"
                        stroke-width="2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_60_1663">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(2.5)"
                        />
                      </clipPath>
                      <clipPath id="clip1_60_1663">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(14.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <img
                    className="w-20 h-20 rounded-xl"
                    src="https://s.isanook.com/ca/0/ud/278/1394829/26309033_141508049870704_5253.jpg?ip/resize/w728/q80/jpg"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <TypographyH3>Chat with Merry Match</TypographyH3>
              <div className="flex ml-5 mt-6">
                <img
                  className="w-14 h-14 rounded-full"
                  src="https://avatars.githubusercontent.com/u/134715451?v=4"
                />
                <div className="flex flex-col justify-center ml-3 text-pgray-700">
                  <p className="text-black">Ygritte</p>
                  <TypographySmall>
                    Let's start conversation now
                  </TypographySmall>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ห้องแชท */}
        <div className="  bg-black w-[75%] h-screen text-white ">
          <div className="p-10 ">
            <p>History</p>
            <div className="mt-10 h-[700px] overflow-auto ">
              {conversation?.map((item, index) => (
                <div
                  key={item.message_id}
                  className={styleLayoutChat(item.profile_id)}
                >
                  {/* {convertTime(item.timestampt)} | User {item.user_id}:{" "} */}
                  <div className={styleChat(item.profile_id)}>
                    {item.message_content}
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <div className="">
                <div></div>
                <button
                  onClick={() => sendMessageUser1()}
                  className=" w-max  border-none outline-none bg-pgray-100  cursor-pointer rounded-full p-3  "
                >
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
                  className=" w-[80%] flex-1 border-none outline-none bg-transparent p-[10px] font-medium "
                  placeholder="Messege here..."
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

// ใส่รูป user คนที่ส่งข้อความ เอาทั้งก้อนที่ แมพออกมา มาเข้าเงื่อนไขเช็ค user

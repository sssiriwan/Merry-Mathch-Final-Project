import React from "react";
import "@/App.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import PreviewCard from "../PreviewCard";
import { supabase } from "@/utils/supabaseClient";

export const Matching = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [profileImg, setProfileImg] = useState({});
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [userId, setUserId] = useState(null);
  console.log(userId);

  const getData = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:4000/post");
    console.log(result.data.data[count]);
    setProfile(result.data.data[count]);
    setProfileImg(result.data.data[count].profile_image);
    setIsLoading(false);
  };

  const getUserProfile = async () => {
    const result = await axios.get("http://localhost:4000/post/profile");
    setUserId(result.data.data.user_id);
  };

  const matchSomeone = async () => {
    console.log(profile.user_id)
    const checkMatch = await supabase
      .from("match_list")
      .select("*")
      .eq("chooser", profile.user_id)
      .eq("chosen_one", userId)
      .select();
    console.log(checkMatch.data);
    if (checkMatch.data.length==0) {
      console.log("จะแมชคนนี้", profile.user_id);
      const { data, error } = await supabase.from("match_list").insert({
        chooser: userId,
        chosen_one: profile.user_id,
        status: "merry",
        created_at: new Date(),
      });
      setCount(count + 1);
    } else {
      console.log("อัปเดตสถานะอันนี้", checkMatch.data[0].matchlist_id)
      const updateStatus = {
        status: "match",
        updated_at: new Date(),
      };
      const { data, error } = await supabase
        .from("match_list")
        .update(updateStatus)
        .eq("matchlist_id", checkMatch.data[0].matchlist_id);
        //เด้งป้อปอัพไปห้องแชท
      //  setCount(count + 1);
    }
  };

  const unmatchSomeone = async () => {
    const data = {
      user_id: profile.user_id,
    };
    console.log("จะไม่แมชคนนี้", profile.profile_id);
    //const result = await axios.post("http://localhost:4000/post/unmatch", data);
    // console.log(result);
    setCount(count + 1);
  };

  const age = (birthday) => {
    const today = new Date();
    const userAge =
      today.getFullYear() -
      birthday.getFullYear() -
      (today.getMonth() < birthday.getMonth() ||
        (today.getMonth() === birthday.getMonth() &&
          today.getDate() < birthday.getDate()));
    return userAge;
  };

  useEffect(() => {
    getData();
    getUserProfile();
  }, [count, userId]);

  return (
    <section className="w-[72%] bg-putility-400 flex justify-center items-center">
      {clicked && (
        <div className="absolute left-[500px] top-40 z-20">
          <PreviewCard
            setClicked={setClicked}
            clicked={clicked}
            userId={profile.user_id}
          />
        </div>
      )}
      <div className=" w-fit absolute left-[700px] bottom-[140px] z-10 flex justify-between items-center px-10">
        <div className="flex font-bold text-3xl text-white items-center">
          <h1>{profile.fullname}</h1>
          <h2 className="ml-2 text-pgray-400">
            {age(new Date(profile.date_of_birth))}
          </h2>
          <button
            onClick={() => {
              setClicked(!clicked);
            }}
            className="rounded-full w-7 h-7 flex justify-center items-center ml-2 bg-white bg-opacity-30 hover:bg-opacity-10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.531497 8.47203C0.41398 8.16668 0.41398 7.82858 0.531497 7.52323C1.11328 6.01482 2.13826 4.71798 3.47146 3.80347C4.80467 2.88896 6.38358 2.39967 8.0003 2.40002C11.4059 2.40002 14.3147 4.52802 15.4691 7.52803C15.5867 7.83283 15.5859 8.17123 15.4691 8.47683C14.8873 9.98523 13.8623 11.2821 12.5291 12.1966C11.1959 13.1111 9.61701 13.6004 8.0003 13.6C4.5947 13.6 1.6859 11.472 0.531497 8.47203ZM11.2003 8.00003C11.2003 8.84872 10.8632 9.66265 10.263 10.2628C9.66292 10.8629 8.84899 11.2 8.0003 11.2C7.1516 11.2 6.33767 10.8629 5.73755 10.2628C5.13744 9.66265 4.8003 8.84872 4.8003 8.00003C4.8003 7.15133 5.13744 6.3374 5.73755 5.73728C6.33767 5.13717 7.1516 4.80002 8.0003 4.80002C8.84899 4.80002 9.66292 5.13717 10.263 5.73728C10.8632 6.3374 11.2003 7.15133 11.2003 8.00003Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        navigation={true}
        spaceBetween={50}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[Pagination, Navigation]}
        className="mySwiper relative"
      >
        {!isLoading && (
          <>
            {Object.values(profileImg).map((image) => {
              return (
                image != null && (
                  <SwiperSlide className="w-[700px] h-[700px]">
                    <img
                      src={image}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                    <div className="shadowcss"></div>
                  </SwiperSlide>
                )
              );
            })}
          </>
        )}
        {isLoading && (
          <>
            <div class="h-[500px] flex items-center">
              <div class="custom-loader"></div>
            </div>
          </>
        )}
      </Swiper>
      <div className="w-40 absolute left-1/2 bottom-7 z-10 flex justify-around">
        <Button
          onClick={unmatchSomeone}
          className="w-16 h-16 rounded-2xl bg-white"
        >
          <div className="w-10 h-10 flex justify-center items-center">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_60_1554)">
                <path
                  d="M12.502 37.4999L37.502 12.4999M12.502 12.4999L37.502 37.4999"
                  stroke="#646D89"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  shape-rendering="crispEdges"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_60_1554"
                  x="0.00195312"
                  y="-0.00012207"
                  width="54"
                  height="54"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_60_1554"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_60_1554"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </Button>
        <Button
          onClick={matchSomeone}
          className="w-16 h-16 rounded-2xl bg-white"
        >
          <div className="w-14 h-14 flex justify-center items-center pt-1 pl-1">
            <svg
              width="64"
              height="60"
              viewBox="0 0 64 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_60_1557)">
                <path
                  d="M29.1325 45.2875L29.12 45.28L29.0725 45.255C28.086 44.7182 27.1171 44.1496 26.1675 43.55C23.9034 42.1254 21.746 40.5379 19.7125 38.8C15.1125 34.8325 10 28.88 10 21.75C10.0002 19.4236 10.7216 17.1546 12.0649 15.2552C13.4081 13.3558 15.3072 11.9196 17.5005 11.1443C19.6938 10.3689 22.0736 10.2926 24.3121 10.9258C26.5506 11.559 28.5378 12.8706 30 14.68C31.4622 12.8706 33.4494 11.559 35.6879 10.9258C37.9264 10.2926 40.3062 10.3689 42.4995 11.1443C44.6928 11.9196 46.5919 13.3558 47.9351 15.2552C49.2784 17.1546 49.9998 19.4236 50 21.75C50 28.88 44.89 34.8325 40.2875 38.8C37.3983 41.2685 34.2617 43.4317 30.9275 45.255L30.88 45.28L30.8675 45.2875H30.8625C30.5969 45.4282 30.3009 45.502 30.0003 45.5024C29.6997 45.5028 29.4035 45.4299 29.1375 45.29L29.1325 45.2875Z"
                  fill="#C70039"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_60_1557"
                  x="0"
                  y="0.501038"
                  width="64"
                  height="59.0013"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.249604 0 0 0 0 0.196181 0 0 0 0 0.520833 0 0 0 0.12 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_60_1557"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_60_1557"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </Button>
      </div>
      <footer className="h-5 absolute bottom-0 flex">
        <p className="text-pgray-700">Merry limit today</p>
        <p className="text-pred-400 ml-3">2/20</p>
      </footer>
    </section>
  );
};

export default Matching;

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
import { useAge } from "@/contexts/ageContext";
import { useNavigate } from "react-router-dom";

export const Matching = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [profileImg, setProfileImg] = useState({});
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [userId, setUserId] = useState(null);
  const {
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
    female,
    setFemale,
    male,
    setMale,
    nonBi,
    setNonBi,
  } = useAge();
  const navigate = useNavigate();
  const getData = async () => {
    //ใช้contexในการมา query หาข้อมูลส่วนนี้เปลี่ยนเป็นยิง supabase จากหน้าบ้าน
    setIsLoading(true);
    const result = await axios.get(
      `http://localhost:4000/post/filter?min=${minAge}&max=${maxAge}&male=${male}&female=${female}&bi=${nonBi}`
    );
    console.log(result.data.data);
    //console.log(result.data.data[count]);
    //เขียนlogicให้เช็คตาราง meery list ก่อนถ้า status เป็น unmatch ไม่ให้เก็บเข้า state
    if (!result.data.data[count]) {
      setProfile(null);
      setProfileImg(null);
    } else {
      setProfile(result.data.data[count]);
      setProfileImg(result.data.data[count].profile_image);
      setIsLoading(false);
    }
  };

  const getUserProfile = async () => {
    const result = await axios.get("http://localhost:4000/post/profile");
    setUserId(result.data.data.user_id);
  };

  const matchSomeone = async () => {
    //console.log(profile.user_id)
    const checkMatch = await supabase
      .from("match_list")
      .select("*")
      .eq("chooser", profile.user_id)
      .eq("chosen_one", userId)
      .select();
    //console.log(checkMatch.data);
    if (checkMatch.data.length == 0) {
      //console.log("จะแมชคนนี้", profile.user_id);
      const { data, error } = await supabase.from("match_list").insert({
        chooser: userId,
        chosen_one: profile.user_id,
        status: "merry",
        created_at: new Date(),
      });
      setCount(count + 1);
    } else {
      console.log("อัปเดตสถานะอันนี้", checkMatch.data[0].matchlist_id);
      const updateStatus = {
        status: "match",
        updated_at: new Date(),
      };
      const { data, error } = await supabase
        .from("match_list")
        .update(updateStatus)
        .eq("matchlist_id", checkMatch.data[0].matchlist_id);
      //เด้งป้อปอัพไปห้องแชท set state true true fale ให้ ป้อปปัพเด้ง
      //  setCount(count + 1);
    }
  };

  const unmatchSomeone = async () => {
    //console.log("จะไม่แมชคนนี้", profile.profile_id);

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
  }, [count, userId, maxAge, minAge, female, male, nonBi]);

  return (
    <section className="w-[72%] flex justify-center items-center">
      {clicked && (
        <div className="relative -top-[45%] z-20">
          <PreviewCard
            setClicked={setClicked}
            clicked={clicked}
            userId={profile.user_id}
          />
        </div>
      )}
      <div className="absolute right-1/2 bottom-[20%] z-10 flex px-10">
        <div className="flex font-bold text-3xl text-white items-center">
          <h1>{profile && profile.fullname}</h1>
          <h2 className="ml-2 text-pgray-400">
            {profile && age(new Date(profile.date_of_birth))}
          </h2>
          {profile && (
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
          )}
        </div>
      </div>
      {profile == null ? (
        <div
          className=" w-[40%] h-[25%] cursor-pointer border-ppurple-500 bg-pgray-100 hover:bg-ppurple-100 hover:ring-pred-300 ring-2 hover:ring-inset border flex flex-col justify-center items-center py-4 mx-5 rounded-2xl mb-7"
          onClick={() => {
            navigate(`/merry-list`);
          }}
        >
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
          <h1 className="font-bold text-center text-2xl tracking-tight transition-colors my-1 text-pred-600">
            Discover Your Merry List
          </h1>
          <small className="text-pgray-700">
            Start chatting with the people you've matched.
          </small>
          <small className="text-pgray-700">
            Hope you find the person you're looking for.
          </small>
        </div>
      ) : (
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          navigation={true}
          spaceBetween={50}
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
      )}

      {profile && (
        <div className="w-40 absolute bottom-[5%] z-10 flex justify-around">
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
      )}
      <footer className="h-5 absolute bottom-2 flex">
        <p className="text-pgray-700">Merry limit today</p>
        <p className="text-pred-400 ml-3">2/20</p>
      </footer>
    </section>
  );
};

export default Matching;

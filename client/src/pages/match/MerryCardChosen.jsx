import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PreviewCard from "../PreviewCard";
import { supabase } from "@/utils/supabaseClient";

export const MerryCardChosen = (props) => {
    const navigate = useNavigate();

    const matchList = props.user;
    const userId = props.id;
  
    // console.log(userId, matchList);
  
    const [proUserId, setProUserId] = useState();
    const [fullname, setFullname] = useState();
    const [birthDate, setBirthDate] = useState();
    const [location, setLocation] = useState();
    const [city, setCity] = useState();
    const [sexIdentity, setSexIdentity] = useState();
    const [sexPreference, setSexPreference] = useState();
    const [racialPreference, setRacialPreference] = useState();
    const [meetingInterest, setMeetingInterest] = useState();
    const [image, setImage] = useState();
  
  
  
    const [clicked, setClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [updateStatus, setUpdateStatus] = useState(profile.status)
  
    const getProfile = async (item, userId) => {
      console.log(item);
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "*, users(email, username, user_id),hobbies(hob_1,hob_2,hob_3,hob_4,hob_5,hob_6,hob_7,hob_8,hob_9,hob_10), profile_image(img_1, img_2, img_3,img_4,img_5)"
        )
        .eq("user_id", item.chooser || item.chosen_one)
        .neq("user_id", userId);
  
      setProUserId(data[0].user_id);
      setFullname(data[0].fullname);
      setBirthDate(data[0].date_of_birth);
      setLocation(data[0].location);
      setCity(data[0].city);
      setSexIdentity(data[0].sexual_identity);
      setSexPreference(data[0].sexual_preference);
      setRacialPreference(data[0].racial_preference);
      setMeetingInterest(data[0].meeting_interest);
      setImage(data[0].profile_image.img_1)
  
      setIsLoading(false);
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
  
      const handleMatchClick = async (item) => {
        try {
          // if (item.status === "merry"){
          const updateStatus = {
            match_list_id: item.match_list_id,
            status: "unmerry",
          };
          //   return updateStatus
          // }
          //   if (item.status === "unmerry"){
          //     const updateStatus = {
          //     match_list_id: item.match_list_id ,
          //     status: "merry",
          //   };
          //   return updateStatus
          // }
  
          const result = await axios.put(
            `http://localhost:4000/post/match`,
            updateStatus
          );
  
          //  Navigate to the complaint detail page
          // navigate(`/admin/complain/detail/${param.complainId}`);
        } catch (error) {
          alert(error);
        }
      };
  
      const merryMatchButton = (status) => {
        if (status.toLowerCase() === "merry") {
          return (
            <div className="border-2 border-pred-500 rounded-full flex items-center justify-center py-1 px-4 w-fit">
              <svg
                width="21"
                height="12"
                viewBox="0 0 21 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_5071_276)">
                  <path
                    d="M6.61163 10.155C6.84858 10.3046 7.09033 10.4464 7.33649 10.5804L7.33646 10.5804L7.34158 10.5831L7.34904 10.5876L7.36365 10.5949C7.4981 10.6645 7.64737 10.7008 7.79885 10.7006C7.90344 10.7004 8.00692 10.6829 8.10516 10.649H8.14476L8.25354 10.5837L8.26054 10.5799C9.09099 10.1257 9.87224 9.58696 10.5918 8.97212L10.5918 8.97212L10.5935 8.97069C11.7169 8.00225 13.098 6.44469 13.098 4.49998V4.49993C13.098 3.83821 12.8928 3.19279 12.5107 2.65253C12.1286 2.11226 11.5885 1.70374 10.9646 1.48319C10.3407 1.26265 9.66378 1.24094 9.02704 1.42105C8.57122 1.54999 8.15204 1.77782 7.79805 2.08569C7.44406 1.77782 7.02487 1.54999 6.56905 1.42105C5.93232 1.24094 5.25541 1.26265 4.63152 1.48319C4.00764 1.70374 3.46747 2.11226 3.08539 2.65253C2.70331 3.19279 2.49811 3.83821 2.49805 4.49993V4.49998C2.49805 6.44474 3.87983 8.00231 5.00248 8.9706L5.00421 8.97208C5.5106 9.40485 6.04783 9.80019 6.61163 10.155ZM6.61163 10.155C6.61152 10.1549 6.61141 10.1548 6.6113 10.1547L6.8782 9.73204L6.61197 10.1552C6.61186 10.1551 6.61174 10.155 6.61163 10.155Z"
                    fill="#FF1659"
                    stroke="white"
                  />
                </g>
                <g clip-path="url(#clip1_5071_276)">
                  <path
                    d="M13.8128 10.155C14.0498 10.3046 14.2915 10.4464 14.5377 10.5804L14.5376 10.5804L14.5427 10.5831L14.5502 10.5876L14.5648 10.5949C14.6993 10.6645 14.8485 10.7008 15 10.7006C15.1046 10.7004 15.2081 10.6829 15.3063 10.649H15.3459L15.4547 10.5837L15.4617 10.5799C16.2922 10.1257 17.0734 9.58696 17.793 8.97212L17.793 8.97212L17.7947 8.97069C18.9181 8.00225 20.2992 6.44469 20.2992 4.49998V4.49993C20.2992 3.83821 20.094 3.19279 19.7119 2.65253C19.3298 2.11226 18.7896 1.70374 18.1657 1.48319C17.5419 1.26265 16.8649 1.24094 16.2282 1.42105C15.7724 1.54999 15.3532 1.77782 14.9992 2.08569C14.6452 1.77782 14.226 1.54999 13.7702 1.42105C13.1335 1.24094 12.4566 1.26265 11.8327 1.48319C11.2088 1.70374 10.6686 2.11226 10.2866 2.65253C9.90448 3.19279 9.69928 3.83821 9.69922 4.49993V4.49998C9.69922 6.44474 11.081 8.00231 12.2037 8.9706L12.2054 8.97208C12.7118 9.40485 13.249 9.80019 13.8128 10.155ZM13.8128 10.155C13.8127 10.1549 13.8126 10.1548 13.8125 10.1547L14.0794 9.73204L13.8131 10.1552C13.813 10.1551 13.8129 10.155 13.8128 10.155Z"
                    fill="#FF1659"
                    stroke="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5071_276">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="translate(1.79883)"
                    />
                  </clipPath>
                  <clipPath id="clip1_5071_276">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="translate(9)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-pred-500 font-extrabold ml-2">Merry Match!</p>
            </div>
          );
        } else {
          return (
            <div className="border-2 border-pgray-500 rounded-full flex items-center justify-center py-1 px-4 w-fit">
              <p className="text-pgray-700">Not Match yet</p>
            </div>
          );
        }
      };
  
      const merryButtonStyle = (status) => {
        if (status.toLowerCase() === "merry") {
          const style = "w-10 h-10 rounded-2xl shadow-3xl bg-pred-500";
          return style;
        } else {
          const style = "w-10 h-10 rounded-2xl shadow-3xl bg-white";
          return style;
        }
      };
  
      const heartStyle = (status) => {
        if (status.toLowerCase() === "merry") {
          const style = "white";
          return style;
        } else {
          const style = "red";
          return style;
        }
      };
  
    useEffect(() => {
      getProfile(matchList, userId);
    }, [matchList, userId]);
  
  return (
    <div>
       <>
          {clicked && (
            <PreviewCard
              setClicked={setClicked}
              clicked={clicked}
              userId={proUserId}
            />
          )}
          <div className="flex border-b h-[180px] items-center py-28 my-3">
        <div>
          <img
            src={image}
            className="aspect-square object-cover rounded-2xl w-44 ml-5"
          />
        </div>
        <div className="ml-10 w-[600px]">
          <div className="flex font-bold text-2xl text-pgray-700 items-center">
            <h1 className="text-pgray-900 mr-3">{fullname}</h1>
            <h1>{age(new Date(birthDate))}</h1>
            <div className="text-base font-normal ml-3">
              <h2>
                {city}, {location}
              </h2>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="w-48 mt-2">Sexual Identities</h1>
              <h1 className="text-pgray-700">{sexIdentity}</h1>
            </div>
            <div className="flex items-center">
              <h1 className="w-48 mt-2">Sexual Preferences</h1>
              <h1 className="text-pgray-700">{sexPreference}</h1>
            </div>
            <div className="flex items-center">
              <h1 className="w-48 mt-2">Racial Preferences</h1>
              <h1 className="text-pgray-700">{racialPreference}</h1>
            </div>
            <div className="flex items-center">
              <h1 className="w-48 mt-2">Meeting Interests</h1>
              <h1 className="text-pgray-700">{meetingInterest}</h1>
            </div>
          </div>
        </div>
        <div className="w-[200px] h-[180px] flex flex-col items-end">
        {merryMatchButton(matchList.status)}
          <div className="w-10/12 justify-between flex flex-row-reverse mt-5">
            {/* เช็ค status แล้วเลือกแสดงปุ่ม เมื่อคลิกแล้วให้เปลี่ยน state status */}
            <button className={merryButtonStyle(matchList.status)} onClick={() => handleMatchClick(profile)}>
              
              <svg
                width="44"
                height="42"
                viewBox="0 0 44 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_5071_59)">
                  <path
                    d="M19.584 27.298L19.578 27.2944L19.5552 27.2824C19.0817 27.0248 18.6166 26.7518 18.1608 26.464C17.074 25.7802 16.0385 25.0182 15.0624 24.184C12.8544 22.2796 10.4004 19.4224 10.4004 16C10.4005 14.8834 10.7468 13.7942 11.3915 12.8825C12.0363 11.9708 12.9478 11.2814 14.0006 10.9093C15.0534 10.5371 16.1957 10.5005 17.2702 10.8044C18.3447 11.1083 19.2985 11.7379 20.0004 12.6064C20.7022 11.7379 21.6561 11.1083 22.7306 10.8044C23.8051 10.5005 24.9473 10.5371 26.0001 10.9093C27.053 11.2814 27.9645 11.9708 28.6093 12.8825C29.254 13.7942 29.6003 14.8834 29.6004 16C29.6004 19.4224 27.1476 22.2796 24.9384 24.184C23.5516 25.3689 22.046 26.4072 20.4456 27.2824L20.4228 27.2944L20.4168 27.298H20.4144C20.2869 27.3656 20.1448 27.401 20.0005 27.4012C19.8563 27.4014 19.7141 27.3664 19.5864 27.2992L19.584 27.298Z"
                    fill={heartStyle(matchList.status)}
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_5071_59"
                    x="0.400391"
                    y="0.600525"
                    width="43.1992"
                    height="40.8007"
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
                      result="effect1_dropShadow_5071_59"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_5071_59"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </button>
            <button
              onClick={() => {
                setClicked(!clicked);
              }}
              className="w-10 h-10 bg-white rounded-2xl shadow-3xl grid place-items-center aspect-square"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15Z"
                  fill="#646D89"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.796268 12.708C0.619994 12.25 0.619994 11.7428 0.796268 11.2848C1.66894 9.02217 3.20641 7.07691 5.20622 5.70514C7.20603 4.33338 9.5744 3.59945 11.9995 3.59998C17.1079 3.59998 21.4711 6.79198 23.2027 11.292C23.3791 11.7492 23.3779 12.2568 23.2027 12.7152C22.33 14.9778 20.7925 16.923 18.7927 18.2948C16.7929 19.6666 14.4245 20.4005 11.9995 20.4C6.89107 20.4 2.52787 17.208 0.796268 12.708ZM16.7995 12C16.7995 13.273 16.2938 14.4939 15.3936 15.3941C14.4934 16.2943 13.2725 16.8 11.9995 16.8C10.7264 16.8 9.50553 16.2943 8.60536 15.3941C7.70518 14.4939 7.19947 13.273 7.19947 12C7.19947 10.7269 7.70518 9.50604 8.60536 8.60586C9.50553 7.70569 10.7264 7.19998 11.9995 7.19998C13.2725 7.19998 14.4934 7.70569 15.3936 8.60586C16.2938 9.50604 16.7995 10.7269 16.7995 12Z"
                  fill="#646D89"
                />
              </svg>
            </button>
            <button className="w-10 h-10 bg-white rounded-2xl shadow-3xl grid place-items-center aspect-square">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 0.599976C4.82802 0.599976 0.400024 4.23958 0.400024 8.99998C0.400024 11.4288 1.57362 13.59 3.39882 15.102C3.38209 15.8477 3.16578 16.5754 2.77242 17.2092C2.69087 17.3409 2.64467 17.4913 2.63831 17.6461C2.63195 17.8009 2.66563 17.9546 2.7361 18.0926C2.80657 18.2305 2.91145 18.3479 3.04058 18.4334C3.16971 18.519 3.31873 18.5697 3.47322 18.5808C5.15499 18.7067 6.82735 18.236 8.19642 17.2512C8.78082 17.3496 9.38443 17.4 10 17.4C15.172 17.4 19.6 13.7604 19.6 8.99998C19.6 4.23958 15.172 0.599976 10 0.599976ZM10 10.2C10.3183 10.2 10.6235 10.0735 10.8486 9.8485C11.0736 9.62346 11.2 9.31824 11.2 8.99998C11.2 8.68172 11.0736 8.37649 10.8486 8.15145C10.6235 7.9264 10.3183 7.79998 10 7.79998C9.68176 7.79998 9.37654 7.9264 9.1515 8.15145C8.92645 8.37649 8.80002 8.68172 8.80002 8.99998C8.80002 9.31824 8.92645 9.62346 9.1515 9.8485C9.37654 10.0735 9.68176 10.2 10 10.2ZM7.60002 8.99998C7.60002 9.31824 7.4736 9.62346 7.24855 9.8485C7.02351 10.0735 6.71828 10.2 6.40002 10.2C6.08176 10.2 5.77654 10.0735 5.5515 9.8485C5.32645 9.62346 5.20002 9.31824 5.20002 8.99998C5.20002 8.68172 5.32645 8.37649 5.5515 8.15145C5.77654 7.9264 6.08176 7.79998 6.40002 7.79998C6.71828 7.79998 7.02351 7.9264 7.24855 8.15145C7.4736 8.37649 7.60002 8.68172 7.60002 8.99998ZM13.6 10.2C13.9183 10.2 14.2235 10.0735 14.4486 9.8485C14.6736 9.62346 14.8 9.31824 14.8 8.99998C14.8 8.68172 14.6736 8.37649 14.4486 8.15145C14.2235 7.9264 13.9183 7.79998 13.6 7.79998C13.2818 7.79998 12.9765 7.9264 12.7515 8.15145C12.5265 8.37649 12.4 8.68172 12.4 8.99998C12.4 9.31824 12.5265 9.62346 12.7515 9.8485C12.9765 10.0735 13.2818 10.2 13.6 10.2Z"
                  fill="#646D89"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
    </div>
  )
}

export default MerryCardChosen;
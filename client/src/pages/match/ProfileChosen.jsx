import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const ProfileChooser = (props) => {
  const matchList = props.matchList;
  const userId = matchList.chosen_one;
  //console.log(userId);
  const roomId = matchList.matchlist_id;

  const navigate = useNavigate();

  const [image, setImage] = useState();
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
    setImage(data[0].profile_image.img_1);
  };
  //console.log("รูป", image);

  useEffect(() => {
    // console.log("ทำงานไหม");
    getProfile(userId);
  }, [userId]);

  return (
    <>
      {!isLoading && (
        <button
          onClick={() => {
            navigate(`/chat/${roomId}`);
          }}
        >
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
            <img className="w-20 h-20 rounded-xl object-cover" src={image} />
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
export default ProfileChooser;

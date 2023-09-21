import Footer from "@/components/base/Footer";
import { NavbarRegistered } from "@/components/base/Navbar";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyLead,
  TypographySmall,
} from "@/components/base/button/Typography";
import "../App.css";
import { Button } from "@/components/ui/button";
import heart from "../../public/icons/icon_vector.png";
import dislike from "../../public/icons/x.png";
import glass from "../../public/icons/Frame.png";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

function MatchingPage() {
  const getData = async () => {
    const result = await axios.get("http://localhost:4000/admin/package");
    console.log(result);
  };
  useEffect(() => {
    getData();
  }, [count]);
  return (
    <>
      <NavbarRegistered />
      <section className="h-[900px] flex">
        <aside className="h-full w-[18%] py-7 border-r-2 border-pgray-100">
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
        </aside>
        <section className="w-[72%] bg-putility-400 flex justify-center items-center">
          <div className="relative" id="card">
            <div className="" id="card-detail">
              <img
                className="w-[500px] h-[500px] rounded-3xl object-cover"
                src="https://files.vogue.co.th/uploads/makeup_steps_to_natural_look3.jpg"
              />
              <div className="shadowcss"></div>
              {/* แถบชื่อ และ ปุ่ม */}
              <div className="w-full absolute bottom-10 z-10 flex justify-between items-center px-10">
                {/* ชื่อ */}
                <div className="flex font-bold text-3xl text-white items-center">
                  <h1>Daeny</h1>
                  <h2 className="ml-2 text-pgray-400">24</h2>
                  <button className="rounded-full w-7 h-7 flex justify-center items-center ml-2 bg-white bg-opacity-30 hover:bg-opacity-10">
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
                {/* ปุ่ม */}
                <div>
                  <button className="rounded-3xl hover:scale-125">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.9732 18.9509H17.5039L22.5147 13.8056C22.9151 13.3944 22.9151 12.7196 22.5147 12.3084C22.1142 11.8972 21.4674 11.8972 21.0669 12.3084L14.3003 19.2567C13.8999 19.6679 13.8999 20.3321 14.3003 20.7433L21.0669 27.6916C21.4674 28.1028 22.1142 28.1028 22.5147 27.6916C22.9151 27.2804 22.9151 26.6161 22.5147 26.2049L17.5039 21.0596H28.9732C29.5379 21.0596 30 20.5852 30 20.0053C30 19.4254 29.5379 18.9509 28.9732 18.9509Z"
                        fill="#F6F7FC"
                      />
                    </svg>
                  </button>
                  <button className="rounded-3xl hover:scale-125">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0268 21.0491L26.4961 21.0491L21.4853 26.1944C21.0849 26.6056 21.0849 27.2804 21.4853 27.6916C21.8858 28.1028 22.5326 28.1028 22.9331 27.6916L29.6997 20.7433C30.1001 20.3321 30.1001 19.6679 29.6997 19.2567L22.9331 12.3084C22.5326 11.8972 21.8858 11.8972 21.4853 12.3084C21.0849 12.7196 21.0849 13.3839 21.4853 13.7951L26.4961 18.9404L15.0268 18.9404C14.4621 18.9404 14 19.4148 14 19.9947C14 20.5746 14.4621 21.0491 15.0268 21.0491Z"
                        fill="#F6F7FC"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* matching button */}
              <div className=" w-40 absolute left-1/2 translate-x-[-50%] -bottom-8 z-10 flex justify-around">
                <Button className="w-16 h-16 rounded-2xl bg-white">
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
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
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
                <Button className="w-16 h-16 rounded-2xl bg-white">
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
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
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
              {/* เด้ง  left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] */}
              <div id="card-matching">
                <div className="absolute w-full top-1/2 translate-y-[-50%] text-center">
                  <div className="flex justify-center items-center">
                    <svg
                      width="106"
                      height="63"
                      viewBox="0 0 106 63"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.6616 52.0214C32.8767 52.7886 34.1163 53.5161 35.3786 54.2029L35.3907 54.2095L35.403 54.216L35.4123 54.2209L35.4459 54.241L35.5053 54.2707C36.118 54.5887 36.7984 54.7542 37.4889 54.7532C37.9968 54.7525 38.4989 54.6617 38.9725 54.4865H39.1165L39.559 54.2209L39.5683 54.216L39.5824 54.2085L39.5964 54.2009C43.8557 51.8717 47.8627 49.1084 51.5534 45.9549L51.5601 45.9492C57.348 40.9598 64.3092 33.0559 64.3092 23.2723V23.2721C64.3089 19.9711 63.2852 16.7514 61.3792 14.0563C59.4732 11.3612 56.7785 9.32323 53.6663 8.22305C50.5541 7.12287 47.1773 7.01457 44.0009 7.91306C41.5598 8.60359 39.3292 9.8627 37.4856 11.574C35.642 9.8627 33.4115 8.60359 30.9704 7.91306C27.794 7.01457 24.4172 7.12287 21.305 8.22305C18.1927 9.32323 15.4981 11.3612 13.5921 14.0563C11.6861 16.7514 10.6624 19.9711 10.6621 23.2721V23.2723C10.6621 33.0561 17.6268 40.9601 23.4108 45.9488L23.4177 45.9547C26.0148 48.1743 28.7701 50.2019 31.6616 52.0214ZM31.6616 52.0214C31.6623 52.0218 31.663 52.0223 31.6637 52.0227L32.7288 50.3299L31.661 52.021C31.6612 52.0211 31.6614 52.0213 31.6616 52.0214Z"
                        fill="#FF1659"
                        stroke="white"
                        stroke-width="4"
                      />
                      <path
                        d="M68.897 52.0214C70.1121 52.7886 71.3517 53.5161 72.614 54.2029L72.6261 54.2095L72.6383 54.216L72.6477 54.2209L72.6812 54.241L72.7407 54.2707C73.3534 54.5887 74.0338 54.7542 74.7243 54.7532C75.2321 54.7525 75.7343 54.6617 76.2078 54.4865H76.3518L76.7943 54.2209L76.8037 54.216L76.8178 54.2085L76.8318 54.2009C81.091 51.8717 85.098 49.1084 88.7888 45.9549L88.7954 45.9492C94.5833 40.9598 101.545 33.0559 101.545 23.2723V23.2721C101.544 19.9711 100.521 16.7514 98.6146 14.0563C96.7085 11.3612 94.0139 9.32323 90.9016 8.22305C87.7894 7.12287 84.4126 7.01457 81.2363 7.91306C78.7951 8.60359 76.5646 9.8627 74.721 11.574C72.8774 9.8627 70.6469 8.60359 68.2057 7.91306C65.0294 7.01457 61.6526 7.12287 58.5403 8.22305C55.4281 9.32323 52.7334 11.3612 50.8274 14.0563C48.9214 16.7514 47.8978 19.9711 47.8975 23.2721V23.2723C47.8975 33.0561 54.8621 40.9601 60.6461 45.9488L60.653 45.9547C63.2502 48.1743 66.0055 50.2019 68.897 52.0214ZM68.897 52.0214C68.8977 52.0218 68.8984 52.0223 68.8991 52.0227L69.9642 50.3299L68.8964 52.021C68.8966 52.0211 68.8968 52.0213 68.897 52.0214Z"
                        fill="#FF1659"
                        stroke="white"
                        stroke-width="4"
                      />
                    </svg>
                  </div>
                  <TypographyLarge>Merry Match!</TypographyLarge>
                </div>
                <Button className="absolute bottom-24 bg-pred-100 font-bold text-pred-600 rounded-full left-1/2 translate-x-[-50%] z-10 hover:bg-pred-200">
                  Start Conversation
                </Button>
              </div>
            </div>
          </div>
          <footer className="h-5 absolute bottom-0 flex">
            <p className="text-pgray-700">Merry limit today</p>
            <p className="text-pred-400 ml-3">2/20</p>
          </footer>
        </section>
        <div className="w-[10%] pl-3 pt-3">
          <h1 className="text-[#191C77] font-bold my-3">Sex you interest</h1>
          <div className="flex flex-col">
            <div className="mb-3">
              <Checkbox
                id="default"
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="default" className="ml-2 text-pgray-700">
                Default
              </label>
            </div>
            <div className="mb-3">
              <Checkbox
                id="female"
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="female" className="ml-2 text-pgray-700">
                Female
              </label>
            </div>
            <div className="mb-3">
              <Checkbox
                id="non-bi"
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="non-bi" className="ml-2 text-pgray-700">
                Non-binary people
              </label>
            </div>
          </div>
          <h1 className="text-[#191C77] font-bold my-3">Age Range</h1>
          <div className="flex flex-col">
            <div className="mb-3">
              <Slider defaultValue={[33]} max={100} step={1} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MatchingPage;

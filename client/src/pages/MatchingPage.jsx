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
import { useState, useEffect, useMemo, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import MatchFunction from "./matching/MatchFunction";

function MatchingPage() {
  return (
    <>
      <NavbarRegistered />
      <section className="h-[900px] flex">
        <aside className="h-full w-[18%] py-7 border-r border-pgray-100">
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
          <MatchFunction />
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

      <Footer />
    </>
  );
}

export default MatchingPage;

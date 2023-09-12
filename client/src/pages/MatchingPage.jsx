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
import MatchCard from "./match-section/MatchCard";
import LeftMatchMenu from "./match-section/LeftMatchMenu";

function MatchingPage() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const [sex, setSex] = useState('');
  // const [minAge, setMinAge] = useState(null);
  // const [maxAge, setMaxAge] = useState(null);
  const handleChange = (event) => {
    setSex(event.target.value)
  }

  const handleHeart = async () => {
    const userData = {
      user_id: user.user_id,
    }
    await axios.post('http://localhost:4000/post', userData);
  }

  const getData = async () => {
    const result = await axios.get(`http://localhost:4000/post?sex=${sex}`);
    setUsers(result.data.result.data);
    console.log(users[0])
  };

  const handleUser = () => {
    if (users.length > 0) {
      setUser(users[currentIndex]);
      setCurrentIndex((prevIndex) => (prevIndex+1) % users.length)
    }
  }
  const handlePrevUser = () => {
    if (users.length > 0) {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = users.length - 1;
      }
      setCurrentIndex(newIndex);
      setUser(users[newIndex]);
    }
  }

  useEffect(() => {
    getData();
  },[]);

  return (
    <div className="h-screen">
      <NavbarRegistered />
      <section className=" h-[91.5%] flex relative">
        <LeftMatchMenu />
        <section className="w-[72%] bg-putility-400 flex justify-center items-center">
          <div className="w-full h-[550px] flex justify-center items-center flex-wrap relative" id="container-card">
            <MatchCard user={user} onClick={handleUser} onClick2={handlePrevUser} />
            {/* {users.map((user) => {
              return (
              <MatchCard user={user} />
              )
            })} */}
          </div>
          <div className=" w-40 absolute left-1/2 bottom-32 z-10 flex justify-around">
                <Button className="w-16 h-16 rounded-2xl bg-orange-500" onClick={handleHeart}>
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
                <Button className="w-16 h-16 rounded-2xl bg-white" onClick={handleHeart}>
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

          {/* <div className=" bg-orange-300" ></div> */}
          <footer className="h-5 absolute bottom-5 flex">
            <p className="text-pgray-700">Merry limit today</p>
            <p className="text-pred-400 ml-3">2/20</p>
          </footer>
        </section>
        <form className="w-[10%] pl-3 pt-3" >
          <h1 className="text-[#191C77] font-bold my-3">Sex you interest</h1>
          <div className="flex flex-col">
            <div className="mb-3">
              <input type="radio"
                name="sex-check" value="Male" onChange={handleChange}
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="default" className="ml-2 text-pgray-700">
                Default
              </label>
            </div>
            <div className="mb-3">
              <input type="radio"
                name="sex-check" value="Female" onChange={handleChange}
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="female" className="ml-2 text-pgray-700">
                Female
              </label>
            </div>
            <div className="mb-3">
              <input type="radio"
                name="sex-check" value="Non-bi" onChange={handleChange}
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
          <button>Button</button>
        </form>
      </section>
      {/* <Footer /> */}
    </div>
  );
}

export default MatchingPage;

{
  /* <div className=" w-40 absolute left-1/2 translate-x-[-50%] -bottom-8 z-10 flex justify-around">
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
              </div> */
}

// <div id="card-matching">
//   <div className="absolute w-full top-1/2 translate-y-[-50%] text-center">
//     <div className="flex justify-center items-center">
//       <svg
//         width="106"
//         height="63"
//         viewBox="0 0 106 63"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M31.6616 52.0214C32.8767 52.7886 34.1163 53.5161 35.3786 54.2029L35.3907 54.2095L35.403 54.216L35.4123 54.2209L35.4459 54.241L35.5053 54.2707C36.118 54.5887 36.7984 54.7542 37.4889 54.7532C37.9968 54.7525 38.4989 54.6617 38.9725 54.4865H39.1165L39.559 54.2209L39.5683 54.216L39.5824 54.2085L39.5964 54.2009C43.8557 51.8717 47.8627 49.1084 51.5534 45.9549L51.5601 45.9492C57.348 40.9598 64.3092 33.0559 64.3092 23.2723V23.2721C64.3089 19.9711 63.2852 16.7514 61.3792 14.0563C59.4732 11.3612 56.7785 9.32323 53.6663 8.22305C50.5541 7.12287 47.1773 7.01457 44.0009 7.91306C41.5598 8.60359 39.3292 9.8627 37.4856 11.574C35.642 9.8627 33.4115 8.60359 30.9704 7.91306C27.794 7.01457 24.4172 7.12287 21.305 8.22305C18.1927 9.32323 15.4981 11.3612 13.5921 14.0563C11.6861 16.7514 10.6624 19.9711 10.6621 23.2721V23.2723C10.6621 33.0561 17.6268 40.9601 23.4108 45.9488L23.4177 45.9547C26.0148 48.1743 28.7701 50.2019 31.6616 52.0214ZM31.6616 52.0214C31.6623 52.0218 31.663 52.0223 31.6637 52.0227L32.7288 50.3299L31.661 52.021C31.6612 52.0211 31.6614 52.0213 31.6616 52.0214Z"
//           fill="#FF1659"
//           stroke="white"
//           stroke-width="4"
//         />
//         <path
//           d="M68.897 52.0214C70.1121 52.7886 71.3517 53.5161 72.614 54.2029L72.6261 54.2095L72.6383 54.216L72.6477 54.2209L72.6812 54.241L72.7407 54.2707C73.3534 54.5887 74.0338 54.7542 74.7243 54.7532C75.2321 54.7525 75.7343 54.6617 76.2078 54.4865H76.3518L76.7943 54.2209L76.8037 54.216L76.8178 54.2085L76.8318 54.2009C81.091 51.8717 85.098 49.1084 88.7888 45.9549L88.7954 45.9492C94.5833 40.9598 101.545 33.0559 101.545 23.2723V23.2721C101.544 19.9711 100.521 16.7514 98.6146 14.0563C96.7085 11.3612 94.0139 9.32323 90.9016 8.22305C87.7894 7.12287 84.4126 7.01457 81.2363 7.91306C78.7951 8.60359 76.5646 9.8627 74.721 11.574C72.8774 9.8627 70.6469 8.60359 68.2057 7.91306C65.0294 7.01457 61.6526 7.12287 58.5403 8.22305C55.4281 9.32323 52.7334 11.3612 50.8274 14.0563C48.9214 16.7514 47.8978 19.9711 47.8975 23.2721V23.2723C47.8975 33.0561 54.8621 40.9601 60.6461 45.9488L60.653 45.9547C63.2502 48.1743 66.0055 50.2019 68.897 52.0214ZM68.897 52.0214C68.8977 52.0218 68.8984 52.0223 68.8991 52.0227L69.9642 50.3299L68.8964 52.021C68.8966 52.0211 68.8968 52.0213 68.897 52.0214Z"
//           fill="#FF1659"
//           stroke="white"
//           stroke-width="4"
//         />
//       </svg>
//     </div>
//     <TypographyLarge>Merry Match!</TypographyLarge>
//   </div>
//   <Button className="absolute bottom-24 bg-pred-100 font-bold text-pred-600 rounded-full left-1/2 translate-x-[-50%] z-10 hover:bg-pred-200">
//     Start Conversation
//   </Button>
// </div>

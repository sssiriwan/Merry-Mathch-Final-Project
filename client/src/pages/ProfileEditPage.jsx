import Footer from "@/components/base/Footer";
import { NavbarRegistered } from "@/components/base/Navbar";
import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";
import {
  TypographyH1,
  TypographySmall,
} from "@/components/base/button/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PreviewCard from "./PreviewCard";

function ProfileEditPage() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false)
  // state สำหรับ update
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [sexId, setSexId] = useState("");
  const [sexPrefer, setSexPrefer] = useState("");
  const [racialPrefer, setRacialPrefer] = useState("");
  const [meetingInterest, setMeetingInterest] = useState("");
  const [aboutMe, setAboutMe] = useState("")

  const handleUpdateProfile = async () => {
    const updatedProfile = {
      fullname,
      username,
      email,
      date_of_birth: dateOfBirth,
      location,
      city,
      sexual_identity: sexId,
      sexual_preference: sexPrefer,
      racial_preference: racialPrefer,
      meeting_interest: meetingInterest,
      about_me: aboutMe
    };
    const result = await axios.put(
      "http://localhost:4000/post/profile",
      updatedProfile
    );
    console.log(result);
    navigate("/matching");
  };

  const getMyProfile = async () => {
    const result = await axios.get("http://localhost:4000/post/profile");
    console.log(result.data.data);
    setFullname(result.data.data.fullname);
    setUsername(result.data.data.username);
    setEmail(result.data.data.email);
    setDateOfBirth(result.data.data.date_of_birth);
    setLocation(result.data.data.location);
    setCity(result.data.data.city);
    setSexId(result.data.data.sexual_identity);
    setSexPrefer(result.data.data.sexual_preference);
    setRacialPrefer(result.data.data.racial_preference);
    setMeetingInterest(result.data.data.meeting_interest);
    setAboutMe(result.data.data.about_me)
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <div className="grid place-items-center">
      <NavbarRegistered />
        { clicked && <PreviewCard />}
      <section className=" w-[930px]">
        <article className="flex items-end justify-between mt-14">
          <div>
            <TypographySmall>PROFILE</TypographySmall>
            <TypographyH1>Let's make profile</TypographyH1>
            <TypographyH1>to let others know you</TypographyH1>
          </div>
          <div className="w-[260px] flex justify-between">
            <ButtonSecondary onClick={() => { setClicked(!clicked) }}>Preview Profile</ButtonSecondary>
            <ButtonDemo onClick={handleUpdateProfile}>
              Update Profile
            </ButtonDemo>
          </div>
        </article>
        <section className="flex flex-col items-center">
          <div className="font-bold text-2xl text-ppurple-500 mt-14 w-full">
            <h1>Basic Information</h1>
          </div>
          <div className="flex my-5">
            <div>
              <Label>
                Name
                <Input
                  className="w-[453px] mb-[40px]"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Jone Snow"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                  value={fullname}
                />
              </Label>

              <Label>
                Location
                <Input
                  className="w-[453px] mb-[40px]"
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Thailand"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  value={location}
                />
              </Label>

              <Label>
                Username
                <Input
                  className="mb-[40px]"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="At least 6 charactor"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Label>
            </div>

            <div className="ml-[24px]">
              <Label>
                Date of birth
                <Input
                  className="w-[453px] mb-[40px]"
                  placeholder="01/01/2022"
                  type="date"
                  id="Date"
                  name="Date"
                  defaultValue="2022-01-01"
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                />
              </Label>

              <Label>
                City
                <Input
                  className="mb-[40px]"
                  type="city"
                  id="city"
                  name="city"
                  placeholder="Bangkok"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Label>

              <Label>
                Email
                <Input
                  className="mb-[40px]"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@website.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Label>
            </div>
          </div>
        </section>

        <section>
          <div className="font-bold text-2xl text-ppurple-500 mt-5">
            <h1>Identities and Interests</h1>
          </div>
          <div className="">
            <div className="flex mt-[24px]">
              <div className="w-[453px]">Sexual identities</div>
              <div className="ml-[24px]">Sexual preferences</div>
            </div>

            <div className="flex">
              <div className="mb-6">
                <select
                  className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  id="SexualIdentities"
                  name="SexualIdentities"
                  onChange={(e) => {
                    setSexId(e.target.value);
                  }}
                  value={sexId}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>

              <div className="ml-[24px]">
                <select
                  className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  id="SexualPreferences"
                  name="SexualPreferences"
                  onChange={(e) => {
                    setSexPrefer(e.target.value);
                  }}
                  value={sexPrefer}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>
            </div>
            {/* เดี๋ยวค่อยมาแก้ UI */}
            <div className="flex mt-[40px]">
              <div className="w-[453px]">Racial preferences</div>
              <div className="ml-[24px]">Meeting interests</div>
            </div>
            <div className="flex">
              <select
                className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                id="RacialPreferences"
                name="RacialPreferences"
                onChange={(e) => {
                  setRacialPrefer(e.target.value);
                }}
                value={racialPrefer}
              >
                <option value="Asian">Asian</option>
                <option value="Caucasoid">Caucasoid</option>
                <option value="Negriod">Negroid</option>
                <option value="Others">Others</option>
              </select>

              <div className="ml-[24px]">
                <select
                  className="border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  id="MeetingInterests"
                  name="MeetingInterests"
                  onChange={(e) => {
                    setMeetingInterest(e.target.value);
                  }}
                  value={meetingInterest}
                >
                  <option value="Friend">Friend</option>
                  <option value="Boyfriend-Girlfriend">
                    Boyfriend / GirlFriend
                  </option>
                  <option value="Casual">Casual</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="">
              {/* <ListText onChange={updateTags} tags={formValues.tags.split(",")} /> */}
            </div>
            <div>
                <div>About Me (Maximum 150 characters)</div>
                <Textarea value={aboutMe} maxlength="150" onChange={(e) => { setAboutMe(e.target.value) }} />
            </div>
          </div>
        </section>

        <section>
          <div className="font-bold text-2xl text-ppurple-500 mt-14">
            <h1>Profile pictures</h1>
          </div>
          <div className="font-[400] text-[16px] text-pgray-800">
            Upload at least photos. {/* {countTags()} */}
          </div>

          <div className="input-container relative">
            <div className="flex mb-[347px]">
              {/* {Object.keys(avatars).map((avatarKey, index) => (
                <div
                  key={avatarKey}
                  className="mr-[24px] relative"
                  draggable="true"
                  onDragStart={(e) => handleDragStartImage(e, avatarKey)}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  data-key={avatarKey}
                >
                  <ProfileImage
                    file={avatars[avatarKey]}
                    onDragStartImage={(e) => handleDragStartImage(e, avatarKey)}
                    onDragEnd={() => {}}
                    onRemoveImage={() => handleRemoveImage(avatarKey)}
                  />
                </div>
              ))} */}

              {/* {[...Array(maxUploads - Object.keys(avatars).length)].map(
                (_, index) => (
                  <label
                    key={index}
                    className={`button-avatar mr-[24px] bg-pgray-200 w-[167px] h-[167px] rounded-[12px] flex flex-col justify-center items-center relative ${
                      Object.keys(avatars).length >= maxUploads ? "hidden" : ""
                    }`}
                  >
                    <div className="text-ppurple-600 text-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M12.5 4.5V19.5M20 12H5"
                          stroke="#7D2262"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-ppurple-600 text-lg">Upload</div>

                    <input
                      //   id={`avatar${index}`}
                      //   name={`avatar${index}`}
                      type="file"
                      onChange=""
                      hidden
                    />
                  </label>
                )
              )} */}
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default ProfileEditPage;

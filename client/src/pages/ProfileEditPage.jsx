import Footer from "@/components/base/Footer";
import { NavbarRegistered } from "@/components/base/Navbar";
import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";
import {
  TypographyH1,
  TypographySmall,
} from "@/components/base/button/Typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PreviewCard from "./PreviewCard";
import "../App.css";

function ProfileEditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [profile, setProfile] = useState({
    user_id: "",
    fullname: "",
    date_of_birth: null,
    location: "",
    city: "",
    sexual_identity: "",
    sexual_preference: "",
    racial_preference: "",
    meeting_interest: "",
    about_me: "",
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatars, setAvatars] = useState({});
  // const [maxTags, setMaxTags] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState({});

  const maxTags = 10; // จำนวนแท็กสูงสุดที่อนุญาต

  const tagKeys = Object.keys(tags);
  const imageKeys = Object.keys(avatars);

  const countTags = () => {
    return maxTags - tags.length;
  };

  // ในส่วนของการลบแท็ก
  const removeTag = (tagToRemove) => {
    const updatedTags = { ...tags };
    delete updatedTags[tagToRemove];
    setTags(updatedTags);
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();

      if (newTag.length > 0 && !tags[newTag]) {
        const updatedTags = { ...tags };
        updatedTags[newTag] = newTag; // ให้ key และ value เป็นค่าเดียวกัน
        setTags(updatedTags);
        setInputValue("");
      }
    }
  };

  const handleRemoveImage = (event, avatarKey) => {
    event.preventDefault();
    const newAvatars = { ...avatars };
    delete newAvatars[avatarKey];
    setAvatars(newAvatars);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      // Append profile data to formData
      formData.append("user_id", profile.user_id);
      formData.append("fullname", profile.fullname);
      formData.append("date_of_birth", profile.date_of_birth);
      formData.append("location", profile.location);
      formData.append("city", profile.city);
      formData.append("sexual_identity", profile.sexual_identity);
      formData.append("sexual_preference", profile.sexual_preference);
      formData.append("racial_preference", profile.racial_preference);
      formData.append("meeting_interest", profile.meeting_interest);
      formData.append("about_me", profile.about_me);

      // Append avatars to formData
      for (const avatarKey in avatars) {
        if (avatars.hasOwnProperty(avatarKey)) {
          formData.append(`avatars`, avatars[avatarKey]);
        }
      }

      // Append tags to formData
      for (const tagKey in tags) {
        if (tags.hasOwnProperty(tagKey)) {
          formData.append(`tags`, tags[tagKey]);
        }
      }

      const result = await axios.put(
        "http://localhost:4000/post/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header
          },
        }
      );

      console.log(result);
    } catch (error) {
      // Handle any errors here
      console.error("Error updating profile:", error);
    }
  };

  const maxUploads = 5;

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newAvatars = { ...avatars };
    for (let i = 0; i < files.length; i++) {
      if (Object.keys(newAvatars).length < maxUploads) {
        const uniqueId = Date.now() + i;
        newAvatars[uniqueId] = files[i];
        // สร้าง URL แบบออบเจกต์สำหรับไฟล์ใหม่
        const objectURL = URL.createObjectURL(files[i]);
        newAvatars[uniqueId].objectURL = objectURL;
      }
    }

    setAvatars(newAvatars);
  };

  const getMyProfile = async () => {
    setIsLoading(true);
    const result = await axios.get("http://localhost:4000/post/profile");
    setIsLoading(false);
    setAvatars(result.data.data.profile_image);
    setTags(result.data.data.hobbies);
    setProfile(result.data.data);
    setUsername(result.data.data.users.username);
    setEmail(result.data.data.users.email);
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <div className="grid place-items-center">
      <NavbarRegistered />
      {!isLoading && (
        <>
          {clicked && (
            <PreviewCard
              setClicked={setClicked}
              clicked={clicked}
              userId={profile.user_id}
            />
          )}
          <section className=" w-[930px]">
            <article className="flex items-end justify-between mt-14">
              <div className="text-pbeige-700">
                <TypographySmall>PROFILE</TypographySmall>
                <TypographyH1>Let's make profile</TypographyH1>
                <TypographyH1>to let others know you</TypographyH1>
              </div>
              <div className="w-[260px] flex justify-between">
                <ButtonSecondary
                  onClick={() => {
                    setClicked(!clicked);
                  }}
                >
                  Preview Profile
                </ButtonSecondary>
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
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          fullname: event.target.value,
                        });
                      }}
                      value={profile.fullname}
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
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          location: event.target.value,
                        });
                      }}
                      value={profile.location}
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
                      onChange={(event) => {
                        setUsername(event.target.value);
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
                      value={profile.date_of_birth}
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          date_of_birth: event.target.value,
                        });
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
                      value={profile.city}
                      onChange={(event) => {
                        setProfile({ ...profile, city: event.target.value });
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
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </Label>
                </div>
              </div>
            </section>

            <section>
              <div className="font-bold text-2xl text-ppurple-500">
                <h1>Identities and Interests</h1>
              </div>
              <div className="mt-8">
                <div className="flex">
                  <div>
                    <label>Sexual Identities</label>
                    <select
                      className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                      id="SexualIdentities"
                      name="SexualIdentities"
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          sexual_identity: event.target.value,
                        });
                      }}
                      value={profile.sexual_identity}
                    >
                      <option disabled>Please choose an option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                    </select>
                  </div>

                  <div className="ml-[24px]">
                    <label>Sexual Preferences</label>
                    <select
                      className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                      id="SexualPreferences"
                      name="SexualPreferences"
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          sexual_preference: event.target.value,
                        });
                      }}
                      value={profile.sexual_preference}
                    >
                      <option disabled>Please choose an option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                    </select>
                  </div>
                </div>
                <div className="flex mt-8">
                  <div>
                    <label>Racial Preferences</label>
                    <select
                      className="border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                      id="RacialPreferences"
                      name="RacialPreferences"
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          racial_preference: event.target.value,
                        });
                      }}
                      value={profile.racial_preference}
                    >
                      <option disabled>Please choose an option</option>
                      <option value="Asian">Asian</option>
                      <option value="Europe">Europe</option>
                      <option value="Africa">Africa</option>
                      <option value="America">America</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="ml-[24px]">
                    <label>Meeting Interests</label>
                    <select
                      className="border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                      id="MeetingInterests"
                      name="MeetingInterests"
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          meeting_interest: event.target.value,
                        });
                      }}
                      value={profile.meeting_interest}
                    >
                      <option disabled>Please choose an option</option>
                      <option value="Friends">Friends</option>
                      <option value="Boyfriend-Girlfriend">
                        Boyfriend / GirlFriend
                      </option>
                      <option value="Casual">Casual</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8">
                  {/* <ListText onChange={updateTags} tags={formValues.tags.split(",")} /> */}
                  <div className="mr-[150px] mb-[40px] mt-[40px]">
                    <div className="content">
                      <p>Hobbies / Interests (Maximum 10)</p>
                      <div className="border border-gray-300 rounded-md p-2 flex flex-wrap w-[930px]">
                        {tagKeys.map((tagKey, index) => {
                          return (
                            tags[tagKey] != null && (
                              <div
                                key={index}
                                className="bg-ppurple-100 text-ppurple-600 rounded-md flex items-center mr-2 mb-2 px-2 py-1"
                              >
                                {tags[tagKey]}
                                <i
                                  onClick={() => removeTag(tagKey)}
                                  className="ml-2 text-ppurple-600 cursor-pointer"
                                >
                                  X
                                </i>
                              </div>
                            )
                          );
                        })}
                        <input
                          id="tags"
                          name="tags"
                          type="text"
                          spellCheck="false"
                          className="flex-1 border-none outline-none p-1"
                          onKeyDown={addTag}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Add a tag"
                        />
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className="mt-8">
                  <label>
                    About Me (Maximum {/*{150-textLength}*/} characters)
                  </label>
                  <Textarea
                    className="resize-none"
                    value={profile.about_me}
                    rows="4"
                    maxlength="150"
                    onChange={(event) => {
                      setProfile({ ...profile, about_me: event.target.value });
                    }}
                  />
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
                <div className="flex mt-5 mb-[200px]">
                  {Object.keys(avatars).map((avatarKey, index) => {
                    const avatar = avatars[avatarKey];
                    return (
                      //avatar != null &&
                      <div
                        key={index}
                        className="mr-[24px] relative"
                        data-key={avatarKey}
                      >
                        <img
                          className="w-40 h-40 object-cover rounded-2xl"
                          src={
                            avatar instanceof Blob
                              ? URL.createObjectURL(avatar)
                              : avatar
                          }
                        />
                        <button
                          className="image-remove-button bg-[#AF2758] text-white rounded-full px-3 py-1 absolute -top-2 -right-2"
                          onClick={(event) =>
                            handleRemoveImage(event, avatarKey)
                          }
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
                  {[...Array(maxUploads - Object.keys(avatars).length)].map(
                    (_, index) => {
                      return (
                        <label
                          key={index}
                          className={`button-avatar mr-[24px] bg-pgray-200 w-[167px] h-[167px] rounded-[12px] flex flex-col justify-center items-center relative `}
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
                            id="avatar"
                            name="avatar"
                            type="file"
                            onChange={handleFileChange}
                            hidden
                          />
                        </label>
                      );
                    }
                  )}
                </div>
              </div>
            </section>
          </section>
        </>
      )}
      {isLoading && (
        <div class="h-[500px] flex items-center">
          <div class="custom-loader"></div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ProfileEditPage;

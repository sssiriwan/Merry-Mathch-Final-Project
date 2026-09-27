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
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import PreviewCard from "./PreviewCard";
import "../App.css";

function ProfileEditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
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
  // รูปโปรไฟล์เรียงตามลำดับที่แสดงผล { id, url, file }
  // file = null สำหรับรูปที่มีอยู่แล้วบน server, มีค่าเมื่อเป็นรูปที่เพิ่งเลือก
  const [images, setImages] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  // const [maxTags, setMaxTags] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState({});

  const maxTags = 10; // จำนวนแท็กสูงสุดที่อนุญาต
  const maxUploads = 5;
  const maxFileSize = 5 * 1024 * 1024;
  const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  // เก็บ object URL ที่สร้างไว้ เพื่อ revoke เมื่อรูปถูกลบหรือออกจากหน้า
  const objectUrlsRef = useRef(new Set());

  const createObjectUrl = (file) => {
    const objectUrl = URL.createObjectURL(file);
    objectUrlsRef.current.add(objectUrl);
    return objectUrl;
  };

  const revokeObjectUrl = (objectUrl) => {
    if (objectUrl && objectUrlsRef.current.has(objectUrl)) {
      URL.revokeObjectURL(objectUrl);
      objectUrlsRef.current.delete(objectUrl);
    }
  };

  useEffect(() => {
    const objectUrls = objectUrlsRef.current;
    return () => {
      objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
      objectUrls.clear();
    };
  }, []);

  const tagKeys = Object.keys(tags);

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

  const handleRemoveImage = (imageId) => {
    const target = images.find((image) => image.id === imageId);
    if (target && target.file) {
      revokeObjectUrl(target.url);
    }
    setImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  const handleUpdateProfile = async () => {
    if (images.length === 0) {
      toast({
        variant: "destructive",
        title: "กรุณาเพิ่มรูปโปรไฟล์",
        description: "ต้องมีรูปภาพอย่างน้อย 1 รูปก่อนบันทึก",
      });
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();

      // Append profile data to formData
      formData.append("user_id", profile.user_id);
      formData.append("fullname", profile.fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("date_of_birth", profile.date_of_birth);
      formData.append("location", profile.location);
      formData.append("city", profile.city);
      formData.append("sexual_identity", profile.sexual_identity);
      formData.append("sexual_preference", profile.sexual_preference);
      formData.append("racial_preference", profile.racial_preference);
      formData.append("meeting_interest", profile.meeting_interest);
      formData.append("about_me", profile.about_me);

      // ส่งลำดับรูปที่ผู้ใช้จัดเรียง เพื่อให้ server เก็บตามลำดับเดียวกัน
      let newFileIndex = 0;
      const imageOrder = images.map((image) => {
        if (image.file) {
          const entry = { type: "new", index: newFileIndex };
          newFileIndex += 1;
          return entry;
        }
        return { type: "keep", url: image.url };
      });
      formData.append("image_order", JSON.stringify(imageOrder));

      // Append เฉพาะไฟล์รูปใหม่ (รูปเดิมส่งเป็น url ใน image_order แล้ว)
      images.forEach((image) => {
        if (image.file) {
          formData.append("avatars", image.file, image.file.name);
        }
      });

      // Append tags to formData
      for (const tagKey in tags) {
        if (Object.prototype.hasOwnProperty.call(tags, tagKey)) {
          formData.append(`tags`, tags[tagKey]);
        }
      }

      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/post/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header
          },
        }
      );

      console.log(result);
      // ดึงข้อมูลโปรไฟล์ล่าสุดมาแสดงผลใหม่ เพื่อให้ได้ url จริงจาก storage
      // ถ้าดึงไม่สำเร็จก็ถือว่าการอัปเดตสำเร็จแล้ว ไม่ต้องแจ้ง error
      try {
        await getMyProfile({ silent: true });
      } catch (refreshError) {
        console.error("Error refreshing profile:", refreshError);
      }
      toast({
        variant: "success",
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      // Handle any errors here
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description:
          error?.response?.data?.error ||
          "Could not update your profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (incoming.length === 0) {
      return;
    }

    const notImage = incoming.filter(
      (file) => !acceptedTypes.includes(file.type)
    );
    const tooLarge = incoming.filter(
      (file) =>
        acceptedTypes.includes(file.type) && file.size > maxFileSize
    );
    const valid = incoming.filter(
      (file) =>
        acceptedTypes.includes(file.type) && file.size <= maxFileSize
    );

    if (notImage.length > 0) {
      toast({
        variant: "destructive",
        title: "รองรับเฉพาะไฟล์รูปภาพ",
        description: "กรุณาเลือกไฟล์ JPG, PNG, WEBP หรือ GIF",
      });
    }
    if (tooLarge.length > 0) {
      toast({
        variant: "destructive",
        title: "ไฟล์รูปใหญ่เกินไป",
        description: "ขนาดไฟล์ต้องไม่เกิน 5 MB ต่อรูป",
      });
    }

    const room = maxUploads - images.length;
    if (room <= 0) {
      toast({
        variant: "destructive",
        title: "อัปโหลดได้สูงสุด 5 รูป",
        description: "ลบรูปเดิมออกก่อนเพื่อเพิ่มรูปใหม่",
      });
      return;
    }
    if (valid.length === 0) {
      return;
    }

    const added = valid.slice(0, room);
    if (valid.length > room) {
      toast({
        variant: "destructive",
        title: `เพิ่มได้อีก ${room} รูป`,
        description: "เนื่องจากจำกัดไว้ที่ 5 รูปต่อโปรไฟล์",
      });
    }

    setImages((prev) => [
      ...prev,
      ...added.map((file) => ({
        id: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: createObjectUrl(file),
        file,
      })),
    ]);
  };

  const handleFileChange = (event) => {
    addFiles(event.target.files);
    // รีเซ็ตค่าเพื่อให้เลือกไฟล์เดิมซ้ำได้
    event.target.value = "";
  };

  const handleDropFiles = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length > 0) {
      addFiles(e.dataTransfer.files);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const getMyProfile = async ({ silent = false } = {}) => {
    if (!silent) {
      setIsLoading(true);
    }
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/post/profile`);
    if (!silent) {
      setIsLoading(false);
    }
    const profileImage = result.data.data.profile_image || {};
    setImages(
      ["img_1", "img_2", "img_3", "img_4", "img_5"]
        .map((slot) => profileImage[slot])
        .filter((url) => typeof url === "string" && url.length > 0)
        .map((url, index) => ({
          id: `existing-${index}-${url}`,
          url,
          file: null,
        }))
    );
    setTags(result.data.data.hobbies);
    setProfile(result.data.data);
    setUsername(result.data.data.users.username);
    setEmail(result.data.data.users.email);
  };
  useEffect(() => {
    getMyProfile();
  }, []);


  const handleDragStartImage = (index) => (e) => {
    e.stopPropagation();
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Firefox ต้องมีข้อมูลใน dataTransfer ถึงจะเริ่ม drag ได้
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOverImage = (index) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (index !== dragIndex) {
      setDragOverIndex(index);
    }
  };

  const handleDropImage = (index) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const raw = dragIndex ?? e.dataTransfer.getData("text/plain");
    const from = Number(raw);
    setDragIndex(null);
    setDragOverIndex(null);
    if (!Number.isInteger(from) || from === index || from < 0) {
      return;
    }
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
  };

  const handleDragEndImage = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

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
                <TypographyH1>Let&apos;s make profile</TypographyH1>
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
                <ButtonDemo onClick={handleUpdateProfile} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Update Profile"}
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
                      <p>Hobbies / Interests (Maximum {maxTags})</p>
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
              <div className="flex items-center justify-between mt-14">
                <div className="font-bold text-2xl text-ppurple-500">
                  <h1>Profile pictures</h1>
                </div>
                <div className="text-pgray-800">
                  {images.length}/{maxUploads} photos
                </div>
              </div>
              <div className="font-[400] text-[16px] text-pgray-800">
                Upload at least 1 photo (max {maxUploads}). The first photo is
                your main photo. Drag to reorder or drop files here.
              </div>

              <div className="input-container relative">
                <div
                  className="flex flex-nowrap mt-5 mb-[200px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDropFiles}
                >
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`mr-[24px] relative w-40 h-40 shrink-0 transition-opacity ${
                        dragIndex === index ? "opacity-40" : "opacity-100"
                      } ${
                        dragOverIndex === index
                          ? "ring-4 ring-ppurple-300 rounded-2xl"
                          : ""
                      }`}
                      draggable
                      onDragStart={handleDragStartImage(index)}
                      onDragOver={handleDragOverImage(index)}
                      onDrop={handleDropImage(index)}
                      onDragEnd={handleDragEndImage}
                    >
                      <img
                        className="w-40 h-40 object-cover rounded-2xl pointer-events-none"
                        src={image.url}
                        alt={`Profile photo ${index + 1}`}
                        draggable={false}
                      />
                      {index === 0 && (
                        <span className="absolute left-2 top-2 bg-ppurple-600 text-white text-xs px-2 py-0.5 rounded-full">
                          Main
                        </span>
                      )}
                      {image.file && (
                        <span className="absolute left-2 bottom-2 bg-pgreen-500 text-white text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label={`Remove profile photo ${index + 1}`}
                        className="image-remove-button bg-[#AF2758] text-white rounded-full px-3 py-1 absolute -top-2 -right-2"
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                  {[...Array(Math.max(maxUploads - images.length, 0))].map(
                    (_, index) => {
                      return (
                        <label
                          key={index}
                          className="button-avatar mr-[24px] shrink-0 bg-pgray-200 w-40 h-40 rounded-[12px] flex flex-col justify-center items-center relative cursor-pointer hover:bg-pgray-300"
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
                            id={`avatar-${index}`}
                            name="avatar"
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            multiple
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
        <div className="h-[500px] flex items-center">
          <div className="custom-loader"></div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ProfileEditPage;

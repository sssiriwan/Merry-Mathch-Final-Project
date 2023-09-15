import React from "react";
import ProfileImage from "./ProfileImage";
import { createClient } from "@supabase/supabase-js";

function ProfilePictures({ avatars, updateAvatars, test, setTest }) {
  const supabase = createClient()
  const maxUploads = 5;

  const countTags = () => {
    return maxUploads - Object.keys(avatars).length;
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const newAvatars = { ...avatars };

    for (let i = 0; i < files.length; i++) {
      if (Object.keys(newAvatars).length < maxUploads) {
        const uniqueId = Date.now() + i;
        newAvatars[uniqueId] = files[i];
      }
    }

    updateAvatars(newAvatars); // ขอคอมเม้นก่อน

    console.log(files)
    console.log(newAvatars)
    let urlArr = []
    
    //Upload รูปด้วย loop
    for (let i=0; i<Object.keys(newAvatars).length; i++) {
      await supabase.storage.from('avatarImg').upload( Object.keys(newAvatars)[i], files[0]);
      urlArr.push(`https://pauqbkgvjpahoowveuka.supabase.co/storage/v1/object/public/avatarImg/${Object.keys(newAvatars)[i]}`)
    }

    // // Upload รูปที่่ 1
    // const {data1, error1} = await supabase.storage.from('avatarImg').upload( Object.keys(newAvatars)[0] ,files[0]);
    console.log(urlArr)
    setTest(urlArr)
  };

  const handleRemoveImage = (avatarKey) => {
    const newAvatars = { ...avatars };
    delete newAvatars[avatarKey];
    updateAvatars(newAvatars);
  };

  const handleDragStartImage = (e, avatarKey) => {
    e.dataTransfer.setData("text/plain", avatarKey);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedAvatarKey = e.dataTransfer.getData("text/plain");
    const targetAvatarKey = e.currentTarget.getAttribute("data-key");

    const newAvatars = { ...avatars };
    const droppedFile = newAvatars[droppedAvatarKey];

    newAvatars[droppedAvatarKey] = avatars[targetAvatarKey];
    newAvatars[targetAvatarKey] = droppedFile;

    updateAvatars(newAvatars);
  };

  return (
    <>
      <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
        <h1>Profile pictures</h1>
      </div>
      <div className="font-[400] text-[16px] text-pgray-800">
        Upload at least {countTags()} photos.
      </div>

      <div className="input-container relative">
        <div className="flex mb-[347px]">
          {Object.keys(avatars).map((avatarKey, index) => (
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
          ))}

          {[...Array(maxUploads - Object.keys(avatars).length)].map(
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
                  id={`avatar${index}`}
                  name={`avatar${index}`}
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePictures;

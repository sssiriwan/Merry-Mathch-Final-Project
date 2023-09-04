import React, { useState } from "react";

function ProfilePictures({ formValues, onChange }) {
  const [avatars, setAvatars] = useState({});
  const maxUploads = 5;

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newAvatars = { ...avatars };

    for (let i = 0; i < files.length; i++) {
      if (Object.keys(newAvatars).length < maxUploads) {
        const uniqueId = Date.now() + i;
        newAvatars[uniqueId] = files[i];
      }
    }

    setAvatars(newAvatars);
  };

  const handleRemoveImage = (event, avatarKey) => {
    event.preventDefault();
    const newAvatars = { ...avatars };
    delete newAvatars[avatarKey];
    setAvatars(newAvatars);
  };

  return (
    <>
      <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
        <h1>Basic Information</h1>
      </div>
      <div className="font-[400] text-[16px] text-pgray-800">
        Upload at least 2 photos (up to 5)
      </div>

      <div className="input-container relative">
        <div className="flex mb-[347px]">
          {Object.keys(avatars).map((avatarKey) => {
            const file = avatars[avatarKey];
            return (
              <div key={avatarKey} className="mr-[24px] relative">
                <img
                  className="image-preview"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
                <button
                  className="image-remove-button bg-[#AF2758] text-white rounded-full p-2 absolute top-0 right-0"
                  onClick={(event) => handleRemoveImage(event, avatarKey)}
                >
                  x
                </button>
              </div>
            );
          })}

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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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

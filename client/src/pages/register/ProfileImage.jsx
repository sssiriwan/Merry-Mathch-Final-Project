import React from "react";

function ProfileImage({ file, onDragStartImage, onDragEnd, onRemoveImage }) {
  return (
    <div
      className="mr-[24px] relative"
      draggable="true"
      onDragStart={(e) => onDragStartImage(e)}
      onDragEnd={() => onDragEnd()}
    >
      <img
        className=" rounded-[12px]"
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
      <button
        className="image-remove-button bg-[#AF2758] text-white rounded-full h-10 w-10 p-2 absolute top-0 right-0"
        onClick={() => onRemoveImage()}
      >
        x
      </button>
    </div>
  );
}

export default ProfileImage;

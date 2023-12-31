import React, { useState } from "react";

const ListText = ({ onChange, tags }) => {
  const [maxTags, setMaxTags] = useState(10);
  //   const [tags, setTags] = useState(["Top", "Unique", "Coding"]);
  const [inputValue, setInputValue] = useState("");

  const countTags = () => {
    return maxTags - tags.length;
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(updatedTags);
  };
  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTags = e.target.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0 && !tags.includes(tag))
        .slice(0, maxTags - tags.length);

      if (newTags.length > 0) {
        const updatedTags = [...tags, ...newTags];
        onChange(updatedTags);
        setInputValue(""); // ตั้งค่า inputValue เป็นค่าว่างหลังจากเพิ่ม tags สำเร็จ
      }
    }
  };

  return (
    <div className="mb-[223px] mt-[40px]">
      <div className="content">
        <p className="text-base font-semibold">
          Hobbies / Interests (Maximum 10)
        </p>
        <div className="border border-gray-300 rounded-md p-2 flex flex-wrap w-[930px]">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-ppurple-100 text-ppurple-600 rounded-md  flex items-center mr-2 mb-2 px-2 py-1 "
            >
              {tag}
              <i
                onClick={() => removeTag(tag)}
                className="ml-2 text-ppurple-600 cursor-pointer "
              >
                X
              </i>
            </div>
          ))}
          <input
            id="tags"
            name="tags"
            type="text"
            spellCheck="false"
            className="flex-1 border-none outline-none p-1"
            onKeyUp={addTag}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a tag"
          />
        </div>
      </div>
      <div className="details flex justify-between">
        <p className="text-base">
          <span className="font-bold">{countTags()}</span> tags are remaining
        </p>
      </div>
    </div>
  );
};

export default ListText;

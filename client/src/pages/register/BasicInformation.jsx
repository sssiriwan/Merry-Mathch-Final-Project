import React from "react";
import { Input } from "@/components/ui/input";

function BasicInformation({ formValues, onChange }) {
  return (
    <>
      <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
        <h1>Basic Information</h1>
      </div>
      <div className="font-[700] text-[24px] text-ppurple-500">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          onChange={onChange}
          value={formValues.name}
        />
      </div>
    </>
  );
}

export default BasicInformation;

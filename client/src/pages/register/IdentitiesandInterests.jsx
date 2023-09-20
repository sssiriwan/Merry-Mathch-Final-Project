import React from "react";

import ListText from "./text";

function Identities({ formValues, onChange, updateTags }) {
  return (
    <>
      <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
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
              onChange={onChange}
              value={formValues.SexualIdentities}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="ml-[24px]">
            <select
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              id="SexualPreferences"
              name="SexualPreferences"
              onChange={onChange}
              value={formValues.SexualPreferences}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex mt-[40px]">
          <div className="w-[453px]">Racial preferences</div>
          <div className="ml-[24px]">Meeting interests</div>
        </div>

        <div className="flex">
          <select
            className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            id="RacialPreferences"
            name="RacialPreferences"
            onChange={onChange}
            value={formValues.RacialPreferences}
          >
            <option value="">Select...</option>
            <option value="male">Asian</option>
            <option value="female">Europe</option>
            <option value="other">Africa</option>
            <option value="other">America</option>
            <option value="other">Other</option>
          </select>

          <div className="ml-[24px]">
            <select
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              id="MeetingInterests"
              name="MeetingInterests"
              onChange={onChange}
              value={formValues.MeetingInterests}
            >
              <option value="">Select...</option>
              <option value="male">Friend</option>
              <option value="female">Boyfriend/Grilfriend</option>
              <option value="other">Casual</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="">
          <ListText onChange={updateTags} tags={formValues.tags.split(",")} />
        </div>
      </div>
    </>
  );
}

export default Identities;

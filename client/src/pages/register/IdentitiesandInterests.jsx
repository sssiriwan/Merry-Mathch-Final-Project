import React, { useContext } from "react";
import ValindateContext from "./valindatecontext/Valindatecontext";

import ListText from "./text";

function Identities({ formValues, onChange, updateTags }) {
  const { errorSexIden, errorSexPrefer, errorRacialPrefer, errorMeetingInter } =
    useContext(ValindateContext);

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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
            </select>
            {errorSexIden && <p className=" text-red-600">{errorSexIden}</p>}
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
            </select>
            {errorSexPrefer && (
              <p className=" text-red-600">{errorSexPrefer}</p>
            )}
          </div>
        </div>
        <div className="flex mt-[40px]">
          <div className="w-[453px]">Racial preferences</div>
          <div className="ml-[24px]">Meeting interests</div>
        </div>

        <div className="flex">
          <div>
            <select
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              id="RacialPreferences"
              name="RacialPreferences"
              onChange={onChange}
              value={formValues.RacialPreferences}
            >
              <option value="">Select...</option>
              <option value="Asian">Asian</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Other">Other</option>
            </select>
            {errorRacialPrefer && (
              <p className=" text-red-600">{errorRacialPrefer}</p>
            )}
          </div>

          <div className="ml-[24px]">
            <select
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              id="MeetingInterests"
              name="MeetingInterests"
              onChange={onChange}
              value={formValues.MeetingInterests}
            >
              <option value="">Select...</option>
              <option value="Male">Friend</option>
              <option value="Female">Boyfriend/Grilfriend</option>
              <option value="Casual">Casual</option>
              <option value="Other">Other</option>
            </select>
            {errorMeetingInter && (
              <p className=" text-red-600">{errorMeetingInter}</p>
            )}
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

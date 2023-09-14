import React, { useContext } from "react";
import FormContext from "@/formContext/form.context";

import App1 from "./text";

export const Pg2 = () => {
  const {
    gender,
    setGender,
    sexualPreferences,
    setSexualPreferences,
    racial,
    setRacial,
    meeting,
    setMeeting,
  } = useContext(FormContext);

  return (
    <form>
      <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
        <h1>Identities and Interests</h1>
      </div>
      <div className="flex">
        <div>
          <div>
            <div>Sexual identities</div>
            <select
              id="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <div>Racial preferences</div>
            <select
              id="racial"
              value={racial}
              onChange={(e) => {
                setRacial(e.target.value);
              }}
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select...</option>
              <option value="Asian">Asian</option>
              <option value="Europe">Europe</option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <div>Sexual preferences</div>
            <select
              id="sexualPreferences"
              value={sexualPreferences}
              onChange={(e) => {
                setSexualPreferences(e.target.value);
              }}
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <div>Meeting interests</div>
            <select
              id="meeting"
              value={meeting}
              onChange={(e) => {
                setMeeting(e.target.value);
              }}
              className="  border rounded w-[453px] py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select...</option>
              <option value="Friend">Friend</option>
              <option value="Boyfriend/Grilfriend">Boyfriend/Grilfriend</option>
              <option value="Casual">Casual</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <App1 />
      </div>
    </form>
  );
};

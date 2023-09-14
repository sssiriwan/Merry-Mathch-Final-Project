import React, { useState } from "react";
import { Pg1 } from "./pg1.form";
import { Pg2 } from "./pg2.form";
import { Pg3 } from "./pg3.form";
import { useContext } from "react";
import FormContext from "@/formContext/form.context";
import { useAuth } from "@/contexts/authentication";

function RegisterPage() {
  const [pgNo, setPgNo] = useState(1);
  const {
    username,
    fullname,
    location,
    dateBirth,
    city,
    email,
    gender,
    sexualPreferences,
    confirmPassword,
    racial,
    meeting,
    tags,
    avatars,
    password,
  } = useContext(FormContext);

  const { register } = useAuth();

  const handleNext = () => {
    if (pgNo < 3) {
      setPgNo(pgNo + 1);
    }
  };

  const handlePrev = () => {
    if (pgNo > 1) {
      setPgNo(pgNo - 1);
    }
  };

  const handleSubmit = (event) => {
    // Handle form submission here
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("location", location);
    formData.append("dateBirth", dateBirth);
    formData.append("city", city);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("sexualPreferences", sexualPreferences);
    formData.append("confirmPassword", confirmPassword);
    formData.append("racial", racial);
    formData.append("meeting", meeting);
    formData.append("tags", tags);
    formData.append("password", password);

    for (let avatarKey in avatars) {
      formData.append("avatar", avatars[avatarKey]);
    }

    register(formData);
    console.log(formData);
  };

  const formLength = 3; // Set the total number of form steps

  return (
    <div className="container">
      <center className="mt-4">
        <h3>Multi step login</h3>
      </center>
      <div>
        <div className="flex ml-[250px]">
          {pgNo === 1 ? (
            <button
              onClick={() => setPgNo(1)}
              className={`mr-3 ml-1 border border-ppurple-500 rounded-2xl w-[246px] h-[80px] flex justify-left items-center bg-white`}
            >
              <div className="bg-pgray-200 text-ppurple-500 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                1
              </div>
              <div className="text-left ml-[16px]">
                <div className="text-pgray-700">
                  Step {pgNo}/{formLength}
                </div>
                <div className="font-[800] text-ppurple-500 text-[16px]">
                  Basic Information
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setPgNo(1)}
              className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
            >
              <div className="bg-pgray-200 text-pgray-600 font-[700] text-[24px]  h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                1
              </div>
            </button>
          )}

          {pgNo === 2 ? (
            <button
              onClick={() => setPgNo(2)}
              className="mr-3 ml-1 border border-ppurple-500 rounded-2xl w-[288px] h-[80px] flex justify-left items-center"
            >
              <div className="bg-pgray-200 text-ppurple-500 font-[700] text-[24px]  h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                2
              </div>

              <div className="text-left ml-[16px]">
                <div className="text-pgray-700">
                  Step {pgNo}/{formLength}
                </div>
                <div className="font-[800] text-ppurple-500 text-[16px]">
                  Identities and Interests
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setPgNo(2)}
              className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
            >
              <div className="bg-pgray-200 text-pgray-600 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                2
              </div>
            </button>
          )}

          {pgNo === 3 ? (
            <button
              onClick={() => setPgNo(3)}
              className="bg-white ml-1 border border-ppurple-500 rounded-2xl w-[225px] h-[80px] flex justify-left items-center"
            >
              <div className="bg-pgray-200 text-ppurple-500 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                3
              </div>
              <div className="text-left ml-[16px]">
                <div className="text-pgray-700">
                  Step {pgNo}/{formLength}
                </div>
                <div className="font-[800] text-ppurple-500 text-[16px]">
                  Upload Photos
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setPgNo(3)}
              className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
            >
              <div className="bg-pgray-200 text-pgray-600 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                3
              </div>
            </button>
          )}
        </div>

        {pgNo === 1 ? <Pg1 /> : pgNo === 2 ? <Pg2 /> : <Pg3 />}

        {/* Include the FooterSection component */}

        <div className="flex bg-white border border-pgray-300 h-[112px] justify-between items-center px-4">
          <div>
            {pgNo}/{formLength}
          </div>
          <div className="flex space-x-4">
            {pgNo > 0 && (
              <button
                onClick={handlePrev}
                className="flex items-center text-[16px] font-[700] text-pred-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12.5275 7.33665H5.08079L8.33412 4.08332C8.59412 3.82332 8.59412 3.39665 8.33412 3.13665C8.07412 2.87665 7.65412 2.87665 7.39412 3.13665L3.00079 7.52998C2.74079 7.78998 2.74079 8.20998 3.00079 8.46998L7.39412 12.8633C7.65412 13.1233 8.07412 13.1233 8.33412 12.8633C8.59412 12.6033 8.59412 12.1833 8.33412 11.9233L5.08079 8.66998H12.5275C12.8941 8.66998 13.1941 8.36998 13.1941 8.00332C13.1941 7.63665 12.8941 7.33665 12.5275 7.33665Z"
                    fill="#C70039"
                  />
                </svg>
                Back
              </button>
            )}
            <button
              onClick={pgNo < formLength ? handleNext : handleSubmit}
              className="bg-pred-500 text-white h-[48px] w-[150px] rounded-[99px] text-[16px] font-[700]"
            >
              {pgNo < formLength ? "Next step" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

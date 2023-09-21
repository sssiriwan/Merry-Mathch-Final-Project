import React, { useState, useContext } from "react";
import Identities from "./IdentitiesandInterests";
import BasicInformation from "./BasicInformation";
import ProfilePictures from "./ProfilePictures";
import FooterSection from "./Footer";
import Navbar from "@/components/base/Navbar";
import { useAuth } from "@/contexts/authentication";
import { useNavigate } from "react-router-dom";
import ValindateContext from "./valindatecontext/Valindatecontext";

function Form() {
  const formList = ["BasicInformation", "Identities", "ProfilePictures"];

  const {
    setErrorDate,
    setErrorUsername,
    setErrorLocation,
    setErrorName,
    setErrorEmail,
    setErrorPasswordConfirm,
    setErrorPassword,
    setErrorCity,

    setErrorSexIden,
    setErrorSexPrefer,
    setErrorRacialPrefer,
    setErrorMeetingInter,

    setErrorImage,
  } = useContext(ValindateContext);

  const formLength = formList.length;

  const [page, setPage] = useState(0);
  const [avatars, setAvatars] = useState({});

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newAvatars = { ...avatars };

    for (let i = 0; i < files.length; i++) {
      if (Object.keys(newAvatars).length < maxUploads) {
        const uniqueId = Date.now() + i;
        newAvatars[uniqueId] = files[i];
      }
    }

    updateAvatars(newAvatars); // เรียกใช้ฟังก์ชันเพื่ออัปเดต avatars ใน Form
  };

  const updateAvatars = (newAvatars) => {
    setAvatars(newAvatars);
  };

  const handlePrev = () => {
    setPage(page === 0 ? formLength - 1 : page - 1);
  };

  async function handleNext(event) {
    event.preventDefault();

    let isValid = true;

    // Common validations for all pages
    if (values.name.trim() === "") {
      setErrorName("Please enter your name.");
      isValid = false;
    } else {
      setErrorName("");
    }

    if (values.location.trim() === "") {
      setErrorLocation("Please enter your location.");
      isValid = false;
    } else {
      setErrorLocation("");
    }

    if (values.username.trim() === "") {
      setErrorUsername("Please enter your username.");
      isValid = false;
    } else {
      setErrorUsername("");
      if (values.username.length < 6) {
        setErrorUsername("Username must be at least 6 characters long.");
        isValid = false;
      }
    }

    if (!values.email) {
      setErrorEmail("Please enter your email address");
      isValid = false;
    } else if (!values.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setErrorEmail("Please enter a valid email address");
      isValid = false;
    } else {
      setErrorEmail("");
    }

    if (values.password.length < 7) {
      setErrorPassword("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setErrorPassword("");
    }

    if (values.password !== values.ConfirmPassword) {
      setErrorPasswordConfirm("Passwords don't match");
      isValid = false;
    } else {
      setErrorPasswordConfirm("");
    }

    if (values.city.trim() === "") {
      setErrorCity("Please enter your city.");
      isValid = false;
    } else {
      setErrorCity("");
    }

    if (!values.Date) {
      setErrorDate("Please select your date of birth.");
      isValid = false;
    } else {
      const birthDate = new Date(values.Date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        setErrorDate("You must be at least 18 years old.");
        isValid = false;
      } else {
        setErrorDate("");
      }
    }

    // Page-specific validations
    if (page === 1) {
      if (values.SexualIdentities.trim() === "") {
        setErrorSexIden("Please select your sexual identities.");
        isValid = false;
      } else {
        setErrorSexIden("");
      }

      if (values.SexualPreferences.trim() === "") {
        setErrorSexPrefer("Please select your sexual preferences.");
        isValid = false;
      } else {
        setErrorSexPrefer("");
      }

      if (values.MeetingInterests.trim() === "") {
        setErrorMeetingInter("Please select your meeting interests.");
        isValid = false;
      } else {
        setErrorMeetingInter("");
      }

      if (values.RacialPreferences.trim() === "") {
        setErrorRacialPrefer("Please enter your racial preferences.");
        isValid = false;
      } else {
        setErrorRacialPrefer("");
      }
    }

    if (isValid) {
      setPage(page + 1); // Move to the next page only if everything is valid
    }
  }

  const initialValues = {
    name: "",
    location: "",
    username: "",
    password: "",
    Date: "",
    email: "",
    city: "",
    ConfirmPassword: "",
    SexualIdentities: "",
    SexualPreferences: "",
    RacialPreferences: "",
    MeetingInterests: "",
    tags: "Music",
  };

  const [values, setValues] = useState(initialValues);

  const updateTags = (updatedTags) => {
    setValues({ ...values, tags: updatedTags.join(", ") }); // รวม tags ใหม่เป็น string และอัปเดตใน initialValues
  };

  const handleForms = () => {
    switch (page) {
      case 0: {
        return (
          <div>
            <BasicInformation
              formValues={values}
              onChange={onChange}
              handleNext={handleNext}
            ></BasicInformation>
          </div>
        );
      }
      case 1: {
        return (
          <Identities
            formValues={values}
            onChange={onChange}
            updateTags={updateTags}
          />
        );
      }
      case 2: {
        return (
          <ProfilePictures
            formValues={values}
            onChange={onChange}
            avatars={avatars}
            updateAvatars={updateAvatars}
          ></ProfilePictures>
        );
      }
      default:
        return null;
    }
  };

  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = () => {
    const updatedValues = { ...values, avatars };
    // สร้าง FormData
    const formData = new FormData();

    // Check if at least one image is uploaded
    if (Object.keys(avatars).length < 1) {
      setErrorImage("Please upload at least one image.");
      return; // Prevent further processing or form submission
    } else {
      setErrorImage(""); // Reset the error message if images are uploaded
    }

    formData.append("fullname", values.name);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("email", values.email);
    formData.append("date_of_birth", values.Date);
    formData.append("tags", values.tags);
    formData.append("location", values.location);
    formData.append("city", values.city);
    formData.append("sexual_identity", values.SexualIdentities);
    formData.append("sexual_preference", values.SexualPreferences);
    formData.append("meeting_interest", values.MeetingInterests);
    formData.append("racial_preference", values.RacialPreferences);
    for (let avatarKey in avatars) {
      formData.append("avatar", avatars[avatarKey]);
    }
    register(formData);
    console.log("Submitting form data:", updatedValues);
    navigate("/");
  };

  const setForm = (formName) => {
    switch (formName) {
      case "BasicInformation": {
        return setPage(0);
      }
      case "Identities": {
        return setPage(1);
      }
      case "ProfilePictures": {
        return setPage(2);
      }
      default:
        setPage(0);
    }
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="bg-putility-500">
        <div className="ml-[255px] mr-[255px]">
          <div className="text-pbeige-700 text-[14px]">REGISTER</div>
          <div className="text-[46px] font-[800] text-ppurple-500">
            Join us and start
          </div>

          <div className="button-box text-right flex ">
            <div className="text-[46px] font-[800] text-ppurple-500">
              matching
            </div>

            <div className="flex ml-[250px]">
              {page === 0 ? ( // ตรวจสอบว่าอยู่หน้า BasicInformation หรือไม่
                <button
                  onClick={() => setForm("BasicInformation")}
                  className={`mr-3 ml-1 border border-ppurple-500 rounded-2xl w-[246px] h-[80px] flex justify-left items-center bg-white`}
                >
                  <div className="bg-pgray-200 text-ppurple-500 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    1
                  </div>
                  <div className="text-left ml-[16px]">
                    <div className="text-pgray-700">Step 1/3</div>
                    <div className="font-[800] text-ppurple-500 text-[16px]">
                      Basic Information
                    </div>
                  </div>
                </button>
              ) : (
                // ถ้าไม่ใช่หน้า BasicInformation ให้แสดงปุ่มแบบที่ 2
                <button
                  onClick={() => setForm("BasicInformation")}
                  className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 text-pgray-600 font-[700] text-[24px]  h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    1
                  </div>
                </button>
              )}

              {page === 1 ? (
                <button
                  onClick={() => setForm("Identities")}
                  className="mr-3 ml-1 border border-ppurple-500 rounded-2xl w-[288px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 text-ppurple-500 font-[700] text-[24px]  h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    2
                  </div>

                  <div className="text-left ml-[16px]">
                    <div className="text-pgray-700">Step 2/3</div>
                    <div className="font-[800] text-ppurple-500 text-[16px]">
                      Identities and Interests
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={
                    page === 2 ? () => setForm("Identities") : handleNext
                  }
                  className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 text-pgray-600 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    2
                  </div>
                </button>
              )}

              {page === 2 ? (
                <button
                  onClick={() => setForm("ProfilePictures")}
                  className="bg-white ml-1 border border-ppurple-500 rounded-2xl w-[225px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 text-ppurple-500 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    3
                  </div>
                  <div className="text-left ml-[16px]">
                    <div className="text-pgray-700">Step 3/3</div>
                    <div className="font-[800] text-ppurple-500 text-[16px]">
                      Upload Photos
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 text-pgray-600 font-[700] text-[24px] h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    3
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="ml-[255px] mr-[255px]">
          <div className="flex-1">{handleForms()}</div>
        </div>
      </div>

      <FooterSection
        page={page}
        formLength={formLength}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Form;

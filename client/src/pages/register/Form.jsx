import React, { useState } from "react";
import Identities from "./IdentitiesandInterests";
import BasicInformation from "./BasicInformation";
import ProfilePictures from "./ProfilePictures";
import FooterSection from "./Footer";
import Navbar from "@/components/base/Navbar";

function Form() {
  const formList = ["BasicInformation", "Identities", "ProfilePictures"];

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

  const handleNext = () => {
    if (page === formLength - 1) {
      handleSubmit(); // บันทึกข้อมูลหลังคลิก Next ที่หน้า ProfilePictures
      return;
    }
    setPage(page + 1);
  };

  const initialValues = {
    name: "",
    location: "",
    SexualIdentities: "0",
    SexualPreferences: "1",
    RacialPreferences: "0",
    MeetingInterests: "0",
    tags: "Music",

    username: "",
    password: "",
    Date: "",
    email: "",
    city: "",
    ConfirmPassword: "",

    img: "",
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
            ></BasicInformation>
          </div>
        );
      }
      case 1: {
        return (
          <Identities
            formValues={values}
            onChange={onChange}
            option={states}
            updateTags={updateTags}
            option1={states1}
            option2={states2}
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

  const states = [
    { id: "0", name: "Male" },
    { id: "1", name: "Female" },
    { id: "2", name: "Non-Binary" },
  ];

  const states1 = [
    { id: "0", name: "Asian" },
    { id: "1", name: "Caucasoid" },
    { id: "2", name: "Negriod" },
    { id: "3", name: "Others" },
  ];

  const states2 = [
    { id: "0", name: "Friend" },
    { id: "1", name: "Boyfriend/Grilfriend" },
    { id: "2", name: "Casual" },
    { id: "3", name: "Others" },
  ];

  const handleSubmit = () => {
    console.log("Submitting form data:", values);
    // ทำการส่งข้อมูลไปยังเซิร์ฟเวอร์หรือประมวลผลข้อมูลตามที่คุณต้องการ
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
                  <div className="bg-pgray-200 h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
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
                  <div className="bg-pgray-200 h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    1
                  </div>
                </button>
              )}

              {page === 1 ? (
                <button
                  onClick={() => setForm("Identities")}
                  className="mr-3 ml-1 border border-ppurple-500 rounded-2xl w-[288px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
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
                  onClick={() => setForm("Identities")}
                  className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
                    2
                  </div>
                </button>
              )}

              {page === 2 ? (
                <button
                  onClick={() => setForm("ProfilePictures")}
                  className="bg-white ml-1 border border-ppurple-500 rounded-2xl w-[225px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
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
                  onClick={() => setForm("ProfilePictures")}
                  className="mr-3 ml-1 border border-pgray-300 rounded-2xl w-[80px] h-[80px] flex justify-left items-center"
                >
                  <div className="bg-pgray-200 h-[48px] w-[48px] rounded-2xl flex justify-center items-center ml-[16px]">
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
import { useState } from "react";
import { useAuth } from "@/contexts/authentication";
import Navbar from "@/components/base/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function RegisterPageMock() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullname, setFullname] = useState("");
  const [age, setAge] = useState(20);
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password, fullname, age);
    
    register(values)
    console.log(values)
    // register({
    //   username,
    //   password,
    //   fullname,
    //   age,
    // });
  };
  const initialValues = {
    fullname: "hardcode",
    username: "hardcode",
    password: "1234",
    age: 0,
  };
  const [values, setValues] = useState(initialValues);
  //   const setForm = (formName) => {
  //     switch (formName) {
  //       case "BasicInformation": {
  //         return setPage(0);
  //       }
  //       case "Identities": {
  //         return setPage(1);
  //       }
  //       case "ProfilePictures": {
  //         return setPage(2);
  //       }
  //       default:
  //         setPage(0);
  //     }
  //   };

  //   const handleForms = () => {
  //     switch (page) {
  //       case 0: {
  //         return (
  //             <BasicInformation
  //               formValues={values}
  //               onChange={onChange}
  //             ></BasicInformation>
  //         );
  //       }
  //       case 1: {
  //         return (
  //           <Identities
  //             formValues={values}
  //             onChange={onChange}
  //             option={states}
  //             updateTags={updateTags}
  //             option1={states1}
  //             option2={states2}
  //           />
  //         );
  //       }
  //       case 2: {
  //         return (
  //           <ProfilePictures
  //             formValues={values}
  //             onChange={onChange}
  //             avatars={avatars}
  //             updateAvatars={updateAvatars}
  //           ></ProfilePictures>
  //         );
  //       }
  //       default:
  //         return null;
  //     }
  //   };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="flex ml-[250px] bg-orange-200">
        <form>
          <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
            <h1>Basic Information</h1>
          </div>
          <div className="flex mb-[112px]">
            <div>
              <Label>
                Name
                <Input
                  className="w-[453px] mb-[40px]"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Jone Snow"
                  //   onChange={onChange}
                  //   value={formValues.name}
                />
              </Label>

              <Label>
                Location
                <Input
                  className="w-[453px] mb-[40px]"
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Thailand"
                  //   onChange={onChange}
                  //   value={formValues.location}
                />
              </Label>

              <Label>
                Username
                <Input
                  className="mb-[40px]"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="At least 6 charactor"
                  //   value={formValues.username}
                  //   onChange={onChange}
                />
              </Label>

              <Label>
                Password
                <Input
                  className="mb-[40px]"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 8 charactor"
                  //   value={formValues.password}
                  //   onChange={onChange}
                />
              </Label>
            </div>

            <div className="ml-[24px]">
              <Label>
                Date of birth
                <Input
                  className="w-[453px] mb-[40px]"
                  placeholder="01/01/2022"
                  type="date"
                  id="Date"
                  name="Date"
                  defaultValue="2022-01-01"
                  //   value={formValues.Date}
                  //   onChange={onChange}
                />
              </Label>

              <Label>
                City
                <Input
                  className="mb-[40px]"
                  type="city"
                  id="city"
                  name="city"
                  placeholder="Bangkok"
                  //   value={formValues.city}
                  //   onChange={onChange}
                />
              </Label>

              <Label>
                Email
                <Input
                  className="mb-[40px]"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@website.com"
                  //   value={}
                  //   onChange={}
                />
              </Label>

              <Label>
                Confirm password
                <Input
                  className="mb-[40px]"
                  type="password"
                  id="ConfirmPassword"
                  name="ConfirmPassword"
                  placeholder="At least 8 charactor"
                  //   value={formValues.ConfirmPassword}
                  //   onChange={onChange}
                />
              </Label>
            </div>
          </div>
          <button onClick={handleSubmit} className="border bg-red-700">Submit Button</button>
        </form>
      </div>
    </>
  );
}

export default RegisterPageMock;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function BasicInformation({ formValues, onChange }) {
  const [errorDate, setErrorDate] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCity, setErrorCity] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let isValid = true;

    if (formValues.name.trim() === "") {
      setErrorName("Please enter your name.");
      isValid = false;
    } else {
      setErrorName("");
    }

    if (formValues.location.trim() === "") {
      setErrorLocation("Please enter your location.");
      isValid = false;
    } else {
      setErrorLocation("");
    }

    if (formValues.username.trim() === "") {
      setErrorUsername("Please enter your username.");
      isValid = false;
    } else {
      setErrorUsername("");
      if (formValues.username.length < 6) {
        setErrorUsername("Username must be at least 6 characters long.");
        isValid = false;
      }
    }

    if (!formValues.email) {
      setErrorEmail("Please enter your email address");
      isValid = false;
    } else if (
      !formValues.email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
    ) {
      setErrorEmail("Please enter a valid email address");
      isValid = false;
    } else {
      setErrorEmail("");
    }

    if (formValues.password.length < 7) {
      setErrorPassword("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setErrorPassword("");
    }

    if (formValues.password !== formValues.ConfirmPassword) {
      setErrorPasswordConfirm("*Password doesn't match");
      isValid = false;
    } else {
      setErrorPasswordConfirm("");
    }

    if (formValues.city.trim() === "") {
      setErrorCity("Please enter your city.");
      isValid = false;
    } else {
      setErrorCity("");
    }

    if (formValues.Date) {
      const birthDate = new Date(formValues.Date);
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
    // if (isValid) {
    //   props.onNext({
    //     email: formValues.email,
    //     password: formValues.password,
    //   });
    // } else {
    //   // ไม่ต้องทำอะไรเมื่อข้อมูลไม่ถูกต้อง
    // }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
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
                onChange={onChange}
                value={formValues.name}
              />
              {errorName && <p className=" text-red-600">{errorName}</p>}
            </Label>

            <Label>
              Location
              <Input
                className="w-[453px] mb-[40px]"
                type="text"
                name="location"
                id="location"
                placeholder="Thailand"
                onChange={onChange}
                value={formValues.location}
              />
              {errorLocation && (
                <p className=" text-red-600">{errorLocation}</p>
              )}
            </Label>

            <Label>
              Username
              <Input
                className="mb-[40px]"
                type="text"
                name="username"
                id="username"
                placeholder="At least 6 charactor"
                value={formValues.username}
                onChange={onChange}
              />
              {errorUsername && (
                <p className=" text-red-600">{errorUsername}</p>
              )}
            </Label>

            <Label>
              Password
              <Input
                className="mb-[40px]"
                type="password"
                id="password"
                name="password"
                placeholder="At least 8 charactor"
                value={formValues.password}
                onChange={onChange}
              />
              {errorPassword && (
                <p className=" text-red-600">{errorPassword}</p>
              )}
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
                value={formValues.Date}
                onChange={onChange}
              />
              {errorDate && <p className="text-red-600">{errorDate}</p>}
            </Label>

            <Label>
              City
              <Input
                className="mb-[40px]"
                type="city"
                id="city"
                name="city"
                placeholder="Bangkok"
                value={formValues.city}
                onChange={onChange}
              />
              {errorCity && <p className=" text-red-600">{errorCity}</p>}
            </Label>

            <Label>
              Email
              <Input
                className="mb-[40px]"
                type="email"
                id="email"
                name="email"
                placeholder="name@website.com"
                value={formValues.email}
                onChange={onChange}
              />
              {errorEmail && <p className=" text-red-600">{errorEmail}</p>}
            </Label>

            <Label>
              Confirm password
              <Input
                className="mb-[40px]"
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                placeholder="At least 8 charactor"
                value={formValues.ConfirmPassword}
                onChange={onChange}
              />
              {errorPasswordConfirm && (
                <p className=" text-red-600">{errorPasswordConfirm}</p>
              )}
            </Label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default BasicInformation;

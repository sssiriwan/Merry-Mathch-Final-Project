import React, { useContext } from "react";
import FormContext from "@/formContext/form.context";
import { Label } from "@radix-ui/react-context-menu";
import { Input } from "@/components/ui/input";
export const Pg1 = () => {
  const {
    username,
    setUsername,
    location,
    setLocation,
    fullname,
    setFullname,
    password,
    setPassword,
    dateBirth,
    setDateBirth,
    city,
    setCity,
    email,
    setEmail,
    confirmPassword,
    setConfirmPassword,
  } = useContext(FormContext);

  return (
    <form>
      <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
        <h1>Basic Information</h1>
      </div>

      <div className="flex mb-[112px]">
        <div>
          <Label htmlFor="fullname" className="form-label">
            Name
            <Input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="fullnameHelp"
            />
          </Label>

          <Label htmlFor="location" className="form-label">
            Location
            <Input
              type="text"
              id="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="usernameHelp"
            />
          </Label>

          <Label htmlFor="username" className="form-label">
            Username
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="usernameHelp"
            />
          </Label>

          <Label htmlFor="password" className="form-label">
            Password
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="usernameHelp"
            />
          </Label>
        </div>

        <div className="ml-[24px]">
          <Label htmlFor="dateBirth" className="form-label">
            Date of birth
            <Input
              type="date"
              id="dateBirth"
              value={dateBirth}
              onChange={(e) => {
                setDateBirth(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="fullnameHelp"
            />
          </Label>

          <Label htmlFor="city" className="form-label">
            City
            <Input
              type="text"
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="fullnameHelp"
            />
          </Label>

          <Label htmlFor="email" className="form-label">
            Email
            <Input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="fullnameHelp"
            />
          </Label>

          <Label htmlFor="email" className="form-label">
            Confirm Password
            <Input
              type="text"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="w-[453px] mb-[40px]"
              aria-describedby="fullnameHelp"
            />
          </Label>
        </div>
      </div>
    </form>
  );
};

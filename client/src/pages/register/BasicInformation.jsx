import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import ValindateContext from "./valindatecontext/Valindatecontext";

function BasicInformation({ formValues, onChange, handleNext }) {
  const {
    errorDate,
    errorUsername,
    errorLocation,
    errorName,
    errorEmail,
    errorPasswordConfirm,
    errorPassword,
    errorCity,
  } = useContext(ValindateContext);

  return (
    <>
      <form>
        <div className="font-[700] text-[24px] text-ppurple-500 mt-[80px]">
          <h1>Basic Information</h1>
        </div>
        <div className="flex mb-[112px]">
          <div>
            <div className="mb-[40px]">
              <Label>
                Name
                <Input
                  className="w-[453px]"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Jone Snow"
                  onChange={onChange}
                  value={formValues.name}
                />
                {errorName && <p className=" text-red-600">{errorName}</p>}
              </Label>
            </div>

            <div className="mb-[40px]">
              <Label>
                Location
                <Input
                  className="w-[453px]"
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
            </div>

            <div className="mb-[40px]">
              <Label>
                Username
                <Input
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
            </div>

            <div>
              <Label>
                Password
                <Input
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
          </div>

          <div className="ml-[24px]">
            <div className="mb-[40px]">
              <Label>
                Date of birth
                <Input
                  className="w-[453px]"
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
            </div>

            <div className="mb-[40px]">
              <Label>
                City
                <Input
                  type="city"
                  id="city"
                  name="city"
                  placeholder="Bangkok"
                  value={formValues.city}
                  onChange={onChange}
                />
                {errorCity && <p className=" text-red-600">{errorCity}</p>}
              </Label>
            </div>

            <div className="mb-[40px]">
              <Label>
                Email
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@website.com"
                  value={formValues.email}
                  onChange={onChange}
                />
                {errorEmail && <p className=" text-red-600">{errorEmail}</p>}
              </Label>
            </div>

            <div className="mb-[40px]">
              <Label>
                Confirm password
                <Input
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
        </div>
      </form>
    </>
  );
}

export default BasicInformation;

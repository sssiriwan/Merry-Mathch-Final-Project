import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function BasicInformation({ formValues, onChange }) {
  return (
    <>
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
          </Label>
        </div>
      </div>
    </>
  );
}

export default BasicInformation;

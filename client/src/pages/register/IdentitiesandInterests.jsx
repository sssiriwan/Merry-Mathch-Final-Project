import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListText from "./text";
import { useForm } from "react-hook-form";

function Identities({ formValues, onChange, updateTags }) {
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
          <Select
            onChange={onChange}
            value={formValues.SexualIdentities}
            id="SexualIdentities"
            name="SexualIdentities"
          >
            <SelectTrigger className="w-[453px]">
              <SelectValue placeholder="Male" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem id="0" value="0">
                  Male
                </SelectItem>
                <SelectItem id="1" value="1">
                  Female
                </SelectItem>
                <SelectItem id="2" value="2">
                  Non-binary
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="ml-[24px]">
            <Select
              onChange={onChange}
              value={formValues.SexualPreferences}
              id="SexualPreferences"
              name="SexualPreferences"
            >
              <SelectTrigger className="w-[453px]">
                <SelectValue placeholder="Female" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem id="0" value="Male">
                    Male
                  </SelectItem>
                  <SelectItem id="1" value="Female">
                    Female
                  </SelectItem>
                  <SelectItem id="2" value="Non-binary">
                    Non-binary
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex mt-[40px]">
          <div className="w-[453px]">Racial preferences</div>
          <div className="ml-[24px]">Meeting interests</div>
        </div>

        <div className="flex">
          <Select
            onChange={onChange}
            value={formValues.RacialPreferences}
            id="RacialPreferences"
            name="RacialPreferences"
          >
            <SelectTrigger className="w-[453px]">
              <SelectValue placeholder="Asian" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem id="0" value="Asian">
                  Asian
                </SelectItem>
                <SelectItem id="1" value="Caucasoid">
                  Caucasoid
                </SelectItem>
                <SelectItem id="2" value="Negriod">
                  Negriod
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="ml-[24px]">
            <Select
              onChange={onChange}
              value={formValues.MeetingInterests}
              id="MeetingInterests"
              name="MeetingInterests"
            >
              <SelectTrigger className="w-[453px]">
                <SelectValue placeholder="Friends" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem id="0" value="Friends">
                    Friends
                  </SelectItem>
                  <SelectItem id="1" value="Boyfriend/girlfriend">
                    Boyfriend/girlfriend
                  </SelectItem>
                  <SelectItem id="2" value="Casual">
                    Casual
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

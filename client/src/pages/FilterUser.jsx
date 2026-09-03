import "../App.css";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import MultiRangeSlider from "@/pages/Slider";
import { useAge } from "@/contexts/ageContext";

function FilterUser() {
  const {female, setFemale, male, setMale, nonBi, setNonBi} = useAge();

  return (
    <>
      <section className="flex bg-white">
        <div className="px-5 pt-3">
          <h1 className="text-[#191C77] font-bold my-3">Sex you interest</h1>
          <div className="flex flex-col">
            <div className="mb-3">
              <Checkbox
                id="female"
                onClick={() => {setFemale(!female)}}
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="female" className="ml-2 text-pgray-700">
                Female
              </label>
            </div>
            <div className="mb-3">
              <Checkbox
                id="male"
                onClick={() => {setMale(!male)}}
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="male" className="ml-2 text-pgray-700">
                Male
              </label>
            </div>
            <div className="mb-3">
              <Checkbox
                id="non-bi"
                onClick={() => {setNonBi(!nonBi)}}
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="non-bi" className="ml-2 text-pgray-700">
                Non-binary people
              </label>
            </div>
          </div>
          <h1 className="text-[#191C77] font-bold my-3">Age Range</h1>
          <div className="flex flex-col">
            <MultiRangeSlider min={18} max={80} />
          </div>
        </div>
      </section>
    </>
  );
}

export default FilterUser;
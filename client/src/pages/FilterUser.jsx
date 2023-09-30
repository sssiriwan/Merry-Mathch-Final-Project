import "../App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";
import MultiRangeSlider from "@/pages/Slider";
import { useAge } from "@/contexts/ageContext";

function FilterUser() {
  const [keyword, setKeyword] = useState("");
  const {female, setFemale, male, setMale, nonBi, setNonBi} = useAge();
console.log(nonBi)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/`
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [keyword]);

  const handleSearch = () => {
    fetchData();
  };
  const [values, setValues] = useState([25, 50]); // Initial values for each thumb

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <section className="flex bg-white">
        <div className="pl-3 pt-3">
          <h1 className="text-[#191C77] font-bold my-3">Sex you interest</h1>
          <div className="flex flex-col">
            <div className="mb-3">
              <Checkbox
                id="default"
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
              />
              <label htmlFor="default" className="ml-2 text-pgray-700">
                Default
              </label>
            </div>
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
          <div className="flex flex-row m-3 p-7">
            <ButtonSecondary>Clear</ButtonSecondary>
            <ButtonDemo>Search</ButtonDemo>
          </div>
        </div>
      </section>
    </>
  );
}

export default FilterUser;
{/* <div className="flex flex-col">
            <label
              className="text-[#191C77] font-bold my-3"
              htmlFor="search-box"
            >
              Search by Keywords
            </label>
            <div className="relative" onSubmit={handleSubmit}>
              <input
                className="rounded-[8px] text-[14px] pl-[28px] border-solid border-[1px] border-Pink bg-White"
                type="text"
                // id="search-input"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </div>
          </div> */}
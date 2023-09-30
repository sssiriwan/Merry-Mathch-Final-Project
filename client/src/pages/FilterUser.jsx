import "../App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ButtonDemo, ButtonSecondary } from "@/components/base/button/Button";
import MultiRangeSlider from "@/pages/Slider";

function FilterUser() {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `http://localhost:4000/:keyword=${keyword}`
        );

        if (response.data.error) {
          setError("เกิดข้อผิดพลาด");
        } else {
          setData("เกิดข้อผิดพลาดเซิร์ฟเวอร์");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [keyword]);

  const handleSearch = () => {
    fetchData();
  };
  // const [values, setValues] = useState([25, 50]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // ฟิลเตอร์ข้อมูล
  //   const filteredData = filterData(data);

  //   // ตั้งค่า filtered ใหม่ตามผลลัพธ์ที่ฟิลเตอร์ได้
  //   setData(filteredData);

  //   // ส่งค่าฟิลเตอร์ไปยัง components Matching
  //   onFilterChange &&
  //     onFilterChange({
  //       checkboxValue,
  //       minPriceFilter,
  //       maxPriceFilter,
  //     });
  // };

  //ฟังก์ชันเก็บค่า cb

  useEffect(() => {
    onFilterChange({ checkboxValue, minPriceFilter, maxPriceFilter });
  }, [checkboxValue, minPriceFilter, maxPriceFilter]);

  const [checkboxValue, setCheckboxValue] = useState([]);
  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckboxValue((prevCheckboxValue) => [...prevCheckboxValue, value]);
    } else {
      setCheckboxValue((prevCheckboxValue) =>
        prevCheckboxValue.filter((item) => item !== value)
      );
    }
  };
  console.log("cb" + checkboxValue);

  const [minPriceFilter, setMinPriceFilter] = useState(18);
  const [maxPriceFilter, setMaxPriceFilter] = useState(80);

  const handleMultiRangeSlider = ({ min, max }) => {
    console.log(`min = ${min}, max = ${max}`);
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
  };

  const filterData = (data) => {
    const filteredData = data.filter((item) => {
      // ฟิลเตอร์ตามค่า Checkbox
      const checkboxValues = ["three", "two", "female", "non - bi"];
      const isCheckboxValueMatched = checkboxValues.some((value) =>
        item.checkboxValue.includes(value)
      );
      if (!isCheckboxValueMatched) {
        return false;
      }

      // ฟิลเตอร์ตามค่า MultiRangeSlider
      const minPrice = 18;
      const maxPrice = 80;
      const isPriceRangeMatched =
        item.price >= minPrice && item.price <= maxPrice;
      if (!isPriceRangeMatched) {
        return false;
      }

      return true;
    });

    const handleSubmit = (event) => {
      event.preventDefault();

      // ฟิลเตอร์ข้อมูล
      const filteredData = filterData(data);

      // ตั้งค่า filtered ใหม่ตามผลลัพธ์ที่ฟิลเตอร์ได้
      setData(filteredData);
    };

    return filteredData;
  };

  return (
    <>
      <section className="flex bg-white">
        <div className="w-[10%] pl-3 pt-3">
          <div className="flex flex-col">
            <label
              className="text-[#191C77] font-bold my-3"
              htmlFor="search-box"
            >
              Search by Keywords
            </label>
            {/* <div className="relative" onSubmit={handleSubmit}> */}
            <div className="relative">
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
          </div>
          {/* checkbox */}
          <h1 className="text-[#191C77] font-bold my-3">Sex you interest</h1>
          <div className="flex flex-col">
            <div className="mb-3">
              {/* <Checkbox
                id="default"
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
                value="Default"
                onChange={handleChange}
              />
              <label htmlFor="default" className="ml-2 text-pgray-700">
                Default
              </label> */}
              <input value="Three" type="checkbox" onChange={handleChange} />
              <span> Three </span>
            </div>
            <div className="mb-3">
              <input value="two" type="checkbox" onChange={handleChange} />
              <span> two </span>
            </div>
            <div className="mb-3">
              <Checkbox
                id="female"
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
                value="female"
                onChange={handleChange}
              />
              <label htmlFor="female" className="ml-2 text-pgray-700">
                Female
              </label>
            </div>
            <div className="mb-3">
              <Checkbox
                id="non-bi"
                className="rounded border-pgray-400 data-[state=checked]:bg-ppurple-500"
                value="non - bi"
                onChange={handleChange}
              />
              <label htmlFor="non-bi" className="ml-2 text-pgray-700">
                Non-binary people
              </label>
            </div>
          </div>
          <h1 className="text-[#191C77] font-bold my-3">Age Range</h1>
          <div className="flex flex-col">
            <MultiRangeSlider
              min={18}
              max={80}
              minFilter={minPriceFilter}
              setMinFilter={setMinPriceFilter}
              maxFilter={maxPriceFilter}
              setMaxFilter={setMaxPriceFilter}
              onChange={handleMultiRangeSlider}
            />
          </div>
          <div className="flex flex-row m-3 p-7">
            <ButtonSecondary>Clear</ButtonSecondary>
            <ButtonDemo onClick={handleSubmit}>Search</ButtonDemo>
          </div>
        </div>
      </section>
    </>
  );
}

export default FilterUser;

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@/App.css"
import { usePackage } from "@/contexts/packageProvider";

const merryDetailIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00022 15.6386C3.78126 15.6386 0.361328 12.2187 0.361328 7.99973C0.361328 3.78077 3.78126 0.36084 8.00022 0.36084C12.2192 0.36084 15.6391 3.78077 15.6391 7.99973C15.6391 12.2187 12.2192 15.6386 8.00022 15.6386ZM7.23862 11.0553L12.6393 5.65383L11.5592 4.57369L7.23862 8.89501L5.07758 6.73397L3.99744 7.8141L7.23862 11.0553Z" fill="#CF4FA9"/>
</svg>;

function PackageDetail() {
  const navigate = useNavigate()

  const { packageId } = usePackage();
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [limit, setLimit] = useState(0);
  const [icon, setIcon] = useState({});
  const [purchaseDate, setPurchaseDate] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  console.log("เช็ค", packageId)

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  function formNextDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${Number(month)+1}/${year}`;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
  });
  
  const getMembershipData = async () => {
    setIsLoading(true)
    const response = await axios.get(`http://localhost:4000/post/membership`)
    console.log(response)
    if (response.data.data.length > 0) {
      setName(response.data.data[0].merry_packages.package_name);
      setPrice(response.data.data[0].merry_packages.price);
      setLimit(response.data.data[0].merry_packages.package_limit);
      setIcon(response.data.data[0].merry_packages.package_icon);
      setPurchaseDate(response.data.data[0].purchase_date)
      setIsLoading(false)
    } else {
      // Redirect to the package page when there's no data
      navigate("/package"); // Replace "/package" with the actual route to your package page
    }
}


useEffect(() => {
  getMembershipData();
}, []);


  return (
    <div className="flex-col mt-6 w-[357px] h-[450px]  p-8  rounded-[32px]  bg-gradient-to-br from-ppurple-800 to-ppurple-400 shadow-xl">
      {/* icon  */}
      <div className="flex-col">
        <div className="w-[60px] h-[60px] flex justify-center items-center bg-pgray-100 rounded-xl">
          <img className="w-[40px] h-[40px]" src={icon} alt="" />
        </div>

        {/* ชื่อ ราคา */}
        <div className="mt-6">
          <h1 className=" text-3xl font-bold text-white">{name}</h1>
          <h2 className="  text-xl text-white">{formatter.format(price)} <span className=" text-base font-light">/Month</span></h2>
        </div>
        {/* detail */}
        <div className="mt-6">
            <div className="flex space-x-2 items-center mb-2">
              {<div className="h-fit">{merryDetailIcon}</div>}<h3 className="text-purple-100">‘Merry’ more than a daily limited</h3>
            </div>
            <div className="flex space-x-2 items-center mb-2">
              {<div className="h-fit">{merryDetailIcon}</div>}<h3 className="text-purple-100">Up to {limit} Merry per day</h3>
            </div>
        </div>
        <hr className=" mt-9" />
        <div className=" mt-6">
          <div className="flex justify-between">
            <h3 className="text-ppurple-200">Start Membership</h3>
            <h3 className="text-white">{formatDate(purchaseDate)}</h3>
          </div>
          <div className="flex justify-between">
            <h3 className=" text-ppurple-200">Next Billing</h3>
            <h3 className=" text-white">{formNextDate(purchaseDate)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;

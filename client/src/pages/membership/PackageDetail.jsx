import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PackageDetail() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [limit, setLimit] = useState(0);
  const [icon, setIcon] = useState({});

  const getMembershipData = async () => {
    const response = await axios.get(`http://localhost:4000/post/membership`);
    if (response.data.data.length > 0) {
      setName(response.data.data[0].merry_packages.package_name);
      setPrice(response.data.data[0].merry_packages.price);
      setLimit(response.data.data[0].merry_packages.package_limit);
      setIcon(response.data.data[0].merry_packages.package_icon);
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
        <img className="w-[60px] h-[60px]" src={icon} alt="" />

        {/* ชื่อ ราคา */}
        <div className="mt-6">
          <h1 className=" text-3xl  text-white">{name}</h1>
          <h2 className="  text-xl text-white">THB {price} /Month</h2>
        </div>
        {/* detail */}
        <div className="mt-6">
          <h3 className=" text-base  text-purple-100">‘Merry’ more than a daily limited</h3>
          <h3 className="text-base text-purple-100">Up to {limit} Merry per day</h3>
        </div>
        <hr className=" mt-9" />
        <div className=" mt-6">
          <div className="flex justify-between">
            <h3 className="text-ppurple-200">Start Membership</h3>
            <h3 className="text-white">01/04/2022</h3>
          </div>
          <div className="flex justify-between">
            <h3 className=" text-ppurple-200">Next Billing</h3>
            <h3 className=" text-white">01/05/2022</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;

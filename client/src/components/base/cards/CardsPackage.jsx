import React, { useState, useEffect } from "react";
import axios from "axios";

const CardsPackage = () => {
  const [packages, setPackages] = useState([]);

  const fetchPackageData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth/package");
      setPackages(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, []);

  

  return (
    <div className="flex flex-row  justify-center">
      
      {packages.map((packageItem) => (
        <div className="w-[357px] h-[438px]  mr-6 border border-pgray-400 rounded-4xl flex justify-center items-center">
        <div key={packageItem.package_id}>
          <div className="w-[277px] h-[358px] flex flex-col justify-between">
            <div className="w-[60px] h-[60px] flex justify-center items-center bg-pgray-100 rounded-2xl ">
              <img src={packageItem.package_icon} alt="icon_vector" />
            </div>
            <div className="w-[277px] h-[78px]">
              <p className="text-2xl text-ppurple-800 ">{packageItem.package_name}</p>
              <span className="text-xl text-pgray-900">{packageItem.price}<span className="text-base text-pgray-600">/Month</span></span>
            </div>
            <div className="w-[277px] h-[100px]  border-b border-pgray-300">
              <div className="flex">
                <img src={"./icons/check.png"} alt="icon_check" />
                <span className="ml-[12px] text-base text-pgray-800">
                  ‘Merry’ more than a daily limited
                </span>
              </div>
              <div className="w-[277px] flex mt-[16px]">
                <img src="./icons/check.png" alt="icon_check" />
                <span className="ml-[12px] text-base text-pgray-800">Up to {packageItem.package_limit} Merry per day</span>
              </div>
            </div>
            <div>
              <button className="w-[277px] h-[48px] text-base font-extrabold text-pred-600 rounded-full bg-red-100">
                Choose Package
              </button>
            </div>
          </div>
        </div>
        </div>
      ))}
      </div>
   
  );
};

// return (
//   <div className="flex flex-row  justify-center">
//     {packages.map((packageItem) => (
//       <div key={packageItem.package_id} className="m-4">
//         <div className="w-[277px] h-[358px] flex  flex-col justify-between border border-pgray-400 rounded-lg">
//           <div className="w-[60px] h-[60px] flex justify-center items-center bg-pgray-100 rounded-2xl">
//             <img src={packageItem.package_icon} alt="icon_vector" />
//           </div>
//           <div className="w-[277px] h-[78px] p-4">
//             <p className="text-2xl text-ppurple-800">{packageItem.package_name}</p>
//             <span className="text-xl text-pgray-900">
//               {packageItem.price}
//               <span className="text-base text-pgray-600">/Month</span>
//             </span>
//           </div>
//           <div className="w-[277px] h-[100px] border-t border-pgray-300 p-4">
//             <div className="flex">
//               <img src={"./icons/check.png"} alt="icon_check" />
//               <span className="ml-2 text-base text-pgray-800">
//                 ‘Merry’ more than a daily limit
//               </span>
//             </div>
//             <div className="flex mt-4">
//               <img src="./icons/check.png" alt="icon_check" />
//               <span className="ml-2 text-base text-pgray-800">Up to 25 Merry per day</span>
//             </div>
//           </div>
//           <div className="p-4">
//             <button className="w-full h-[48px] text-base font-extrabold text-pred-600 rounded-full bg-red-100">
//               Choose Package
//             </button>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
  
// );
// };

export default CardsPackage;

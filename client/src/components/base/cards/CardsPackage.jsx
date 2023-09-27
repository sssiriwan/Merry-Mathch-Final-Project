import React, { useState, useEffect } from "react";
import axios from "axios";

const merryDetailIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00022 15.6386C3.78126 15.6386 0.361328 12.2187 0.361328 7.99973C0.361328 3.78077 3.78126 0.36084 8.00022 0.36084C12.2192 0.36084 15.6391 3.78077 15.6391 7.99973C15.6391 12.2187 12.2192 15.6386 8.00022 15.6386ZM7.23862 11.0553L12.6393 5.65383L11.5592 4.57369L7.23862 8.89501L5.07758 6.73397L3.99744 7.8141L7.23862 11.0553Z" fill="#CF4FA9"/>
</svg>;

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

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
  });
  

  useEffect(() => {
    fetchPackageData();
  }, []);

  return (
    <div className="flex flex-row  justify-center">
      
      {packages.map((packageItem) => (
        <div className="w-[357px] h-[438px]  mr-6 border border-pgray-400 rounded-4xl flex justify-center items-center">
        <div key={packageItem.package_id}>
          <div className="w-[277px] h-[358px] flex flex-col justify-between">
            <div className="w-[60px] h-[60px] flex justify-center items-center bg-pgray-100 rounded-2xl">
              <img src={packageItem.package_icon} alt="icon_vector" />
            </div>
            <div className="w-[277px] h-[78px]">
              <p className="text-2xl font-bold text-ppurple-800 ">{packageItem.package_name}</p>
              <span className="text-xl text-pgray-900">{formatter.format(packageItem.price)} <span className="text-base text-pgray-600">/Month</span></span>
            </div>
            <div className="w-[277px] h-[100px]  border-b border-pgray-300">
              <div className="flex">
                {/* <img src={merryDetailIcon} alt="icon_check" /> */}
                {merryDetailIcon}
                <span className="ml-[12px] text-base text-pgray-800">
                  ‘Merry’ more than a daily limited
                </span>
              </div>
              <div className="w-[277px] flex mt-[16px]">
                {/* <img src="./icons/check.png" alt="icon_check" /> */}
                {merryDetailIcon}
                <span className="ml-[12px] text-base text-pgray-800">Up to {packageItem.package_limit} Merry per day</span>
              </div>
            </div>
            <div>
              <button className="w-[277px] h-[48px] text-base font-extrabold text-pred-600 rounded-full bg-pred-100 shadow-3xl">
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

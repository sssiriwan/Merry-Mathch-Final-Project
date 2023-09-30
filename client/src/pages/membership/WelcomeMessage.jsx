import React from "react";

function WelcomeMessage() {
  return (
    <div className="flex flex-col  ">
      {/* Welcome message */}
      <div className="w-[670px]  mt-10 flex flex-col justify-center">
        <h2 className="text-sm text-pbeige-700">PAYMENT SUCCESS</h2>
        <p className="mt-[8px] text-5xl font-extrabold text-ppurple-500">
          Welcome Merry Membership!
        </p>
        <p className="text-5xl font-extrabold text-ppurple-500">Thank you for joining us</p>
      </div>
      {/* button */}
      <div className="flex-row mt-20">
        <button className="px-4 py-2 rounded-3xl  font-bold bg-pred-100  text-pred-600  hover:bg-red-600  "><a href="/">Back to home</a></button>
        <button className="px-4 py-2 rounded-3xl  font-bold ml-5 bg-pred-500 text-white  hover:bg-gray-400 "><a href="/membership">Check Membership</a></button>
      </div>
    </div>
  );
}

export default WelcomeMessage;

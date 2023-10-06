import React from "react";

function WelcomeMessage() {
  return (
    <div className="flex flex-col  ">
      {/* Welcome message */}
      <div className="w-[670px]  mt-10 flex flex-col justify-center">
        <svg className="mb-10" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M32 64C40.4869 64 48.6263 60.6286 54.6274 54.6274C60.6286 48.6263 64 40.4869 64 32C64 23.5131 60.6286 15.3737 54.6274 9.37258C48.6263 3.37142 40.4869 0 32 0C23.5131 0 15.3737 3.37142 9.37258 9.37258C3.37142 15.3737 0 23.5131 0 32C0 40.4869 3.37142 48.6263 9.37258 54.6274C15.3737 60.6286 23.5131 64 32 64ZM46.828 26.828C47.5566 26.0736 47.9598 25.0632 47.9507 24.0144C47.9416 22.9656 47.5209 21.9624 46.7793 21.2207C46.0376 20.4791 45.0344 20.0584 43.9856 20.0493C42.9368 20.0402 41.9264 20.4434 41.172 21.172L28 34.344L22.828 29.172C22.0736 28.4434 21.0632 28.0402 20.0144 28.0493C18.9656 28.0584 17.9624 28.4791 17.2207 29.2207C16.4791 29.9624 16.0584 30.9656 16.0493 32.0144C16.0402 33.0632 16.4434 34.0736 17.172 34.828L25.172 42.828C25.9221 43.5779 26.9393 43.9991 28 43.9991C29.0607 43.9991 30.0779 43.5779 30.828 42.828L46.828 26.828Z" fill="#EFC4E2"/>
        </svg>
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

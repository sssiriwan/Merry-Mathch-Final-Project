import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[371px] bg-pgray-100 flex flex-col justify-center items-center">
      <div className="w-[1120px] h-[275px] flex flex-col items-center">
        <img src="./imgs/logo.png" alt="Merry-Match" />
        <div className="text-xl text-pgray-700">
          New generation of online dating website for everyone
        </div>
        <div className="text-lg text-pgray600 mt-[40px] p-[24px] border-t">
          copyright ©2022 merrymatch.com All rights reserved
        </div>
        <div className="flex justify-center items-center">
          <img src="./icons/fb.png" className="p-[8px]" alt="facebook-icon" />
          <img src="./icons/ig.png" className="p-[8px]" alt="instagram-icon" />
          <img src="./icons/tw.png" className="p-[8px]" alt="twiiter-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

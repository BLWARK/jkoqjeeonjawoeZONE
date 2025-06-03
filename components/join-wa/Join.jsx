import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Join = () => {
  return (
    <>
      <a
        href="https://www.whatsapp.com/channel/0029VarL93F9hXFC7iEtLL0v"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 border-t flex 2xl:flex-row  2xl:justify-start 2xl:items-center justify-center items-center gap-0 2xl:gap-4 xl:gap-4  lg:gap-4  p-6 bg-gray-700 rounded-lg"
      >
        <div className="flex items-center gap-4">
          <div className="">
            <FaWhatsapp
              className="text-green-400 group-hover:text-white transition duration-30 2xl:block xl:block lg:block hidden"
              size={40}
            />
          </div>
        </div>
        <div className="w-full flex  2xl:flex-row 2xl:justify-between 2xl:items-center justify-between items-start ">
          <div className=" flex flex-col text-white ">
            <p className="2xl:text-lg text-md font-medium"> Update Cepat, Info Lengkap! </p>
            <p className="2xl:text-sm text-xs"> Join Whatsapp Channel Kami </p>
          </div>
          <p className="2xl:px-6 2xl:py-4 px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg ">
            Klik disini
          </p>
        </div>
      </a>
    </>
  );
};

export default Join;

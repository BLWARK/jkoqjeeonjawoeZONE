import React from 'react'
import PwaButton from "@/components/InstallPWAButton"
import { FaCalendarAlt } from "react-icons/fa";


const TopNavbar = () => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(today);
  
  return (
    <div className="w-screen   bg-black text-white text-sm mx-auto  justify-center items-center 2xl:flex xl:flex lg:flex flex px-3">
        <div className="container 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] flex justify-between items-center py-4">
          <div>
            <span className='flex gap-2 justify-center items-center text-sm'><FaCalendarAlt />{formattedDate}</span>
          </div>
          <div className="space-x-4 flex justify-start items-center">
            <a href="#" className="hover:underline 2xl:block xl:block lg:block hidden">
              Advertise with us
            </a>
           
            {/* Social Media Icons */}
            <div className="flex space-x-2 ">
              <PwaButton/>
              {/* <FaYoutube className="hover:text-red-500 cursor-pointer" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaRss className="hover:text-yellow-500 cursor-pointer" /> */}
            </div>
          </div>
        </div>
      </div>
  )
}

export default TopNavbar
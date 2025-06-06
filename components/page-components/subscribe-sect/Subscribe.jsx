import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-gray-100 py-16  w-screen">
      <div className="2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 2xl:px-0 px-3 ">
        
        {/* Left Section - Subscription Info */}
        <div className="lg:w-[50%] w-full text-start lg:text-left">
          <h2 className="text-3xl font-bold text-pink-500">Newsletter Subscribed</h2>
          <p className="text-black mt-2">
            Get dialed in every Tuesday & Friday with quick updates of the world
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6 justify-start lg:justify-start">
            <div className="text-start">
              <h3 className="text-xl font-bold text-black">2M+</h3>
              <p className="text-black text-sm">Active Monthly Users</p>
            </div>
            <div className="text-start">
              <h3 className="text-xl font-bold text-black">250+</h3>
              <p className="text-black text-sm">Guides and Reviews Articles</p>
            </div>
            
            <div className="text-start">
              <h3 className="text-xl font-bold text-black">70</h3>
              <p className="text-black text-sm">International Team Authors</p>
            </div>
          </div>
        </div>

        {/* Right Section - Subscription Form */}
        <div className="lg:w-[50%] w-full bg-pink-900 text-white rounded-lg 2xl:p-10 p-8">
          <h3 className="text-lg font-semibold">Enter your email for our free Newsletter</h3>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-l-lg border border-gray-300 text-black focus:outline-none"
            />
            <button className="bg-pink-400 2xl:px-8 px-3 rounded-r-lg text-white font-semibold hover:bg-blue-500 text-nowrap">
              Sign Up
            </button>
          </div>
          <p className="text-xs italic text-gray-300 mt-2">
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Subscribe;

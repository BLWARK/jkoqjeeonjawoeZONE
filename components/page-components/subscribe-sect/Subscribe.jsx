import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-gray-700 py-16 mt-10 w-screen">
      <div className="2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 ">
        
        {/* Left Section - Subscription Info */}
        <div className="lg:w-[50%] w-full text-start lg:text-left">
          <h2 className="text-3xl font-bold text-pink-500">Newsletter Subscribed</h2>
          <p className="text-white mt-2">
            Get dialed in every Tuesday & Friday with quick updates of the world
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6 justify-start lg:justify-start">
            <div className="text-start">
              <h3 className="text-xl font-bold text-white">2M+</h3>
              <p className="text-white text-sm">Active Monthly Users</p>
            </div>
            <div className="text-start">
              <h3 className="text-xl font-bold text-white">250+</h3>
              <p className="text-white text-sm">Guides and Reviews Articles</p>
            </div>
            
            <div className="text-start">
              <h3 className="text-xl font-bold text-white">70</h3>
              <p className="text-white text-sm">International Team Authors</p>
            </div>
          </div>
        </div>

        {/* Right Section - Subscription Form */}
        <div className="lg:w-[50%] w-full bg-pink-900 text-white rounded-lg p-10">
          <h3 className="text-lg font-semibold">Enter your email for our free Newsletter</h3>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-l-lg border border-gray-300 text-white focus:outline-none"
            />
            <button className="bg-pink-400 px-8 rounded-r-lg text-white font-semibold hover:bg-blue-500 text-nowrap">
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

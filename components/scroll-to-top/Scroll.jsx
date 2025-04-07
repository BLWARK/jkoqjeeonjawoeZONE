"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-400 transition duration-300 cursor-custom nav-link z-50"
        >
          <AiOutlineArrowUp className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;

"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";
import regionData from "@/data/regionData";

const RegionalDropdown = ({ isVisible, onMouseEnter, onMouseLeave }) => {
    const [animationClass, setAnimationClass] = useState("");
  if (!isVisible) return null;

  useEffect(() => {
      setAnimationClass(isVisible ? "dropdown-enter" : "dropdown-exit");
    }, [isVisible]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute transform translate-x-1 2xl:left-0 xl:left-0 lg:left-0 left-3  2xl:top-[343px] xl:top-[343px] lg:top-[343px] top-[300px] mt-1 bg-white shadow-lg border rounded-md z-50 ${animationClass}`}
    >
      <ul className="py-2 px-4 min-w-[180px]">
        {regionData.map((region) => (
          <li key={region.id} className="py-2 hover:underline">
            <Link href={region.path} className="text-gray-800 block">
              {region.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionalDropdown;

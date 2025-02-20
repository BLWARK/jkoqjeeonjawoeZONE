"use client"
import { useEffect } from "react";

const MGIDWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://jsc.mgid.com/site/976842.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="mgid-widget" className="w-full my-6"></div>;
};

export default MGIDWidget;



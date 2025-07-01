"use client";
import React from "react";

const AdTracker = ({ adPosition = "unknown", children }) => {
  const handleClick = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const sessionId = sessionStorage.getItem("sessionId");
    const visitorId = localStorage.getItem("visitorId");

    const payload = {
      event_type: "ad_click",
      ad_position: adPosition,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      visitorId,
      sessionId,
    };

    try {
      await fetch(`${baseUrl}/api/analytics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("✅ Sent ad click tracking:", payload);
    } catch (error) {
      console.error("❌ Failed to send ad click tracking:", error);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default AdTracker;

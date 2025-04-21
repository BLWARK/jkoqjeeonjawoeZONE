"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const Tracking = () => {
  const pathname = usePathname();
  const entryTimeRef = useRef(new Date());
  const visitorIdRef = useRef(null);
  const previousPathRef = useRef(null);
  const visitTypeRef = useRef(null);

  const determineVisitType = (path) => {
    if (path === "/" || path === "/home") return "homepage";
    const categoryMatch = path.match(/^\/(entertaintment|technology|sport|c-level|lifestyle)/);
    if (categoryMatch) return `category:${categoryMatch[1]}`;
    return `article:${path}`;
  };

  const sendExitTracking = () => {
    if (!visitorIdRef.current || !visitTypeRef.current) return;

    const exitTime = new Date();
    const duration = Math.round((exitTime - entryTimeRef.current) / 1000);

    navigator.sendBeacon("/api/track-exit", JSON.stringify({
      pathname: previousPathRef.current,
      type: visitTypeRef.current,
      exitedAt: exitTime.toISOString(),
      duration,
      visitorId: visitorIdRef.current,
    }));

    console.log("📤 Sent exit tracking:", {
      pathname: previousPathRef.current,
      type: visitTypeRef.current,
      duration,
    });
  };

  const trackEntry = async () => {
    const visitType = determineVisitType(pathname);
    visitTypeRef.current = visitType;
    entryTimeRef.current = new Date();
    previousPathRef.current = pathname;

    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    visitorIdRef.current = visitorId;

    const ipRes = await fetch("https://api64.ipify.org?format=json");
    const ipData = await ipRes.json();
    const ip = ipData.ip;

    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("trackingData")) || {};

    if (stored[visitorId]?.[visitType] === today) return;

    localStorage.setItem("trackingData", JSON.stringify({
      ...stored,
      [visitorId]: {
        ...stored[visitorId],
        [visitType]: today,
      },
    }));

    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        ip,
        url: window.location.href,
        referrer: document.referrer || "direct",
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        type: visitType,
      }),
    });

    console.log("✅ Sent entry tracking:", { visitorId, visitType });
  };

  useEffect(() => {
    // Jika path sebelumnya sudah ada, kirim exit-nya dulu
    if (previousPathRef.current) {
      sendExitTracking();
    }

    // Lalu track yang baru
    trackEntry();

    // On unload terakhir (close tab/browser)
    const handleBeforeUnload = () => {
      sendExitTracking();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]); // 🔁 Trigger saat URL berubah

  return null;
};

export default Tracking;

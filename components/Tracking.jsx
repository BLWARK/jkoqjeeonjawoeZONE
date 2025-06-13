"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

const Tracking = () => {
  const pathname = usePathname();
  const entryTimeRef = useRef(new Date());
  const visitorIdRef = useRef(null);
  const previousPathRef = useRef(null);
  const visitTypeRef = useRef(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

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

const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
const geoData = await geoRes.json();
const country = geoData.country_name || "unknown";

const detectReferrerSource = (referrer) => {
  if (!referrer) return "direct";

  const url = referrer.toLowerCase();
  if (url.includes("google.")) return "google";
  if (url.includes("bing.")) return "bing";
  if (url.includes("facebook.")) return "facebook";
  if (url.includes("instagram.")) return "instagram";
  if (url.includes("t.co")) return "twitter";
  if (url.includes("whatsapp.com") || url.includes("wa.me")) return "whatsapp";
  if (url.includes("tiktok.")) return "tiktok";
  if (url.includes("youtube.")) return "youtube";
  return "other";
};



  const ua = new UAParser();
  const userAgent = navigator.userAgent;
  const browser = ua.getBrowser().name || "unknown";
  const os = ua.getOS().name || "unknown";
  const device = ua.getDevice().type || "Desktop";
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const referrerUrl = document.referrer || "";
const referrer = detectReferrerSource(referrerUrl);

  const sessionId =
    sessionStorage.getItem("sessionId") || (() => {
      const id = `sess-${uuidv4()}`;
      sessionStorage.setItem("sessionId", id);
      return id;
    })();

  const payload = {
    visitorId,
    ip,
    country,
     referrer, // now labeled as google / fb / whatsapp / etc.
  referrerUrl,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    type: visitType,
    userAgent,
    browser,
    os,
    device,
    platform: "web",
    screenWidth,
    screenHeight,
    sessionId,
  };

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

 await fetch(`${baseUrl}/api/analytics`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

  console.log("✅ Sent enriched tracking:", payload);
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

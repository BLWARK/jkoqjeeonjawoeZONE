"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

const Tracking = ({ article = null }) => {
  const pathname = usePathname();
  const entryTimeRef = useRef(new Date());
  const visitorIdRef = useRef(null);
  const previousPathRef = useRef(null);
  const visitTypeRef = useRef(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const determineVisitType = (path) => {
    if (path === "/" || path === "/home") return "homepage";
    const categoryMatch = path.match(
      /^\/(entertaintment|technology|sport|c-level|lifestyle)/
    );
    if (categoryMatch) return `category:${categoryMatch[1]}`;
    return `article:${path}`;
  };

  const detectReferrerSource = (referrer) => {
    if (!referrer) return "direct";
    const url = referrer.toLowerCase();
    if (url.includes("google.")) return "google";
    if (url.includes("bing.")) return "bing";
    if (url.includes("facebook.")) return "facebook";
    if (url.includes("instagram.")) return "instagram";
    if (url.includes("t.co")) return "twitter";
    if (url.includes("whatsapp.com") || url.includes("wa.me"))
      return "whatsapp";
    if (url.includes("tiktok.")) return "tiktok";
    if (url.includes("youtube.")) return "youtube";
    return "other";
  };

  const isArticlePage = /^\/artikel\/\d+\/[\w-]+$/.test(pathname);

  const sendExitTracking = () => {
  console.log("📤 Attempting to send exit tracking...");

  if (!visitorIdRef.current || !visitTypeRef.current) {
    console.log("❌ visitorId or visitType missing. Skip exit tracking.");
    return;
  }

  const exitTime = new Date();
  const duration = Math.round((exitTime - entryTimeRef.current) / 1000);

  const exitPayload = {
    event_type: "exit", // 🔥 tambahkan ini agar backend tahu ini exit
    pathname: previousPathRef.current,
    type: visitTypeRef.current,
    exitedAt: exitTime.toISOString(),
    duration,
    visitorId: visitorIdRef.current,
    sessionId: sessionStorage.getItem("sessionId") || null,
    url: window.location.href,
  };

  try {
    const blob = new Blob([JSON.stringify(exitPayload)], {
      type: "application/json",
    });

    const success = navigator.sendBeacon(`${baseUrl}/api/analytics`, blob);

    if (success) {
      console.log("📤 Sent exit tracking successfully:", exitPayload);
    } else {
      console.warn("⚠️ navigator.sendBeacon returned false.");
    }
  } catch (err) {
    console.error("❌ Error sending exit tracking:", err);
  }
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

    const ua = new UAParser();
    const userAgent = navigator.userAgent;
    const browser = ua.getBrowser().name || "unknown";
    const os = ua.getOS().name || "unknown";
    const device = ua.getDevice().type || "Desktop";
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // Ambil dari URL langsung
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");

    // Kalau ada utm_source, pakai itu. Kalau tidak, fallback ke referrer detection
    const referrerUrl = document.referrer || "";
    const referrer = utmSource || detectReferrerSource(referrerUrl);

    const sessionId =
      sessionStorage.getItem("sessionId") ||
      (() => {
        const id = `sess-${uuidv4()}`;
        sessionStorage.setItem("sessionId", id);
        return id;
      })();

    const payload = {
      visitorId,
      ip,
      country,
      referrer,
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
      is_article_page: isArticlePage,
      ...(article && {
        article_id: article.article_id,
        article_slug: article.slug,
        platform_id: article.platform_id,
        category_slug: article.category?.[0] || null,
        tag_list: article.tags || [],
      }),
    };

    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("trackingData")) || {};
    if (stored[visitorId]?.[visitType] === today) return;

    localStorage.setItem(
      "trackingData",
      JSON.stringify({
        ...stored,
        [visitorId]: {
          ...stored[visitorId],
          [visitType]: today,
        },
      })
    );

    await fetch(`${baseUrl}/api/analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("✅ Sent enriched tracking:", payload);
  };

  useEffect(() => {
    if (isArticlePage && (!article || !article.article_id)) return; // hanya skip jika di artikel & data belum siap
    if (previousPathRef.current) sendExitTracking();
    trackEntry();

    const handleBeforeUnload = () => sendExitTracking();
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pathname, article]);

  return null;
};

export default Tracking;

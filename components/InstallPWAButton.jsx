"use client";
import { useEffect, useState } from "react";

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalledApps = async () => {
      if (navigator.getInstalledRelatedApps) {
        const relatedApps = await navigator.getInstalledRelatedApps();
        if (relatedApps.length > 0) {
          console.log("PWA sudah diinstall.");
          setIsInstalled(true);
        } else {
          console.log("PWA belum diinstall.");
          setIsInstalled(false);
        }
      }
    };

    checkInstalledApps();

    const handler = (e) => {
      e.preventDefault();
      console.log("beforeinstallprompt event detected!");
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User choice:", outcome);
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {!isInstalled && deferredPrompt && (
        <button
          onClick={handleInstall}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition"
        >
          Install Aplikasi
        </button>
      )}
    </>
  );
};

export default InstallPWAButton;

"use client";
import { useEffect, useState } from "react";

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Cek apakah browser adalah Safari di iOS/macOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      userAgent.includes("safari") && !userAgent.includes("chrome");

    setIsSafari(isSafariBrowser);

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
      {/* Jika di Safari, tampilkan instruksi manual */}
      {isSafari && !isInstalled && (
        <div className="p-4 bg-yellow-200 text-gray-800 rounded-lg shadow-md">
          <p>Untuk menginstal PWA di Safari:</p>
          <ol className="list-decimal ml-5">
            <li>Buka menu <strong>Share</strong> (ikon kotak dengan panah ke atas)</li>
            <li>Pilih <strong>Add to Home Screen</strong></li>
            <li>Klik <strong>Tambah</strong> untuk menyelesaikan instalasi</li>
          </ol>
        </div>
      )}

      {/* Jika bukan Safari & PWA belum terinstall, tampilkan tombol Install */}
      {!isSafari && !isInstalled && deferredPrompt && (
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

"use client";
import { useEffect, useRef } from "react";

const TwitterEmbed = ({ tweetHtml }) => {
  const embedRef = useRef(null);

  useEffect(() => {
    const loadTwitterScript = () => {
      if (typeof window !== "undefined" && window.twttr) {
        window.twttr.widgets.load(embedRef.current);
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
      }
    };

    loadTwitterScript();
  }, []);

  return <div ref={embedRef} dangerouslySetInnerHTML={{ __html: tweetHtml }} />;
};

export default TwitterEmbed;

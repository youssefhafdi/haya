"use client";

import { useEffect, useRef } from "react";

const CHATBOT_IFRAME_ID = "haya-chatbot-iframe";
const CHATBOT_ORIGIN = "https://limova-web-sltj.onrender.com";
const CHATBOT_EMBED_PATH =
  "/embededChatbot?connectionId=1acc9ab8-7a5c-4176-947f-1b4b5a31b90b";

export default function Chatbot() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Check if iframe already exists to prevent duplicates
    const existingIframe = document.getElementById(CHATBOT_IFRAME_ID);
    if (existingIframe) {
      iframeRef.current = existingIframe as HTMLIFrameElement;
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.id = CHATBOT_IFRAME_ID;
    iframe.src = `${CHATBOT_ORIGIN}${CHATBOT_EMBED_PATH}`;

    const isMobile = window.innerWidth < 768;
    const openWidth = isMobile ? "90%" : "420px";
    const openHeight = isMobile ? "calc(100vh - 100px)" : "600px";
    const closedWidth = "70px";
    const closedHeight = "70px";
    const right = isMobile ? "5%" : "30px";

    Object.assign(iframe.style, {
      position: "fixed",
      bottom: "20px",
      right: right,
      border: "none",
      zIndex: "1000",
      width: closedWidth,
      height: closedHeight,
      borderRadius: "35px",
      transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      overflow: "hidden",
      backgroundColor: "#0ea5e9",
    });

    // Renforcer la sécurité de l'iframe
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.sandbox.add(
      "allow-scripts",
      "allow-same-origin",
      "allow-forms"
    );

    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    const handleMessage = (event: MessageEvent) => {
      // N'accepter que les messages provenant du domaine du chatbot
      if (event.origin !== CHATBOT_ORIGIN) return;

      const data = event.data;
      const currentIframe = document.getElementById(
        CHATBOT_IFRAME_ID
      ) as HTMLIFrameElement | null;

      if (
        currentIframe &&
        data &&
        typeof data === "object" &&
        "chatbotOpen" in data
      ) {
        if (data.chatbotOpen === true) {
          currentIframe.style.width = openWidth;
          currentIframe.style.height = openHeight;
          currentIframe.style.borderRadius = "10px";
        } else if (data.chatbotOpen === false) {
          currentIframe.style.width = closedWidth;
          currentIframe.style.height = closedHeight;
          currentIframe.style.borderRadius = "35px";
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup function - only remove listener, keep iframe persistent
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return null;
}

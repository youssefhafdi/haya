"use client";

import { useEffect } from "react";

export default function Chatbot() {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://limova-web-sltj.onrender.com/embededChatbot?connectionId=b2684a4d-c4db-4a87-8384-0c5a0b3f868b";

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
    });

    document.body.appendChild(iframe);

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data && typeof data === "object" && "chatbotOpen" in data) {
        if (data.chatbotOpen === true) {
          iframe.style.width = openWidth;
          iframe.style.height = openHeight;
          iframe.style.borderRadius = "10px";
        } else if (data.chatbotOpen === false) {
          iframe.style.width = closedWidth;
          iframe.style.height = closedHeight;
          iframe.style.borderRadius = "35px";
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup function
    return () => {
      window.removeEventListener("message", handleMessage);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

export default function Chatbot() {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://limova-web-sltj.onrender.com/embededChatbot?connectionId=1acc9ab8-7a5c-4176-947f-1b4b5a31b90b";

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

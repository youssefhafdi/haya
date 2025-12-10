import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haya Assurances - Votre partenaire de confiance",
  description: "Haya Assurances vous accompagne pour tous vos besoins en assurance : auto, habitation, mutuelle santé, moto. Service professionnel et personnalisé.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
        <Chatbot />
        <Script id="chatbot-embed" strategy="afterInteractive">{`
          (function initChatbot() {
            const mount = () => {
              const iframe = document.createElement("iframe");
              iframe.src = "https://limova-web-sltj.onrender.com/embededChatbot?connectionId=1acc9ab8-7a5c-4176-947f-1b4b5a31b90b";

              const isMobile = window.innerWidth < 768;
              const openWidth = isMobile ? "90%" : "420px";
              const openHeight = isMobile ? "calc(100vh - 100px)" : "600px";
              const closedWidth = "70px";
              const closedHeight = "70px";
              const right = isMobile ? "5%" : "30px";

              Object.assign(iframe.style, {
                position: "fixed",
                bottom: "20px",
                right,
                border: "none",
                zIndex: "1000",
                width: closedWidth,
                height: closedHeight,
                borderRadius: "35px",
                transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                backgroundColor: "#0ea5e9"
              });

              document.body.appendChild(iframe);

              window.addEventListener("message", function(event) {
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
              });
            };

            if (document.readyState === "complete" || document.readyState === "interactive") {
              mount();
            } else {
              document.addEventListener("DOMContentLoaded", mount);
            }
          })();
        `}</Script>
      </body>
    </html>
  );
}

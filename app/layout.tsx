import type { Metadata } from "next";
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
  icons: {
    icon: "/assets/h.png?v=2",
    apple: "/assets/h.png?v=2",
  },
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
      </body>
    </html>
  );
}

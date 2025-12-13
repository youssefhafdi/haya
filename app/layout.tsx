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
  metadataBase: new URL('https://haya-assurances.com'),
  title: {
    default: "Haya Assurances - Votre partenaire de confiance en assurance",
    template: "%s | Haya Assurances"
  },
  description: "Haya Assurances vous accompagne pour tous vos besoins en assurance : auto, habitation, mutuelle santé, moto et emprunteur. Devis gratuit et service professionnel personnalisé à Lyon.",
  keywords: ["assurance auto", "assurance habitation", "mutuelle santé", "assurance moto", "assurance emprunteur", "courtier assurance Lyon", "devis assurance gratuit"],
  authors: [{ name: "Haya Assurances" }],
  creator: "Haya Assurances",
  publisher: "Haya Assurances",
  icons: {
    icon: "/assets/h.png?v=2",
    apple: "/assets/h.png?v=2",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://haya-assurances.com",
    siteName: "Haya Assurances",
    title: "Haya Assurances - Votre partenaire de confiance en assurance",
    description: "Courtier en assurance à Lyon. Assurance auto, habitation, mutuelle santé, moto et emprunteur. Devis gratuit et accompagnement personnalisé.",
    images: [
      {
        url: "/assets/h.png",
        width: 1200,
        height: 630,
        alt: "Haya Assurances - Courtier en assurance"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Haya Assurances - Votre partenaire de confiance en assurance",
    description: "Courtier en assurance à Lyon. Assurance auto, habitation, mutuelle santé, moto et emprunteur.",
    images: ["/assets/h.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Haya Assurances",
    "description": "Courtier en assurance à Lyon. Assurance auto, habitation, mutuelle santé, moto et emprunteur.",
    "url": "https://haya-assurances.com",
    "logo": "https://haya-assurances.com/assets/h.png",
    "image": "https://haya-assurances.com/assets/h.png",
    "telephone": "+33980807637",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "254 Rue Vendôme",
      "addressLocality": "Lyon",
      "postalCode": "69003",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.7545",
      "longitude": "4.8692"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/haya-assurances"
    ],
    "priceRange": "€€",
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services d'assurance",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Assurance Auto",
            "description": "Assurance automobile tous types de véhicules"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Assurance Habitation",
            "description": "Protection complète pour votre logement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mutuelle Santé",
            "description": "Complémentaire santé adaptée à vos besoins"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Assurance Moto",
            "description": "Assurance deux-roues et motos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Assurance Emprunteur",
            "description": "Protection de vos crédits immobiliers"
          }
        }
      ]
    }
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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

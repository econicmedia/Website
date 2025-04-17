import type { Metadata, Viewport } from "next";
import { generateLocalBusinessSchema } from "../utils/structuredData";

// SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://benfresh.de'
      : 'http://localhost:3000'
  ),
  title: "BenFresh Reinigung | Professionelle Reinigungsdienstleistungen in Köln",
  description: "Professionelle Reinigungsdienstleistungen für Privathaushalte und Unternehmen in Köln und Umgebung. Zuverlässig, pünktlich und gründlich mit Qualitätsgarantie.",
  keywords: "Reinigung Köln, Professionelle Reinigung, Büroreinigung, Fensterreinigung, Haushaltsreinigung, Gebäudereinigung, Teppichreinigung, Bodenreinigung",
  authors: [{ name: "BenFresh Reinigung" }],
  creator: "BenFresh Reinigung",
  publisher: "BenFresh Reinigung",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://benfresh.de",
  },
  openGraph: {
    title: "BenFresh Reinigung | Professionelle Reinigungsdienstleistungen",
    description: "Makellose Sauberkeit für Ihr Zuhause und Unternehmen in Köln & Umgebung. Zuverlässig, pünktlich und gründlich mit 100% Zufriedenheitsgarantie.",
    url: "https://benfresh.de",
    siteName: "BenFresh Reinigung",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/images/logo.png", // Using our official logo
        width: 1200,
        height: 1200,
        alt: "BenFresh Reinigung - Professionelle Reinigungsdienstleistungen in Köln",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BenFresh Reinigung | Reinigungsdienstleistungen in Köln",
    description: "Makellose Sauberkeit für Ihr Zuhause und Unternehmen. Zuverlässig, pünktlich und gründlich.",
    images: ["/images/logo.png"], // Using our official logo
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Business",
};

// Viewport settings for responsive design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: "#0097A7",
  viewportFit: "cover"
};

// Get structured data for the local business
export const localBusinessSchema = generateLocalBusinessSchema();

import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL("https://domainflux.vercel.app"),
  title: {
    default: "DomainFlux | AI-Powered Domain Generation",
    template: "%s | DomainFlux"
  },
  description:
    "Advanced neural networks analyze your concept to generate optimal, brandable, investment-worthy domain names.",

  // Basic SEO
  keywords: [
    "domain generator",
    "AI domain tool",
    "startup naming",
    "brand domains",
    "domain availability",
    "domain score",
    "DomainFlux"
  ],
  authors: [{ name: "DomainFlux" }],
  creator: "DomainFlux",
  publisher: "DomainFlux",

  // Robots (good for SEO indexing)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },

  // Canonical URL
  alternates: {
    canonical: "/"
  },

  // OpenGraph
  openGraph: {
    title: "DomainFlux — AI-Powered Domain Generation",
    description:
      "Generate brandable domains, check real-time availability, and evaluate investment potential with AI.",
    url: "https://domainflux.vercel.app",
    siteName: "DomainFlux",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DomainFlux – AI Domain Generator"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "DomainFlux — AI-Powered Domain Generation",
    description:
      "Generate brandable domains, check real-time availability, and evaluate investment potential with AI.",
    images: ["/og.png"]
  },

  // Appearance
  themeColor: "#000000"
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/General/Layout/Navbar";
import { Footer } from "@/components/General/Layout/Footer";
import { NavbarProvider } from "@/components/General/Layout/NavbarContext";
import StarBackground from "@/components/General/Layout/StarBackground";

export const metadata: Metadata = {
  title: "Your Space Journey Starts Here!",
  description:
    "ORBIT NTNU is a student organization at the Norwegian University of Science and Technology developing CubeSats and advancing Norway’s space technology through hands-on engineering and innovation.",

  keywords: [
    "ORBIT NTNU",
    "NTNU",
    "CubeSat",
    "SelfieSat",
    "student satellite",
    "space technology",
    "student organization",
    "space engineering",
    "Norway",
  ],

  authors: [{ name: "ORBIT NTNU", url: "https://orbitntnu.com" }],
  creator: "ORBIT NTNU Web Team",
  publisher: "ORBIT NTNU",
  category: "Nonprofit",

  openGraph: {
    title: "ORBIT NTNU | Your Space Journey Starts Here",
    description:
      "Join ORBIT NTNU — the student satellite team building Norway’s next space missions. Learn more about our projects, sponsors, and opportunities to join.",
    url: "https://orbitntnu.com/",
    siteName: "ORBIT NTNU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://orbitntnu.com/orbitbig.jpg",
        width: 1200,
        height: 630,
        alt: "This is ORBIT NTNU",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Your Space Journey Starts Here!",
    description:
      "Follow ORBIT NTNU — Norway’s leading student space organization. Explore our missions and projects.",
    creator: "@ORBITNTNU",
    site: "@ORBITNTNU",
    images: ["https://orbitntnu.com/orbitbig.jpg"],
  },

  alternates: {
    canonical: "https://orbitntnu.com/",
    languages: {
      "en-US": "https://orbitntnu.com/",
      "no-NO": "https://orbitntnu.com/no/",
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/faviconTest/test_charcoal_with_yellow.svg",
    shortcut: "/faviconTest/test_charcoal_with_yellow.svg",
    apple: "/faviconTest/test_charcoal_with_yellow.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavbarProvider>
          <Navbar />
          <div className="relative flex flex-col mx-auto min-h-screen gap-40 md:gap-60 z-10 overflow-x-clip">
            <StarBackground />
            {children}
          </div>
          <Footer />
        </NavbarProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/General/Layout/Navbar";
import { Footer } from "@/components/General/Layout/Footer";
import { useMemo } from "react";

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

function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      const topPercent = Math.random() * 100;
      const opacity = Math.max(0, 1 - topPercent / 90);
      if (opacity <= 0) return null;
      return {
        id: i,
        size,
        top: `${topPercent}%`,
        left: `${Math.random() * 100}%`,
        opacity,
      };
    });
  }, []); // runs only once per mount

  return (
    <div className="absolute inset-0 pointer-events-none max-w-screen h-full overflow-hidden">
      {stars.map(
        (star) =>
          star && (
            <div
              key={star.id}
              className="bg-cloud-white rounded-full absolute"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: star.top,
                left: star.left,
                opacity: star.opacity,
              }}
            />
          ),
      )}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="relative flex flex-col mx-auto min-h-screen pb-20 md:pb-40 gap-20 md:gap-40 z-10">
          <StarBackground />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

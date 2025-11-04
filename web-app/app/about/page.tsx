import { getAboutPage } from "@/sanity/fetch/SanityFetch";
import AboutClientPage from "./AboutClientPage";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "How does student send a satellite to space?",
  description:
    "We are ORBIT NTNU, a student-driven satellite organization at the Norwegian University of Science and Technology (NTNU).",
  keywords: [
    "sponsors",
    "partners",
    "supporters",
    "KSAT",
    "Kongsberg",
    "ORBIT",
  ],

  authors: [{ name: "ORBITNTNU", url: "https://orbitntnu.com" }],
  creator: "ORBIT - WEB",
  publisher: "ORBIT",
  category: "Nonprofit",

  openGraph: {
    title: "About Orbit NTNU",
    description:
      "We are ORBIT NTNU, a student-driven satellite organization at the Norwegian University of Science and Technology (NTNU).",
    url: "https://orbitntnu.com/sponsors",
    siteName: "ORBITNTNU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "About Orbit NTNU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How does student send a satellite to space?",
    description:
      "We are ORBIT NTNU, a student-driven satellite organization at the Norwegian University of Science and Technology (NTNU).",
    creator: "@YourTwitterHandle",
    site: "@YourTwitterHandle",
    images: ["https://yoursite.com/og/sponsors-og-image.jpg"],
  },
  alternates: {
    canonical: "https://yoursite.com/about",
    languages: {
      "en-US": "https://yoursite.com/about",
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
};

const AboutPage = async () => {
  const data = await getAboutPage();
  return <AboutClientPage sections={data?.sections ?? []} />;
};

export default AboutPage;

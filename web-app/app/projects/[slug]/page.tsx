import {
  getBigProject,
  getSubOrbitalProject,
} from "@/sanity/fetch/SanityFetch";
import ProjectClientPage from "@/app/projects/ProjectSlugClientPage";
import { Metadata } from "next";
import { Loading } from "@/components/General/Layout/Loading";
export const metadata: Metadata = {
  title: "Selfiesat | Framsat | Framsat 1.5 | Biosat",
  description: "",

  keywords: [
    "selfiesat",
    "framsat",
    "biosat",
    "nextsat",
    "sub-orbital",
    "ORBIT",
  ],

  authors: [{ name: "ORBITNTNU", url: "https://orbitntnu.com" }],
  creator: "ORBIT - WEB",
  publisher: "ORBIT",
  category: "Nonprofit",

  openGraph: {
    title: "",
    description: "",
    url: "https://orbitntnu.com/sponsors",
    siteName: "ORBITNTNU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
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

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}
export const revalidate = 5;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const BigProject = await getBigProject(slug);
  const SubOrbitalProject = await getSubOrbitalProject(slug);

  const project = BigProject ?? SubOrbitalProject;

  if (!project) {
    return <Loading />;
  }

  return <ProjectClientPage project={project} />;
}

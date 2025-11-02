import { getBigProject } from "@/sanity/fetch/SanityFetch";
import ProjectClientPage from "@/app/projects/ProjectClientPage";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateMetadata(
    { params }: ProjectPageProps
): Promise<{
  twitter: { creator: string; site: string; images: (typeof Image | string)[]; description: string; title: string; card: string };
  description: string;
  title: string;
  openGraph: {
    images: { width: number; alt: string; url: typeof Image | string; height: number }[];
    description: string;
    siteName: string;
    title: string;
    locale: string;
    type: string;
    url: string
  };
  alternates: { languages: { "en-US": string }; canonical: string }
}> {
  const project = await getBigProject(params.slug);

  const projectTitle = project?.title || params.slug;

  const url = `https://orbitntnu.com/projects/${params.slug}`;

  return {
    title: `${projectTitle} | ORBIT NTNU`,
    description: "",
    openGraph: {
      title: `${projectTitle} | ORBIT NTNU`,
      description: "",
      url,
      siteName: "ORBIT NTNU",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: project?.image.asset._ref || "https://web-public-website.vercel.app/selfiesat/1.JPG",
          width: 1200,
          height: 630,
          alt: projectTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectTitle} | ORBIT NTNU`,
      description: "",
      creator: "@ORBITNTNU",
      site: "@ORBITNTNU",
      images: [project?.image.asset._ref || "https://web-public-website.vercel.app/selfiesat/1.JPG"],
    },
    alternates: {
      canonical: url,
      languages: { "en-US": url },
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getBigProject(params.slug);

  if (!project) {
    return <div className="text-cloud-white">Project not found</div>;
  }

  return <ProjectClientPage project={project} />;
}

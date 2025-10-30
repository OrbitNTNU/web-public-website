// app/projects/[slug]/page.tsx
import { getBigProject } from "@/sanity/fetch/SanityFetch";
import ProjectClientPage from "@/app/projects/ProjectClientPage";

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getBigProject(params.slug);

  if (!project) {
    return <div className="">Project not found</div>;
  }

  return <ProjectClientPage project={project} />;
}

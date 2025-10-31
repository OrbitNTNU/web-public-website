import { getAllBigProjects } from "@/sanity/fetch/SanityFetch";
import ProjectsOverviewClient from "@/app/projects/ProjectPage";

export default async function ProjectsPage() {
  const projects = await getAllBigProjects();

  return <ProjectsOverviewClient projects={projects} />;
}

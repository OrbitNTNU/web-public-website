import { getBigProject } from "@/sanity/fetch/SanityFetch";
import ProjectsOverviewPage from "@/app/projects/page";

export default async function ProjectsOverviewServer({ params }: { params: { slug: string } }) {
    const projects = await getBigProject(params.slug);

    return <ProjectsOverviewPage projects={projects} />;
}

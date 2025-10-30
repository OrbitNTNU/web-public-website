"use client";

import { BigProject } from "@/sanity/types/project";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import BannerImage from "@/components/General/BannerImage";
import { Loading } from "@/components/Loading";

interface ProjectClientPageProps {
    project: BigProject;
}

const ProjectClientPage = ({ project }: ProjectClientPageProps) => {
    if (!project) return <Loading />;

    const isBiosat = project.slug.current === "biosat";

    return (
        <div className="w-full mx-auto px-4 py-16">
            {project.sections.map((section) => {
                switch (section._type) {
                    case "bannerImage":
                        return (
                            <BannerImage
                                key={section._key}
                                backgroundSrc={imageBuilder(section.image.asset._ref)}
                                patchSrc={imageBuilder(project.patch)}
                                colors={project.gradientColors}
                                isBiosat={isBiosat}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default ProjectClientPage;

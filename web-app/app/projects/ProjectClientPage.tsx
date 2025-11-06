"use client";

import { BigProject } from "@/sanity/types/project";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import BannerImage from "@/components/General/BannerImage";
import { Loading } from "@/components/Loading";
import { useNavbar } from "@/components/General/Layout/NavbarContext";
import { useEffect } from "react";

interface ProjectClientPageProps {
  project: BigProject;
}

const ProjectClientPage = ({ project }: ProjectClientPageProps) => {

  const { setInfo, resetInfo } = useNavbar();
  
    useEffect(() => {
      // Set the navbar info based on the project
      setInfo({
        baseHref: "/projects",
        detailedLocation: project?.title,
      });
  
      // Reset navbar info when leaving
      return () => resetInfo();
    }, [project]);

  const isBiosat = project.slug.current === "biosat";

  if (!project) return <Loading />;

  return (
    <div className="w-full mx-auto px-4 py-16">
      {project?.sections?.map((section) => {
        switch (section._type) {
          case "bannerImage":
            return (
              <BannerImage
                key={section._key}
                backgroundSrc={imageBuilder(section.image.asset._ref)}
                patchSrc={imageBuilder(project.patch)}
                colors={project.gradientColors ?? []}
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

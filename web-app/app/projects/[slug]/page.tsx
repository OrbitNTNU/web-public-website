'use client';
import { Loading } from "@/components/Loading";
import { fetchBigProjectBySlug } from "@/sanity/queries/projects";
import { BigProject } from "@/sanity/types/project";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BannerImage from "./BannerImage";
import { imageBuilder } from "@/sanity/utils/imageBuilder"

const ProjectPage = () => {
    const slug = useParams().slug?.toString() || "";

    const [projectPage, setProjectPage] = useState<BigProject | null>(null)
    
      useEffect(() => {
        void fetchBigProjectBySlug(slug).then((data) => {
          setProjectPage(data || null)
        })
      }, [])    

    if(!projectPage) {
        return <Loading/>;
    }

    const isBiosat = projectPage.slug.current === "biosat";

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
            {projectPage.sections.map((section) => {
                switch (section._type) {
                    case "bannerImage":
                        return (
                            <BannerImage
                                key={section._key}
                                backgroundSrc={imageBuilder(section.image.asset._ref)}
                                patchSrc={imageBuilder(projectPage.patch)}
                                colors={projectPage.gradientColors}
                                isBiosat={isBiosat}
                            />
                        )
                    default:
                        return null;
                }
            })}
        </div>
    )
}

export default ProjectPage;
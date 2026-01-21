"use client";

import { BigProject, SubOrbitalProject } from "@/sanity/types/project";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import BannerImage from "@/components/General/BannerImage";
import { Loading } from "@/components/General/Layout/Loading";
import { useNavbar } from "@/components/General/Layout/NavbarContext";
import { useEffect } from "react";
import LargeImage from "@/components/General/LargeImage";
import SpanningText from "@/components/General/SpanningText";
import DoubleImages from "@/components/General/DoubleImages";
import LargeQuote from "@/components/General/LargeQuote";
import ImageAndCaption from "@/components/General/ImageAndCaption";

interface ProjectClientPageProps {
  project: BigProject | SubOrbitalProject;
}

export default function ProjectClientPage({ project }: ProjectClientPageProps) {
  const { setInfo, resetInfo } = useNavbar();

  useEffect(() => {
    setInfo({
      baseHref: "/projects",
      detailedLocation: project?.title,
    });
    return () => resetInfo();
  }, [project]);

  const isBiosat = project.slug.current === "biosat";

  if (!project) return <Loading />;

  return (
    <div className="w-full mx-auto px-4 py-16 gap-20 md:gap-40 flex flex-col">
      {project?.sections?.map((section) => {
        switch (section._type) {
          case "bannerImage":
            return (
              <div className="h-screen" key={section._key}>
                <BannerImage
                  key={section._key}
                  backgroundSrc={imageBuilder(section.image.asset._ref)}
                  patchSrc={imageBuilder(project.patch)}
                  colors={
                    project._type === "bigProject"
                      ? (project.gradientColors ?? [])
                      : []
                  }
                  isBiosat={isBiosat}
                />
              </div>
            );
          case "largeImage":
            return (
              <LargeImage
                key={section._key}
                src={imageBuilder(section.image)}
                alt={section.alt}
                caption={section.caption}
              />
            );
          case "spanningText":
            return <SpanningText key={section._key} text={section.text} />;
          case "doubleImage":
            return (
              <DoubleImages
                key={section._key}
                title1={section.title1}
                caption1={section.caption1}
                src1={imageBuilder(section.image1)}
                alt1={section.alt1 ?? ""}
                title2={section.title2}
                caption2={section.caption2}
                src2={imageBuilder(section.image2)}
                alt2={section.alt2 ?? ""}
                variant={section.variant}
              />
            );
          case "doubleImageCollage":
            return (
              <section key={section._key} className="flex flex-col gap-12">
                {section.items?.map((item) => (
                  <DoubleImages
                    key={item._key || Math.random().toString()}
                    variant={item.variant}
                    src1={imageBuilder(item.image1)}
                    alt1={item.alt1 ?? ""}
                    title1={item.title1}
                    caption1={item.caption1}
                    link1={item.link1}
                    src2={imageBuilder(item.image2)}
                    alt2={item.alt2 ?? ""}
                    title2={item.title2}
                    caption2={item.caption2}
                    link2={item.link2}
                  />
                ))}
              </section>
            );
          case "largeQuote":
            return (
              <LargeQuote
                key={section._key}
                text={section.quote}
                author={section.author}
              />
            );
          case "imageAndCaption":
            return (
              <ImageAndCaption
                key={section._key}
                src={imageBuilder(section.src)}
                alt={section.alt}
                title={section.title}
                caption={section.caption}
                wideCaption={section.wideCaption}
                variant={section.variant}
              />
            );

          case "singleImageCollage":
            return (
              <section key={section._key} className="flex flex-col gap-12">
                {section.items?.map((item, idx) => (
                  <ImageAndCaption
                    key={idx}
                    src={imageBuilder(item.src)}
                    alt={item.alt}
                    title={item.title}
                    caption={item.caption}
                    variant={item.variant}
                  />
                ))}
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

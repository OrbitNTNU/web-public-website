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
import Specifications from "@/components/General/Specifications";
import Pm from "@/components/General/Pm";
import PlantDots from "@/components/General/PlantDots";

interface ProjectClientPageProps {
    project: BigProject | SubOrbitalProject;
}

export default function ProjectClientPage({
                                              project,
                                          }: ProjectClientPageProps) {
    const { setInfo } = useNavbar();

    useEffect(() => {
        if (!project) return;

        setInfo({
            baseHref: "/projects",
            detailedLocation: project.title,
        });

        return () => {
            setInfo({});
        };
    }, [project, setInfo]);

    if (!project) return <Loading />;

    const isBiosat = project.slug?.current === "biosat";

    return (
        <div className="relative w-full">
            {project.sections?.map((section) =>
                section._type === "bannerImage" ? (
                    <BannerImage
                        key={section._key}
                        backgroundSrc={imageBuilder(section.image.asset._ref, {
                            width: 2500,
                            quality: 75,
                            format: "webp",
                        })}
                        patchSrc={imageBuilder(project.patch, {
                            width: 3000,
                            quality: 75,
                            format: "webp",
                        })}
                        colors={
                            project._type === "bigProject"
                                ? project.gradientColors ?? []
                                : []
                        }
                        isBiosat={isBiosat}
                    />
                ) : null
            )}
            {isBiosat && (
                <div
                    className="relative w-full pointer-events-none"
                    style={{
                        top: "95vh",

                    }}
                >
                    <PlantDots speed={0.15} />
                </div>
            )}

            <div className="relative z-10 pt-[110vh] flex flex-col gap-20 md:gap-40">

                {project.sections?.map((section) => {
                    if (section._type === "bannerImage") return null;

                    switch (section._type) {
                        case "largeImage":
                            return (
                                <LargeImage
                                    key={section._key}
                                    src={imageBuilder(section.image, {
                                        width: 1800,
                                        quality: 75,
                                        format: "webp",
                                    })}
                                    alt={section.alt}
                                    caption={section.caption}
                                />
                            );

                        case "spanningText":
                            return (
                                <SpanningText key={section._key} text={section.text} />
                            );

                        case "doubleImage":
                            return (
                                <DoubleImages
                                    key={section._key}
                                    title1={section.title1}
                                    caption1={section.caption1}
                                    src1={imageBuilder(section.image1, {
                                        width: 1800,
                                        quality: 75,
                                        format: "webp",
                                    })}
                                    alt1={section.alt1 ?? ""}
                                    title2={section.title2}
                                    caption2={section.caption2}
                                    src2={imageBuilder(section.image2, {
                                        width: 1800,
                                        quality: 75,
                                        format: "webp",
                                    })}
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
                                            src1={imageBuilder(item.image1, {
                                                width: 1800,
                                                quality: 75,
                                                format: "webp",
                                            })}
                                            alt1={item.alt1 ?? ""}
                                            title1={item.title1}
                                            caption1={item.caption1}
                                            link1={item.link1}
                                            src2={imageBuilder(item.image2, {
                                                width: 1800,
                                                quality: 75,
                                                format: "webp",
                                            })}
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
                                    src={imageBuilder(section.src, {
                                        width: 1800,
                                        quality: 75,
                                        format: "webp",
                                    })}
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
                                            src={imageBuilder(item.src, {
                                                width: 1800,
                                                quality: 75,
                                                format: "webp",
                                            })}
                                            alt={item.alt}
                                            title={item.title}
                                            caption={item.caption}
                                            variant={item.variant}
                                        />
                                    ))}
                                </section>
                            );

                        case "pmSection":
                            return (
                                <Pm
                                    key={section._key}
                                    title={section.title}
                                    description={section.description}
                                    pmCards={section.pmCards ?? []}
                                />
                            );

                        case "specificationSection":
                            return (
                                <Specifications
                                    key={section._key}
                                    title={section.title}
                                    specifications={section.specifications}
                                    image={imageBuilder(section.image)}
                                    testInfo={section?.testInfo}
                                />
                            );

                        default:
                            return null;
                    }
                })}

            </div>
        </div>
    );
}
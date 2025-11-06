"use client";

import { Loading } from "@/components/Loading";
import { BigProject, SubOrbitalProject } from "@/sanity/types/project";
import Projects from "@/components/General/Projects";
import SubOrbital from "@/components/General/SubOrbital";
import DoubleImages from "@/components/General/DoubleImages";
import Header from "@/components/General/Header";

interface ProjectsOverviewClientProps {
    BigProjects: BigProject[];
    SubOrbitalProjects: SubOrbitalProject[];
}

export default function ProjectsOverviewClient({
                                                   BigProjects,
                                                   SubOrbitalProjects,
                                               }: ProjectsOverviewClientProps) {
    if (!BigProjects && !SubOrbitalProjects) return <Loading />;

    return (
        <div className="w-full relative max-w-[2000px] mx-auto gap-20 md:gap-40 my-40 flex flex-col">
            <Header
                title="Our Projects"
                subtitle=" - Pushing the boundaries of student-led space innovation.
        Our projects range from Selfie-taking CubeSats to high-altitude suborbital flights."
            />

            {BigProjects.length > 0 && <Projects projects={BigProjects} />}
            {SubOrbitalProjects.length > 0 && <SubOrbital projects={SubOrbitalProjects} />}

            <section className="flex flex-col gap-12">
                <DoubleImages
                    variant="two-third-one-third"
                    src1="/tests/1.png"
                    alt1="Orbit NTNU members working on a satellite"
                    title1="Building Satellites, Building Skills"
                    caption1="At Orbit NTNU, every project is a hands-on learning experience..."
                    src2="/tests/2.png"
                    alt2="Orbit NTNU outreach event"
                    title2="Inspiring the Next Generation"
                    caption2="We believe in the power of inspiration..."
                />

                <DoubleImages
                    variant="one-third-two-third"
                    src1="/tests/1.png"
                    alt1="Orbit NTNU members working on a satellite"
                    title1="Collaborative Engineering"
                    caption1="Where students learn together..."
                    src2="/tests/2.png"
                    alt2="Outreach event"
                    title2="Community and Growth"
                    caption2="We grow by lifting each other up."
                />
            </section>
        </div>
    );
}

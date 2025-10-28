"use client";
import { Loading } from "@/components/Loading";
import { fetchAllBigProjects } from "@/sanity/queries/projects";
import { BigProject } from "@/sanity/types/project";
import { useEffect, useState } from "react";
import Projects from "@/components/General/Projects";
import SubOrbital from "@/components/General/SubOrbital";
import DoubleImages from "@/components/General/DoubleImages";
import LargeImage from "@/components/General/LargeImage";
import JoinCard from "@/components/General/JoinCard";
import ForSponsorsCard from "@/components/General/ForSponsorsCard";
import Header from "@/components/General/Header";

const ProjectsOverviewPage = () => {
  const [projects, setProjects] = useState<BigProject[] | null>(null);

  useEffect(() => {
    void fetchAllBigProjects().then((data) => {
      setProjects(data || null);
    });
  }, []);

  if (!projects) {
    return <Loading />;
  }

  return (
    <div className="w-full relative max-w-[2000px] mx-auto gap-20 md:gap-40 my-40 flex flex-col">
      <Header
        title="Our Projects"
        subtitle=" - Pushing the boundaries of student-led space innovation. Our projects range from Selfie-taking CubeSats to high-altitude suborbital flights, each designed and built by our passionate members."
      />
      <Projects projects={projects} />
      <SubOrbital />
      <section className="flex flex-col gap-12">
        <DoubleImages
          variant="two-third-one-third"
          src1="/tests/1.png"
          alt1="Orbit NTNU members working on a satellite"
          title1="Building Satellites, Building Skills"
          caption1="At Orbit NTNU, every project is a hands-on learning experience. Our members gain invaluable skills in satellite design, engineering, and project management, preparing them for future careers in the space industry."
          src2="/tests/2.png"
          alt2="Orbit NTNU outreach event with children"
          title2="Inspiring the Next Generation"
          caption2="We believe in the power of inspiration. Through our outreach programs, we engage with students and the community to spark interest in space technology and STEM fields."
        />
        <DoubleImages
          variant="one-third-two-third"
          src1="/tests/1.png"
          alt1="Orbit NTNU members working on a satellite"
          title1="Building Satellites, Building Skills"
          caption1="At Orbit NTNU, every project is a hands-on learning experience. Our members gain invaluable skills in satellite design, engineering, and project management, preparing them for future careers in the space industry."
          src2="/tests/2.png"
          alt2="Orbit NTNU outreach event with children"
          title2="Inspiring the Next Generation"
          caption2="We believe in the power of inspiration. Through our outreach programs, we engage with students and the community to spark interest in space technology and STEM fields."
        />
      </section>
      {/* <JoinCard />
            <ForSponsorsCard /> */}
    </div>
  );
};

export default ProjectsOverviewPage;

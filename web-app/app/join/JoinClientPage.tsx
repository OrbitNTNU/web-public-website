"use client";

import { JoinPage } from "@/sanity/types/pages/joinPage";
import Header from "@/components/General/Header";
import JoinCard from "./JoinCard";

interface JoinClientPageProps {
  content: {
    title: string;
    text: string;
    buttons: {
      buttonLink: string;
      buttonText: string;
      icon: string;
    }[];
    images: string[];
  };
  joinPage: JoinPage;
}

const JoinClientPage = ({ content, joinPage }: JoinClientPageProps) => {
  return (
    <div className="w-full relative max-w-[2000px] mx-auto gap-0 md:gap-20 my-24 flex flex-col">
      <Header
        title="Join Us and Make a Difference"
        subtitle="We’re always looking for passionate people - apply for a listed role or reach out if your interests fit Orbit NTNU in another way."
      />
      <div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center gap-6 sm:gap-y-12">
        {joinPage.components.sort((a, b) => a.header.localeCompare(b.header)).map((position, idx) => (
          <JoinCard key={idx} position={position} link={joinPage.applyLink} />
        ))}
      </div>
    </div>
  )
};

export default JoinClientPage;

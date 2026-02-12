"use client";

import { JoinPage } from "@/sanity/types/pages/joinPage";
import Header from "@/components/General/Header";
import JoinCard from "../../components/JoinPage/JoinCard";
import GroupSelector from "@/components/JoinPage/GroupSelector";
import { useRef, useState } from "react";

interface JoinClientPageProps {
  joinPage: JoinPage;
  teamInfo: {
    name: string;
    teamID: number;
    group: string;
    slug: string;
  }[];
}

const JoinClientPage = ({
  joinPage,
  teamInfo,
}: JoinClientPageProps) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  const preserveScroll = (fn: () => void) => {
    if (!contentRef.current) {
      fn();
      return;
    }

    const containerTop = contentRef.current.offsetTop;
    const scrollOffset = window.scrollY - containerTop;

    fn();

    requestAnimationFrame(() => {
      window.scrollTo({
        top: containerTop + scrollOffset,
        behavior: "auto",
      });
    });
  };

  const handleGroupToggle = (group: string) => {
    preserveScroll(() => {
      setSelectedGroups((prev) =>
        prev.includes(group)
          ? prev.filter((g) => g !== group)
          : [...prev, group],
      );
    });
  };
  const allGroups = Array.from(new Set(teamInfo.map((team) => team.group)));

  const filteredPositions =
    selectedGroups.length > 0
      ? joinPage.components.filter((position) => {
          const team = teamInfo.find(
            (team) => Number(team.teamID) === Number(position.team),
          );
          return team ? selectedGroups.includes(team.group) : false;
        })
      : joinPage.components;

  return (
    <div className="w-full relative max-w-[2000px] mx-auto gap-0 md:gap-20 my-40 flex flex-col">
      <Header
        title="Join Us and Make a Difference"
        subtitle="We're always looking for passionate people - apply for a listed role or reach out if your interests fit Orbit NTNU in another way."
      />
      {allGroups.length > 0 && (
        <GroupSelector
          groups={allGroups}
          selectedGroups={selectedGroups}
          handleGroupToggle={handleGroupToggle}
        />
      )}
      <div
        ref={contentRef}
        className="px-4 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center gap-4 sm:gap-y-12"
      >
        {filteredPositions
          .sort((a, b) => a.header.localeCompare(b.header))
          .map((position, idx) => (
            <JoinCard key={idx} position={position} link={joinPage.applyLink} />
          ))}
      </div>
    </div>
  );
};

export default JoinClientPage;

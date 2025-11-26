"use client";

import { useEffect, useRef, useState } from "react";
import TeamsControls from "@/components/TeamsPage/TeamsControls";
import ListView from "@/components/TeamsPage/Views/ListView";
import TraditionalView from "@/components/TeamsPage/Views/TraditionalView";
import GalleryView from "@/components/TeamsPage/Views/GalleryView";
import Header from "@/components/General/Header";
import { Loading } from "@/components/General/Layout/Loading";

export interface Member {
  name: string;
  title: string;
  mail?: string;
  phoneNumber?: string;
  linkedin?: string;
  showPhoneNrOnWebsite: boolean;
  privilege: string;
  image?: string;
}

export interface Team {
  teamID: number;
  group: string;
  description: string;
  teamName: string;
  members: Member[];
}

export default function TeamsClientPage({
  initialTeamsData,
}: {
  initialTeamsData: Team[] | null;
}) {
  const [teamsData] = useState<Team[] | null>(initialTeamsData);
  const [loading] = useState<boolean>(!initialTeamsData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "gallery" | "traditional">(
    "traditional",
  );
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setMaxHeight((prev) => Math.max(prev, el.scrollHeight));
    }
  }, [viewMode, teamsData, searchTerm]);

  if (loading) return <Loading />;

  if (!teamsData)
    return <div className="text-cloud-white">No team data available.</div>;

  return (
    <div className="w-full relative max-w-[2000px] mx-auto gap-20 my-24 flex flex-col">
      <Header
        title="Teams and Members"
        subtitle="Our teams are the heartbeat of Orbit. Each one brings together diverse skills, perspectives, and passions to push ideas into reality."
      />

      <section className="w-full gap-20 flex flex-col">
        <TeamsControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </section>
      <section style={{ minHeight: maxHeight }}>
        <div ref={contentRef}>
          {viewMode === "traditional" && (
            <TraditionalView teamsData={teamsData} />
          )}
          {viewMode === "gallery" && (
            <GalleryView teamsData={teamsData} searchTerm={searchTerm} />
          )}
          {viewMode === "list" && <ListView teamsData={teamsData} />}
        </div>
      </section>
    </div>
  );
}

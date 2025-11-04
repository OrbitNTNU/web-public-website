"use client";

import { useState } from "react";
import TeamsControls from "@/components/TeamsPage/TeamsControls";
import SearchFilters from "@/components/TeamsPage/SearchFilters";
import GridView from "@/components/TeamsPage/Views/GridView";
import ListView from "@/components/TeamsPage/Views/ListView";
import TraditionalView from "@/components/TeamsPage/Views/TraditionalView";
import MemberView from "@/components/TeamsPage/Views/MembersView";
import GalleryView from "@/components/TeamsPage/Views/GalleryView";
import Header from "@/components/General/Header";
import { Loading } from "@/components/Loading";

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

const filters = ["Group", "Team", "Position"];

export default function TeamsClientPage({
  initialTeamsData,
}: {
  initialTeamsData: Team[] | null;
}) {
  const [teamsData] = useState<Team[] | null>(initialTeamsData);
  const [loading] = useState<boolean>(!initialTeamsData);
  const [activeTeam, setActiveTeam] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<
    "grid" | "list" | "members" | "gallery" | "traditional"
  >("traditional");
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(
    Array(filters.length).fill(false),
  );
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  if (loading) return <Loading />;
  if (!teamsData)
    return <div className="text-cloud-white">No team data available.</div>;

  return (
    <div className="w-full relative max-w-[2000px] mx-auto my-20 md:my-40 flex flex-col">
      <Header
        title="Teams and Members"
        subtitle="Our teams are the heartbeat of Orbit. Each one brings together diverse skills, perspectives, and passions to push ideas into reality."
      />

      <section className="w-full gap-20 flex flex-col pb-20">
        <TeamsControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          setSearchTerm={setSearchTerm}
        />
        <SearchFilters
          teamsData={teamsData}
          filters={filters}
          openDropdowns={openDropdowns}
          setOpenDropdowns={setOpenDropdowns}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </section>

      {viewMode === "grid" && (
        <GridView
          teamsData={teamsData}
          searchTerm={searchTerm}
          selectedFilters={selectedFilters}
        />
      )}
      {viewMode === "list" && (
        <ListView
          teamsData={teamsData}
          searchTerm={searchTerm}
          selectedFilters={selectedFilters}
          setActiveTeam={setActiveTeam}
          activeTeam={activeTeam}
        />
      )}
      {viewMode === "members" && (
        <MemberView
          teamsData={teamsData}
          searchTerm={searchTerm}
          selectedFilters={selectedFilters}
        />
      )}
      {viewMode === "traditional" && (
        <TraditionalView
          teamsData={teamsData}
          searchTerm={searchTerm}
          selectedFilters={selectedFilters}
        />
      )}
      {viewMode === "gallery" && (
        <GalleryView
          teamsData={teamsData}
          searchTerm={searchTerm}
          selectedFilters={selectedFilters}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import TeamsControls from "@/components/TeamsPage/TeamsControls";
import ListView from "@/components/TeamsPage/Views/ListView";
import TraditionalView from "@/components/TeamsPage/Views/TraditionalView";
import GalleryView from "@/components/TeamsPage/Views/GalleryView";
import Header from "@/components/General/Header";
import { Loading } from "@/components/General/Layout/Loading";
import TeamSelector from "@/components/TeamsPage/TeamSelector";

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
  const [activeTeam, setActiveTeam] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "gallery" | "traditional">(
    "traditional",
  );
  const [selectedTeamID, setSelectedTeamID] = useState<number>(1);

  useEffect(() => {
    if (searchTerm !== "") {
      setViewMode("gallery");
    }
    if (viewMode !== "gallery") {
      setSearchTerm("");
    }
  }, [searchTerm, viewMode]);

  if (loading) return <Loading />;

  const handleTeamChange = (teamID: number) => {
    setSelectedTeamID(teamID);
  };

  if (!teamsData)
    return <div className="text-cloud-white">No team data available.</div>;

  return (
    <div className="w-full relative max-w-[2000px] mx-auto py-20 md:py-40 flex flex-col bg-charcoal">
      <Header
        title="Teams and Members"
        subtitle="Our teams are the heartbeat of Orbit. Each one brings together diverse skills, perspectives, and passions to push ideas into reality."
      />

      <section className="w-full gap-20 flex flex-col pb-20">
        <TeamsControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {viewMode === "traditional" && (
          <TeamSelector
            teamsData={teamsData}
            selectedTeamID={selectedTeamID}
            handleTeamChange={handleTeamChange}
          />
        )}
      </section>
      {viewMode === "traditional" && (
        <TraditionalView
          team={teamsData.find((team) => team.teamID === selectedTeamID)!}
        />
      )}
      {viewMode === "gallery" && (
        <GalleryView teamsData={teamsData} searchTerm={searchTerm} />
      )}
      {viewMode === "list" && (
        <ListView
          teamsData={teamsData}
          setActiveTeam={setActiveTeam}
          activeTeam={activeTeam}
        />
      )}
    </div>
  );
}

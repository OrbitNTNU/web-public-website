"use client";

import { useEffect, useState } from "react";
import TeamsControls from "../../components/TeamsPage/TeamsControls";
import SearchFilters from "../../components/TeamsPage/SearchFilters";
import GridView from "../../components/TeamsPage/Views/GridView";
import ListView from "../../components/TeamsPage/Views/ListView";
import MemberView from "../../components/TeamsPage/Views/MembersView";
import { Loading } from "../../components/Loading";
import { fetchTeamSlug } from "@/sanity/queries/teams";
import GalleryView from "@/components/TeamsPage/Views/GalleryView";
import Header from "@/components/General/Header";

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

export const groupColors: Record<string, string> = {
  IT: "color-orange-sherbert",
  TECHNICAL: "color-emerald-fizz",
  ADMINISTRATIVE: "color-sky-mint",
  MENTORS: "color-laser-lemon",
  DAILY_OPERATIONS: "color-pink-blast",
  FINANCIAL: "color-yellow-400",
  MARKETING_AND_EVENT: "color-purple-400",
  SUPPORT: "color-blue-400",
  default: "color-emerald-fizz",
};

export const getSlug = async (teamID: number): Promise<string> => {
  const data = await fetchTeamSlug(teamID);
  const slug = data?.slug?.current || "";
  return slug;
};

const filters = ["Group", "Team", "Position"];

const Teams = () => {
  const [teamsData, setTeamsData] = useState<Team[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTeam, setActiveTeam] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<
    "grid" | "list" | "members" | "gallery"
  >("members");
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(
    Array(filters.length).fill(false),
  );
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    setOpenDropdowns(Array(filters.length).fill(false));
  }, []);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams");
        if (response.status === 200) {
          const teamsData = (await response.json()).teams;
          setTeamsData(teamsData);
        } else {
          console.error(`Error: Received status code ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) return <Loading />;
  if (!teamsData)
    return <div className="text-cloud-white">No team data available.</div>;

  return (
    <div className="w-full relative max-w-[2000px] mx-auto my-40 flex flex-col">
      {/* Star pattern background */}
      <Header
        title="Teams and Members"
        subtitle="Our teams are the heartbeat of Orbit. Each one brings together diverse skills, perspectives, and passions to push ideas into reality."
      />
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
      {viewMode === "gallery" && (
        <GalleryView
          teamsData={teamsData}
          searchTerm={searchTerm}
          selectedFilters={selectedFilters}
        />
      )}
    </div>
  );
};

export default Teams;

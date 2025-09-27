'use client';
import { Loading } from "@/components/Loading";
import GridView from "@/components/TeamsPage/Views/GridView";
import ListView from "@/components/TeamsPage/Views/ListView";
import SearchFilters from "@/components/TeamsPage/SearchFilters";
import TeamsControls from "@/components/TeamsPage/TeamsControls";
import TeamsPageHeader from "@/components/TeamsPage/TeamsPageHeader";
import React, { useEffect, useState } from "react";
import MemberView from "@/components/TeamsPage/Views/MembersView";

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

const filters = [
    "Group",
    "Team",
    "Position",
];

const Teams = () => {
    const [teamsData, setTeamsData] = useState<Team[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTeam, setActiveTeam] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [viewMode, setViewMode] = useState<"grid" | "list" | "members">("members");
    const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(Array(filters.length).fill(false));
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        setOpenDropdowns(Array(filters.length).fill(false));
    }, []);

    // Fetch teams
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo');
                if (response.status === 200) {
                    const teamsData = (await response.json()).result.data.json;
                    setTeamsData(teamsData);
                } else {
                    console.error(`Error: Received status code ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    if (loading) return <Loading />;
    if (!teamsData) return <div className="text-cloud-white">No team data available.</div>;

    return (
        <div className="w-full">
            <TeamsPageHeader />
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
        </div>
    );
};

export default Teams;

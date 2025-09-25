'use client';
import { Loading } from "@/components/Loading";
import MemberCard from "@/components/MemberCard";
import React, { useEffect, useState } from "react";

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

const filters = ["Team", "Position", "Group"];

const Teams = () => {
    const [teamsData, setTeamsData] = useState<Team[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [activeTeam, setActiveTeam] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(Array(filters.length).fill(false));

    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

    // This effect is needed to reset dropdowns if filters length changes
    useEffect(() => {
        setOpenDropdowns(Array(filters.length).fill(false));
    }, [filters.length]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo');

                if (response.status === 200) {
                    // Navigate to the actual data inside the response
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

    if (loading) {
        return <Loading />;
    }

    const teamsWithSearch = teamsData?.filter(team =>
        team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const groupsWithSearch = Array.from(new Set(teamsWithSearch?.map(team => team.group) ?? []));

    return (
        <div className="w-full">
            <section className="my-40">
                <div className="w-full md:w-3/4">
                    <span className="text-2xl text-slate md:text-5xl">Teams and Members</span>
                    <span className="block text-2xl text-cloud-white sm:ml-2 sm:inline md:text-5xl">
                        Our teams are the heartbeat of Orbit. Each one brings together diverse skills, perspectives, and passions to push ideas into reality.
                    </span>
                </div>
            </section>
            {/* Controls (unchanged) */}
            <section className="flex flex-row items-center justify-between mb-8">
                <div className="flex space-x-8">
                    <button
                        type="button"
                        aria-label="Grid view"
                        className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white ${viewMode === "grid" ? "text-cloud-white" : "text-slate"
                            }`}
                        onClick={() => setViewMode("grid")}
                    >
                        <span className={`group-hover:text-cloud-white material-icons ${viewMode === "grid" ? "text-cloud-white" : "text-slate"}`}>grid_view</span>
                        <span>Grid View</span>
                    </button>
                    <button
                        type="button"
                        aria-label="List view"
                        className={`cursor-pointer group gap-2 flex items-center hover:text-cloud-white ${viewMode === "list" ? "text-cloud-white" : "text-slate"
                            }`}
                        onClick={() => setViewMode("list")}
                    >
                        <span className={`group-hover:text-cloud-white material-icons ${viewMode === "list" ? "text-cloud-white" : "text-slate"}`}>list</span>
                        <span>List View</span>
                    </button>
                </div>
                <div className="flex justify-end flex-1">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border-b w-128 text-right text-xl pb-2 pr-4 bg-transparent text-cloud-white placeholder:text-cloud-white focus:outline-none"
                        onChange={(e) => {
                            const searchTerm = e.target.value.toLowerCase();
                            setSearchTerm(searchTerm);
                        }}
                    />
                        <span className="material-icons ml-2">search</span>
                </div>
            </section>
            <section className="flex flex-row items-center justify-between mb-40 transition-all duration-300">
                <div className="flex flex-1 space-x-24">
                    {/* Manage open state for each filter dropdown */}
                    {(() => {

                        return filters.map((filter, idx) => {
                            // Example options, replace with real data if needed
                            const options = filter === "Team"
                                ? teamsData?.map(team => team.teamName) ?? []
                                : filter === "Group"
                                    ? Array.from(new Set(teamsData?.map(team => team.group.split("_").join(" ")) ?? []))
                                    : Array.from(new Set(teamsData?.flatMap(team => team.members.map(member => member.privilege)) ?? []));

                            return (
                                <div key={filter} className="relative w-48">
                                    <button
                                        type="button"
                                        className="border-b w-full text-left text-base bg-transparent text-cloud-white placeholder:text-cloud-white cursor-pointer flex items-center justify-between"
                                        onClick={() => {
                                            setOpenDropdowns(openDropdowns.map((open, i) => i === idx ? !open : open));
                                        }}
                                    >
                                        <span>{filter}</span>
                                        <span className="material-icons pointer-events-none">
                                            <span className="ml-1">{openDropdowns[idx] ? "arrow_drop_up" : "arrow_drop_down"}</span>
                                        </span>
                                    </button>
                                    <div
                                        className={`mt-2 w-48 rounded flex flex-col py-2 transition-all duration-300 z-10 overflow-hidden`}
                                        style={{
                                            maxHeight: openDropdowns[idx] ? `${options.length * 2.5}rem` : "0",
                                            transition: "max-height 1.3s ease-in-out",
                                        }}
                                    >
                                        {options.map((option, optionIdx) => (
                                            <label
                                                key={option}
                                                className="flex items-center cursor-pointer whitespace-nowrap hover:bg-cloud-dark transition-all duration-300"
                                                style={{
                                                    opacity: openDropdowns[idx] ? 1 : 0,
                                                    transform: openDropdowns[idx] ? "translateY(0)" : "translateY(20px)",
                                                    transition: `opacity 0.4s ease ${optionIdx * 60}ms, transform 0.4s ease ${optionIdx * 60}ms, max-height 0.4s ease`,
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="mr-2 accent-cloud-white hover:accent-berry-blast transition-colors duration-200"
                                                    checked={selectedFilters[filter]?.includes(option) || false}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        setSelectedFilters(prev => {
                                                            const prevOptions = prev[filter] || [];
                                                            let newOptions;
                                                            if (isChecked) {
                                                                newOptions = [...prevOptions, option];
                                                            } else {
                                                                newOptions = prevOptions.filter(opt => opt !== option);
                                                            }
                                                            return { ...prev, [filter]: newOptions };
                                                        });
                                                    }}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </section>
            {teamsData && teamsData.length > 0 ? (
                <table className="min-w-full border-collapse mb-40">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-slate border-b border-slate">Group</th>
                            <th className="px-4 py-2 text-left text-slate border-b border-slate">Team</th>
                            <th className="px-4 py-2 text-slate border-b border-slate text-right">Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(
                            teamsData.reduce<Record<string, Team[]>>((acc, team) => {
                                acc[team.group] = acc[team.group] || [];
                                acc[team.group].push(team);
                                return acc;
                            }, {})
                        )
                            .filter(([groupName]) => groupsWithSearch.includes(groupName) 
                                && (selectedFilters["Group"]?.length ? selectedFilters["Group"].includes(groupName.split("_").join(" ")) : true)
                            )
                            .map(([groupName, teams]: [string, Team[]]) => {
                                return (
                                    <tr key={groupName}>
                                        <td className="w-[240px] px-2 py-4 border-b border-slate text-cloud-white font-semibold align-top">
                                            <button
                                                className="w-full text-left cursor-pointer focus:outline-none"
                                            >
                                                {groupName.split("_").join(" ")}
                                            </button>
                                        </td>
                                        <td className="w-[240px] px-2 py-4 border-slate border-b text-cloud-white align-top">
                                            <div className="flex flex-col">
                                                {teams
                                                    .filter((team) => teamsWithSearch?.includes(team))
                                                    .map((team: Team) => (
                                                        <button
                                                            key={team.teamID}
                                                            className="w-full text-left px-2 py-1 font-medium focus:outline-none text-cloud-white hover:text-pink-blast transition-colors duration-150 cursor-pointer items-center flex"
                                                            onMouseEnter={() => setActiveTeam(team.teamID)}
                                                            onMouseLeave={() => setActiveTeam(null)}
                                                        >
                                                            {team.teamName}
                                                            <span className="material-icons">chevron_right</span>
                                                        </button>
                                                    ))}
                                            </div>
                                        </td>
                                        <td className="px-2 py-4 border-slate border-b text-slate">
                                            <div className="flex flex-wrap gap-x-2 gap-y-2">
                                                {teams
                                                    .flatMap(team => team.members)
                                                    .sort((a, b) => a.name.localeCompare(b.name))
                                                    .filter((member) => teamsWithSearch?.some(team => team.members.includes(member)))
                                                    .map((member: Member, index: number, arr) => (
                                                        <React.Fragment key={index}>
                                                            <span
                                                                className={`cursor-pointer hover:text-cloud-white transition-all duration-300 ease-in-out
    ${activeTeam && teams.some(team => team.teamID === activeTeam && team.members.includes(member))
                                                                        ? "text-emerald-fizz mx-2"
                                                                        : "font-normal text-slate"
                                                                    }`}
                                                            >
                                                                {(() => {
                                                                    if (!searchTerm) return member.name;
                                                                    const lowerName = member.name.toLowerCase();
                                                                    const lowerSearch = searchTerm.toLowerCase();
                                                                    const idx = lowerName.indexOf(lowerSearch);
                                                                    if (idx === -1) return member.name;
                                                                    return (
                                                                        <span className="whitespace-nowrap group transition-all ease-in-out hover:text-cloud-white">
                                                                            {member.name.slice(0, idx)}
                                                                            <span className="text-berry-blast duration-300 group-hover:text-cloud-white"
                                                                            >
                                                                                {member.name.slice(idx, idx + searchTerm.length)}
                                                                            </span>
                                                                            {member.name.slice(idx + searchTerm.length)}
                                                                        </span>
                                                                    );
                                                                })()}
                                                            </span>
                                                        </React.Fragment>
                                                    ))}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            ) : (
                <div className="text-cloud-white">No teams found.</div>
            )}
        </div>
    );
};

export default Teams;

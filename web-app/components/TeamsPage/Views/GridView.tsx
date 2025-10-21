'use client";'
import { motion } from "framer-motion";
import { getSlug, groupColors, Team } from "../../../app/team/page";
import { useRouter } from "next/navigation";

interface GridViewProps {
    teamsData: Team[];
    searchTerm: string;
    selectedFilters: { [key: string]: string[] };
}

const GridView = ({
    teamsData,
    searchTerm,
    selectedFilters,
}: GridViewProps) => {
    const router = useRouter();

    const filteredTeamsData = teamsData.filter(team => {
        const matchesGroupFilter = selectedFilters["Group"]?.length
            ? selectedFilters["Group"].includes(team.group.split("_").join(" "))
            : true;
        const matchesTeamFilter = selectedFilters["Team"]?.length
            ? selectedFilters["Team"].includes(team.teamName)
            : true;
        const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.members.some(member =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        return matchesGroupFilter && matchesTeamFilter && matchesSearch;
    });

    const groupsWithSearch = Array.from(new Set(filteredTeamsData.map(team => team.group)));

    const groupedTeams: { [key: string]: Team[] } = {};
    filteredTeamsData.forEach(team => {
        if (!groupedTeams[team.group]) {
            groupedTeams[team.group] = [];
        }
        groupedTeams[team.group].push(team);
    });

    // Log the group colors for all teams in groupedTeams
    return (
        <div className="mb-40 space-y-12">
            {groupsWithSearch
                .filter((group) => groupedTeams[group]?.length)
                .sort(([groupA], [groupB]) => {
                    if (groupA === "MENTORS" && groupB !== "MENTORS") return 1;
                    if (groupB === "MENTORS" && groupA !== "MENTORS") return -1;
                    return groupA.localeCompare(groupB);
                })
                .map((groupName) => {

                    const teamsInGroup = groupedTeams[groupName] || [];
                    const color = groupColors[groupName] || groupColors["default"];

                    return (
                        <div key={groupName}>
                            <motion.h2
                                className="text-xl font-bold mb-4 flex items-center gap-2 text-cloud-white"
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <span
                                    className={`block w-4 h-4 rounded-full mr-2`}
                                    style={{ backgroundColor: `var(--${color})` }}
                                ></span>
                                {groupName.split("_").join(" ")}
                            </motion.h2>
                            <motion.div
                                className="w-full h-auto columns-1 md:columns-2 2xl:columns-3 gap-8"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.15,
                                        },
                                    },
                                }}
                            >

                                {teamsInGroup
                                    .map((team, index) => {
                                        return (
                                            <motion.div
                                                key={team.teamID}
                                                className={`relative break-inside-avoid ${index !== 0 ? "mt-8" : ""} cursor-pointer hover:scale-105 transition duration-300 ease-in-out border-2 rounded-3xl p-8 flex flex-col`}
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    visible: {
                                                        opacity: 1,
                                                        transition: {
                                                            duration: 0.6,
                                                            delay: (index + 1) * 0.15,
                                                            ease: "easeOut",
                                                        },
                                                    },
                                                }}
                                                style={{
                                                    borderColor: `var(--${color})`,
                                                }}
                                                onClick={() => {
                                                    const slugPromise = getSlug(team.teamID);
                                                    slugPromise.then((slug) => {
                                                        void router.push(`/team/${slug}`);
                                                    });
                                                }}
                                            >
                                                <span className="flex flex-row justify-between">
                                                    <h3>{team.teamName}</h3>
                                                    <span className="material-icons">
                                                        chevron_right
                                                    </span>
                                                </span>
                                                <p className="text-slate">{team.description}</p>
                                            </motion.div>
                                        );
                                    })}
                            </motion.div>
                        </div>
                    )
                })}
        </div>
    );
};

export default GridView;
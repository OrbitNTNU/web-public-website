import { groupColors, Team } from "@/app/team/page";
import { motion } from "framer-motion";

interface GridViewProps {
    teamsData: Team[];
    searchTerm: string;
    selectedFilters: { [key: string]: string[] };
}

const getRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

const GridView = ({
    teamsData,
    searchTerm,
    selectedFilters,
}: GridViewProps) => {

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

    return (
        <div className="mb-40 space-y-12">
            {groupsWithSearch
                .filter((group) => groupedTeams[group]?.length)
                .sort((a, b) => a.localeCompare(b))
                .map((groupName) => (
                    <div key={groupName}>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cloud-white">
                            <span
                                className="block w-4 h-4 rounded-full mr-2"
                                style={{ backgroundColor: `var(--${groupColors[groupName]})` }}
                            ></span>
                            {groupName.split("_").join(" ")}
                        </h2>
                        <div className="w-full h-auto columns-3 gap-8">
                            {(groupedTeams[groupName] || [])
                                .map((team, index) => {
                                    // Randomize delay and y offset for each card
                                    const delay = getRandom(0, 0.3) + index * 0.05;
                                    const y = getRandom(20, 60);

                                    return (
                                        <motion.div
                                            key={team.teamID}
                                            className={`relative break-inside-avoid ${index !== 0 ? "mt-8" : ""} border-2 rounded-3xl p-8 flex flex-col`}
                                            style={{
                                                borderColor: `var(--${groupColors[groupName]})`,
                                            }}
                                            initial={{ opacity: 0, y }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay,
                                                type: "spring",
                                                stiffness: 60,
                                            }}
                                            viewport={{ once: true }}
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
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default GridView;
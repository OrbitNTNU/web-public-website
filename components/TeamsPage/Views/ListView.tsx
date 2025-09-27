import { groupColors, Member, Team } from "@/app/team/page";

interface ListViewProps {
    teamsData: Team[];
    searchTerm: string;
    selectedFilters: { [key: string]: string[] };
    setActiveTeam: (teamID: number | null) => void;
    activeTeam: number | null;
}

const ListView = ({
    teamsData,
    searchTerm,
    selectedFilters,
    setActiveTeam,
    activeTeam }
    : ListViewProps) => {

    const groupedTeams: { [key: string]: Team[] } = {};
    teamsData.forEach(team => {
        if (!groupedTeams[team.group]) {
            groupedTeams[team.group] = [];
        }
        groupedTeams[team.group].push(team);
    });

    const teamsWithSearch = teamsData.filter(team =>
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.members.some(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ).map(team => team);

    const groupsWithSearch = Array.from(new Set(teamsWithSearch.map(team => team.group)));

    const filteredGroups = groupsWithSearch
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc: { [key: string]: Team[] }, groupName: string) => {
            const teamsInGroup = teamsData.filter(team => team.group === groupName);
            const filteredTeams: Team[] = teamsInGroup
                .map((team: Team) => {
                    const filteredMembers = team.members.filter((member: Member) =>
                        (member.name.toLowerCase().includes(searchTerm.toLowerCase())
                        || team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
                ) &&
                        (selectedFilters["Position"]?.length
                            ? selectedFilters["Position"].includes(member.privilege)
                            : true
                        )
                    );
                    return filteredMembers.length > 0 ? { ...team, members: filteredMembers } : null;
                })
                .filter((team): team is Team => team !== null)
                .filter((team: Team) =>
                    groupsWithSearch.includes(team.group) &&
                    (selectedFilters["Group"]?.length
                        ? selectedFilters["Group"].includes(team.group.split("_").join(" "))
                        : true) &&
                    (selectedFilters["Team"]?.length
                        ? selectedFilters["Team"].includes(team.teamName)
                        : true)
                )
                .sort((a: Team, b: Team) => a.teamName.localeCompare(b.teamName));
            if (filteredTeams.length > 0) {
                acc[groupName] = filteredTeams;
            }
            return acc;
        }, {});

    return (
        <table className="min-w-full border-collapse mb-40">
            <thead>
                <tr>
                    <th className="px-4 py-2 text-left text-slate border-b border-slate">Group</th>
                    <th className="px-4 py-2 text-left text-slate border-b border-slate">Team</th>
                    <th className="px-4 py-2 text-slate border-b border-slate text-right">Members</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(filteredGroups).length === 0 ? (
                    <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-slate">
                            No results found.
                        </td>
                    </tr>
                ) : Object.entries(filteredGroups)
                    .map(([groupName, teams]: [string, Team[]]) => (
                        <tr key={groupName}>
                            <td className="w-[240px] px-2 py-4 border-b border-slate text-cloud-white font-semibold align-top">
                                <button className="w-full text-left cursor-pointer focus:outline-none flex flex-row gap-2 items-center">
                                    <span
                                        className="block w-4 h-4 rounded-full mr-2"
                                        style={{ backgroundColor: `var(--${groupColors[groupName]})` }}
                                    ></span>
                                    {groupName.split("_").join(" ")}
                                </button>
                            </td>
                            <td className="w-[240px] px-2 py-4 border-slate border-b text-cloud-white align-top">
                                <div className="flex flex-col">
                                    {teams.map((team: Team) => (
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
                                    {(() => {
                                        const filteredMembers: Member[] = teams
                                            .flatMap((team: Team) => team.members)
                                            .sort((a: Member, b: Member) => a.name.localeCompare(b.name));

                                        return filteredMembers.map((member: Member, index: number) => (
                                            <span
                                                key={index}
                                                className={`cursor-pointer hover:text-cloud-white transition-all duration-300 ease-in-out
                                                    ${activeTeam && teams.some((team: Team) => team.teamID === activeTeam && team.members.includes(member))
                                                        ? "text-emerald-fizz"
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
                                                            <span className="text-berry-blast duration-300 group-hover:text-cloud-white">
                                                                {member.name.slice(idx, idx + searchTerm.length)}
                                                            </span>
                                                            {member.name.slice(idx + searchTerm.length)}
                                                        </span>
                                                    );
                                                })()}
                                            </span>
                                        ));
                                    })()}
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>

    )
}

export default ListView;
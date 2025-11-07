import { useRouter } from "next/navigation";
import {
  getSlug,
  groupColors,
  Member,
  Team,
} from "@/components/TeamsPage/lib/teams";

interface ListViewProps {
  teamsData: Team[];
  setActiveTeam: (teamID: number | null) => void;
  activeTeam: number | null;
}

const ListView = ({
  teamsData,
  setActiveTeam,
  activeTeam,
}: ListViewProps) => {
  const router = useRouter();

  const groupedTeams: { [key: string]: Team[] } = {};
  teamsData.forEach((team) => {
    if (!groupedTeams[team.group]) {
      groupedTeams[team.group] = [];
    }
    groupedTeams[team.group].push(team);
  });

  const groupsWithSearch = Array.from(
    new Set(teamsData.map((team) => team.group)),
  );

  const filteredGroups = groupsWithSearch
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc: { [key: string]: Team[] }, groupName: string) => {
      const teamsInGroup = teamsData.filter((team) => team.group === groupName);
      const filteredTeams: Team[] = teamsInGroup
        .filter((team): team is Team => team !== null)
        .filter(
          (team: Team) =>
            groupsWithSearch.includes(team.group)
        )
        .sort((a: Team, b: Team) => a.teamName.localeCompare(b.teamName));
      if (filteredTeams.length > 0) {
        acc[groupName] = filteredTeams;
      }
      return acc;
    }, {});

  return (
    <section className="mb-40 px-4 md:px-12 w-full">
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-charcoal-light border-b border-charcoal-light">
              Group
            </th>
            <th className="px-4 py-2 text-left text-charcoal-light border-b border-charcoal-light">
              Team
            </th>
            <th className="px-4 py-2 text-charcoal-light border-b border-charcoal-light text-right">
              Members
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(filteredGroups).length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-8 text-center text-charcoal-light"
              >
                No results found.
              </td>
            </tr>
          ) : (
            Object.entries(filteredGroups)
              .sort(([groupA], [groupB]) => {
                if (groupA === "MENTORS" && groupB !== "MENTORS") return 1;
                if (groupB === "MENTORS" && groupA !== "MENTORS") return -1;
                return groupA.localeCompare(groupB);
              })
              .map(([groupName, teams]: [string, Team[]]) => (
                <tr key={groupName}>
                  <td className="w-[240px] px-2 py-4 border-b border-charcoal-light text-cloud-white font-semibold align-top">
                    <button className="w-full text-left cursor-pointer focus:outline-none flex flex-row gap-2 items-center">
                      <span
                        className="block w-4 h-4 rounded-full mr-2"
                        style={{
                          backgroundColor: `var(--${groupColors[groupName]})`,
                        }}
                      ></span>
                      {groupName.split("_").join(" ")}
                    </button>
                  </td>
                  <td className="w-[240px] px-2 py-4 border-charcoal-light border-b text-cloud-white align-top">
                    <div className="flex flex-col">
                      {teams.map((team: Team) => (
                        <button
                          key={team.teamID}
                          className="w-full text-left px-2 py-1 font-medium focus:outline-none text-cloud-white hover:text-pink-blast transition-colors duration-150 cursor-pointer items-center flex"
                          onMouseEnter={() => setActiveTeam(team.teamID)}
                          onMouseLeave={() => setActiveTeam(null)}
                          onClick={() => {
                            const slugPromise = getSlug(team.teamID);
                            slugPromise.then((slug) => {
                              void router.push(`/team/${slug}`);
                            });
                          }}
                        >
                          {team.teamName}
                          <span className="material-icons">chevron_right</span>
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-4 border-charcoal-light border-b text-charcoal-light">
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                      {(() => {
                        const filteredMembers: Member[] = teams
                          .flatMap((team: Team) => team.members)
                          .sort((a: Member, b: Member) =>
                            a.name.localeCompare(b.name),
                          );

                        return filteredMembers.map(
                          (member: Member, index: number) => (
                            <small
                              key={index}
                              className={`cursor-pointer hover:text-cloud-white transition-all duration-300 ease-in-out
                                                    ${
                                                      activeTeam &&
                                                      teams.some(
                                                        (team: Team) =>
                                                          team.teamID ===
                                                            activeTeam &&
                                                          team.members.includes(
                                                            member,
                                                          ),
                                                      )
                                                        ? "text-emerald-fizz"
                                                        : "font-normal text-charcoal-light"
                                                    }`}
                            >
                              {(() => {
                                return (
                                  <small className="whitespace-nowrap group transition-all ease-in-out hover:text-cloud-white">
                                    {member.name}
                                  </small>
                                );
                              })()}
                            </small>
                          ),
                        );
                      })()}
                    </div>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ListView;

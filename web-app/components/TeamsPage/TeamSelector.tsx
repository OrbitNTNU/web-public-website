import { Team } from "@/components/TeamsPage/lib/teams";

interface TeamSelectorProps {
  teamsData: Team[];
  selectedTeamID: number;
  handleTeamChange: (teamID: number) => void;
}

const TeamSelector = ({
  teamsData,
  selectedTeamID,
  handleTeamChange,
}: TeamSelectorProps) => {

  const sortedTeams = teamsData.sort((a, b) =>
    a.teamName.localeCompare(b.teamName, "en"),
  );

  return (
    <section className="flex flex-wrap gap-4 w-full lg:w-2/3 px-4 md:px-12">
      {sortedTeams.map((team) => (
        <label
          key={team.teamName}
          className={`flex items-center cursor-pointer whitespace-nowrap group hover:text-cloud-white transition-all duration-100 ${selectedTeamID === team.teamID
              ? "text-cloud-white"
              : "text-charcoal-light"
            }`}
          onClick={() => {
            handleTeamChange(team.teamID);
          }}
        >
          <span
            className={`w-4 h-4 mr-2 flex items-center group-hover:border-cloud-white justify-center border-1 border-charcoal-light
                                                    ${selectedTeamID === team.teamID
                ? "bg-cloud-white border-cloud-white text-cloud-white"
                : "bg-transparent"
              }`}
          />
          {team.teamName}
        </label>
      ))}
    </section>
  );
};

export default TeamSelector;
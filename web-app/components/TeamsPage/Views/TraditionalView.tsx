import { motion } from "framer-motion";
import { getSlug, Team } from "@/lib/teams";
import MemberCard from "../../General/MemberCard";
import { useRouter } from "next/navigation";
import TeamSelector from "../TeamSelector";
import { useLayoutEffect, useRef, useState } from "react";

interface TraditionalViewProps {
  teamsData: Team[];
}

const TraditionalView = ({ teamsData }: TraditionalViewProps) => {
  const [selectedTeamID, setSelectedTeamID] = useState<number>(1);
  const [isSwitching, setIsSwitching] = useState(false);
  const [relativeScrollOffset, setRelativeScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const team = teamsData.find((team) => team.teamID === selectedTeamID)!;

  const handleTeamChange = (teamID: number) => {
    if (!containerRef.current) {
      setSelectedTeamID(teamID);
      return;
    }

    const container = containerRef.current;
    const relativeScroll = window.scrollY - container.offsetTop;

    setRelativeScrollOffset(relativeScroll);
    setSelectedTeamID(teamID);
    setIsSwitching(true);
  };

  useLayoutEffect(() => {
    if (isSwitching && containerRef.current) {
      const container = containerRef.current;

      window.scrollTo({
        top: container.offsetTop + relativeScrollOffset,
        behavior: "auto",
      });

      setIsSwitching(false);
    }
  }, [selectedTeamID, isSwitching]);

  return (
    <div ref={containerRef} className="px-4 md:px-12 flex flex-col gap-24">
      <TeamSelector
        teamsData={teamsData}
        selectedTeamID={selectedTeamID}
        handleTeamChange={handleTeamChange}
      />

      <motion.div
        key={team.teamID}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div className="mb-8 w-full md:w-1/2">
          <motion.h2
            className="flex flex-row gap-4 items-center cursor-pointer group"
            onClick={() => {
              getSlug(team.teamID).then((slug) => {
                if (slug) void router.push(`/team/${slug}`);
              });
            }}
          >
            {team.teamName}
            <span className="relative text-3xl flex items-center ml-2 select-none">
              <span className="material-icons text-3xl transition-transform duration-200 group-hover:translate-x-2">
                chevron_right
              </span>
            </span>
          </motion.h2>
        </motion.div>

        <motion.p className="text-charcoal-light mb-12 max-w-3xl">
          {team.description}
        </motion.p>

        <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {team.members
            .sort((a, b) => {
              const order: Record<string, number> = {
                BOARD: 1,
                LEADER: 2,
                MEMBER: 3,
              };
              const rankA = order[a.privilege] ?? 99;
              const rankB = order[b.privilege] ?? 99;
              if (rankA !== rankB) return rankA - rankB;
              if (a.title !== b.title)
                return a.title.localeCompare(b.title, "en");
              return a.name.localeCompare(b.name, "en");
            })
            .map((member, index) => (
              <motion.div
                key={`${member.name}-${team.teamName}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MemberCard
                  image={member.image ?? ""}
                  memberName={member.name ?? ""}
                  position={member.title ?? ""}
                  phoneNumber={member.phoneNumber ?? ""}
                  linkedin={member.linkedin ?? ""}
                  mail={member.mail ?? ""}
                />
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TraditionalView;

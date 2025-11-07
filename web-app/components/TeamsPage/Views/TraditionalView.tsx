"use client";

import { motion } from "framer-motion";
import { getSlug, groupColors, Team } from "@/components/TeamsPage/lib/teams";
import MemberCard from "../../MemberCard";
import { useRouter } from "next/navigation";

interface TraditionalViewProps {
  team: Team;
}

const TraditionalView = ({
  team,
}: TraditionalViewProps) => {
  const router = useRouter();

  const filteredMembers = team.members.map((member) => ({
    ...member,
    teamName: team.teamName,
    group: team.group,
    teamDescription: team.description,
  }));

  const membersByTeam = filteredMembers.reduce<
    Record<string, typeof filteredMembers>
  >((acc, member) => {
    if (!acc[member.teamName]) acc[member.teamName] = [];
    if (!acc[member.teamName].some((m) => m.name === member.name)) {
      acc[member.teamName].push(member);
    }
    return acc;
  }, {});

  const teamsToRender = [team].filter(
    (team) => membersByTeam[team.teamName]?.length,
  );

  return (
    <div className="mb-40 space-y-24 px-4 md:px-12">
      {teamsToRender
        .sort((a, b) => {
          if (a.teamName === "Mentors" && b.teamName !== "Mentors") return 1;
          if (b.teamName === "Mentors" && a.teamName !== "Mentors") return -1;
          const groupCompare = a.group.localeCompare(b.group, "en");
          if (groupCompare !== 0) return groupCompare;
          return a.teamName.localeCompare(b.teamName, "en");
        })
        .map((team) => (
          <div key={team.teamName}>
            <motion.div
              className="mb-8 w-full md:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="flex flex-row gap-4 items-center cursor-pointer group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => {
                  getSlug(team.teamID).then((slug) => {
                    if (slug) void router.push(`/team/${slug}`);
                  });
                }}
              >
                <span
                  className="block w-4 h-4 rounded-full mt-1"
                  style={{
                    backgroundColor: `var(--${groupColors[team.group] ?? "color-emerald-fizz"})`,
                  }}
                ></span>
                {team.teamName}
                <span className="relative text-3xl flex items-center ml-2 select-none">
                  <span className="material-icons text-3xl transition-transform duration-200 group-hover:translate-x-2">
                    chevron_right
                  </span>
                </span>
              </motion.h2>
            </motion.div>

            {/* --- Team description --- */}
            <motion.p
              className="text-charcoal-light mb-12 max-w-3xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {team.description}
            </motion.p>

            {/* --- Members grid --- */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {membersByTeam[team.teamName]
                .sort((a, b) => {
                  const order: Record<string, number> = {
                    LEADER: 1,
                    BOARD: 2,
                    MEMBER: 3,
                  };
                  const rankA = order[a.privilege] ?? 99;
                  const rankB = order[b.privilege] ?? 99;
                  if (rankA !== rankB) return rankA - rankB;
                  return a.name.localeCompare(b.name, "en");
                })
                .map((member, index) => (
                  <motion.div
                    key={`${member.name}-${team.teamName}`}
                    variants={{
                      hidden: { y: 120, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          delay: index * 0.1,
                        },
                      },
                    }}
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
          </div>
        ))}
    </div>
  );
};

export default TraditionalView;

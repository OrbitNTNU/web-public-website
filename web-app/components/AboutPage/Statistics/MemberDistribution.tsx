import { useMemo } from "react";
import { MemberDistributionInTeams } from "./Statistics";
import { motion } from "framer-motion";

interface MemberDistributionProps {
  data: MemberDistributionInTeams | null;
}

const MemberDistribution = ({ data }: MemberDistributionProps) => {
  const summary = useMemo(() => {
    const initialRoleTotals: Record<string, number> = {
      MEMBER: 0,
      MENTOR: 0,
      LEADER: 0,
      BOARD: 0,
    };

    if (!data)
      return {
        totalTeams: 0,
        totalMembers: 0,
        roleTotals: initialRoleTotals,
        multiTeamMembers: 0,
      };

    const multiTeamMembers = data.teamsInfo.reduce(
      (acc, t) => acc + (t.membersInMultipleTeams ?? 0),
      0,
    );

    const totalTeams = data.teamsInfo.length;
    const totalMembers = data.totalMembers;

    const roleTotals: Record<string, number> = {
      ...initialRoleTotals,
    };
    data.teamsInfo.forEach((team) => {
      Object.keys(team.roleCounters ?? {}).forEach((role) => {
        roleTotals[role] += team.roleCounters?.[role] ?? 0;
      });
    });

    return { totalTeams, totalMembers, roleTotals, multiTeamMembers };
  }, [data]);

  return (
    <div className="relative mx-auto flex w-full flex-col items-start">
      <motion.h3
        className="mb-4 md:text-center font-black"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "tween",
          stiffness: 200,
          delay: 0.2,
        }}
      >
        Membership Distribution
      </motion.h3>

      {/* Intro text */}
      <motion.p
        className="mb-8 max-w-3xl text-charcoal-light md:mr-auto md:text-left md:max-w-2/3"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "tween",
          stiffness: 200,
        }}
      >
        Orbit currently has{" "}
        <strong className="text-cloud-white">
          {summary.roleTotals.LEADER +
            summary.roleTotals.MEMBER +
            summary.roleTotals.BOARD -
            summary.multiTeamMembers}
        </strong>{" "}
        active members distributed across{" "}
        <strong className="text-cloud-white">{summary.totalTeams}</strong>{" "}
        teams. Of these,{" "}
        <strong className="text-cloud-white">
          {summary.roleTotals.LEADER}
        </strong>{" "}
        are leaders,{" "}
        <strong className="text-cloud-white">{summary.roleTotals.BOARD}</strong>{" "}
        serve on the board, and{" "}
        <strong className="text-cloud-white">
          {summary.roleTotals.MEMBER}
        </strong>{" "}
        are regular members. Additionally,{" "}
        <strong className="text-cloud-white">{summary.multiTeamMembers}</strong>{" "}
        members participate in multiple teams.
        <br />
        <br />
        In addition to the active members, there are{" "}
        <strong className="text-cloud-white">
          {summary.roleTotals.MENTOR}
        </strong>{" "}
        mentors who provide guidance and support to our teams. In total, Orbit
        benefits from the contributions of{" "}
        <strong className="text-cloud-white">{summary.totalMembers}</strong>{" "}
        dedicated individuals.
      </motion.p>
    </div>
  );
};

export default MemberDistribution;

import { useMemo } from "react";
import { StudyLevelDistributionStatistics } from "./Statistics";
import { motion } from "framer-motion";

interface StudyLevelDistributionProps {
  data: StudyLevelDistributionStatistics | null;
}

const StudyLevelDistribution = ({ data }: StudyLevelDistributionProps) => {
  // Table rows with counts and percentages
  const overallWithPercentage = useMemo(() => {
    if (!data?.overall) return [];
    const total = Object.values(data.overall).reduce(
      (sum, count) => sum + count,
      0,
    );
    return Object.entries(data.overall).map(([level, count]) => ({
      level,
      count,
      percentage: total > 0 ? ((count / total) * 100).toFixed(1) + "%" : "0.0%",
    }));
  }, [data]);

  // Summary statistics
  const summary = useMemo(() => {
    if (!data?.overall) return null;
    const overall = data.overall;
    const allMembers = Object.values(overall).reduce((sum, c) => sum + c, 0);
    const differentLevelsCount =
      Object.keys(overall).length - (overall.Unknown ? 1 : 0);
    const mostCommonLevelEntry = Object.entries(overall).reduce(
      (acc, [level, count]) => (count > acc.count ? { level, count } : acc),
      { level: "N/A", count: 0 },
    );
    return {
      allMembers,
      differentLevelsCount,
      mostCommonLevel: mostCommonLevelEntry.level,
      mostCommonCount: mostCommonLevelEntry.count,
    };
  }, [data]);

  return (
    <div className="mx-auto flex w-full flex-col">
      <motion.h3
        className="mb-2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "tween",
          stiffness: 200,
        }}
      >
        Study Level Distribution
      </motion.h3>
      {summary && (
        <motion.p
          className="mb-6 text-charcoal-light leading-relaxed md:max-w-2/3"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "tween",
            stiffness: 200,
            delay: 0.2,
          }}
        >
          Out of{" "}
          <strong className="text-cloud-white">{summary.allMembers}</strong>{" "}
          members, there are{" "}
          <strong className="text-cloud-white">
            {summary.differentLevelsCount}
          </strong>{" "}
          different study levels. The most common level is{" "}
          <strong className="text-cloud-white">
            {summary.mostCommonLevel}
          </strong>{" "}
          with{" "}
          <strong className="text-cloud-white">
            {summary.mostCommonCount}
          </strong>{" "}
          members.
        </motion.p>
      )}

      {/* Horizontal scroll table */}
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full min-w-[500px] border-collapse">
          <thead>
            <tr className="text-left">
              <th className="py-2 min-w-[120px] text-cloudWhite">
                Study Level
              </th>
              <th className="py-2 min-w-[80px] text-center text-cloudWhite">
                Count
              </th>
              <th className="py-2 min-w-[80px] text-center text-cloudWhite">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {overallWithPercentage
              .sort((a, b) => b.count - a.count)
              .map(({ level, count, percentage }) => (
                <tr key={level} className="border-t border-slate">
                  <td className="py-2">{level}</td>
                  <td className="py-2 text-center text-charcoal-light">
                    {count}
                  </td>
                  <td className="py-2 text-center text-charcoal-light">
                    {percentage}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyLevelDistribution;

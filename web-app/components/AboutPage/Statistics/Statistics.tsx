import { useEffect, useState } from "react";
import { Loading } from "../../General/Layout/Loading";
import FieldsOfEducation from "./FieldsOfEducation";
import StudyLevelDistribution from "./StudyLevelDistribution";
import Studies from "./Studies";
import MemberDistribution from "./MemberDistribution";
import { StatisticsResponse } from "@/lib/getStatistics";

interface StatisticsProps {
  statistics: StatisticsResponse;
}
  
const Statistics = ({ statistics }: StatisticsProps) => {

  return (
    <div className="flex flex-col gap-20 md:gap-40 w-full mx-auto px-4 md:px-12">
      <MemberDistribution data={statistics.memberDistributionInTeams} />
      <Studies data={statistics.studies} />
      <StudyLevelDistribution data={statistics.studyLevelDistribution} />
      <FieldsOfEducation data={statistics.programStatistics} />
    </div>
  );
};

export default Statistics;

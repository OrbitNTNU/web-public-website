import { useEffect, useState } from "react";
import { Loading } from "../../Loading";
import FieldsOfEducation from "./FieldsOfEducation";
import StudyLevelDistribution from "./StudyLevelDistribution";
import Studies from "./Studies";
import MemberDistribution from "./MemberDistribution";


const Statistics = () => {
    const [loading, setLoading] = useState(true);
    const [memberDistributionInTeams, setMemberDistributionInTeams] = useState<any>();
    const [studies, setStudies] = useState<any>();
    const [studyLevelDistribution, setStudyLevelDistribution] = useState<any>();
    const [programStatistics, setProgramStatistics] = useState<any>();

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('/api/statistics')
                if (response.ok) {
                    const data = await response.json()
                    setMemberDistributionInTeams(data.memberDistributionInTeams)
                    setStudies(data.studies)
                    setStudyLevelDistribution(data.studyLevelDistribution)
                    setProgramStatistics(data.programStatistics)
                } else {
                    console.error(`Error: Received status code ${response.status}`)
                }
            } catch (error) {
                console.error('Error fetching statistics:', error)
            } finally {
                setLoading(false)
            }
        }

        void fetchStatistics()
    }, [])

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-20 md:gap-40 max-w-[1600px] w-full mx-auto px-4 md:px-12">
            <MemberDistribution 
                data={memberDistributionInTeams}
            />
            <Studies
                data={studies}
            />
            <StudyLevelDistribution
                data={studyLevelDistribution}
            />
            <FieldsOfEducation
                data={programStatistics}
            />
        </div>
    );
};

export default Statistics;
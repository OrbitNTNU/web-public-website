"use client";
import { motion } from "framer-motion";
import { getSlug, groupColors, Team } from "../../../app/team/page";
import MemberCard from "../../MemberCard";
import { useRouter } from "next/navigation";

interface MemberViewProps {
    teamsData: Team[];
    searchTerm: string;
    selectedFilters: { [key: string]: string[] };
}

const MemberView = ({
    teamsData,
    searchTerm,
    selectedFilters,
}: MemberViewProps) => {
    const router = useRouter();

    const filteredMembers = teamsData.flatMap(team =>
        team.members.map(member => ({
            ...member,
            teamName: team.teamName,
            group: team.group,
            teamDescription: team.description,
        }))
    ).filter(member => {
        const matchesGroupFilter = selectedFilters["Group"]?.length
            ? selectedFilters["Group"].includes(member.group.split("_").join(" "))
            : true;

        const matchesTeamFilter = selectedFilters["Team"]?.length
            ? selectedFilters["Team"].includes(member.teamName)
            : true;

        const matchesPositionFilter = selectedFilters["Position"]?.length
            ? selectedFilters["Position"].includes(member.privilege)
            : true;

        return matchesGroupFilter && matchesTeamFilter && matchesPositionFilter;
    });

    // Search filter
    const searchedAndFiltered = filteredMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.title && member.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.teamName && member.teamName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.mail && member.mail.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Group members by team
    const membersByTeam = searchedAndFiltered.reduce<Record<string, typeof searchedAndFiltered>>((acc, member) => {
        if (!acc[member.teamName]) acc[member.teamName] = [];
        // Avoid duplicates by name
        if (!acc[member.teamName].some(m => m.name === member.name)) {
            acc[member.teamName].push(member);
        }
        return acc;
    }, {});

    const teamsToRender = teamsData.filter(team => membersByTeam[team.teamName]?.length);

    return (
        <div className="mb-40 space-y-24">
            {teamsToRender
                .sort((a, b) => {
                    if (a.teamName === "Mentors" && b.teamName !== "Mentors") return 1;
                    if (b.teamName === "Mentors" && a.teamName !== "Mentors") return -1;
                    const groupCompare = a.group.localeCompare(b.group);
                    if (groupCompare !== 0) return groupCompare;
                    return a.teamName.localeCompare(b.teamName);
                })
                .map(team => (
                    <div key={team.teamName}>
                        <motion.div
                            className="mb-8 w-1/2"
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
                                    const slugPromise = getSlug(team.teamID);
                                    slugPromise.then((slug) => {
                                        void router.push(`/team/${slug}`);
                                    });
                                }}
                            >
                                <span
                                    className="block w-4 h-4 rounded-full mt-1"
                                    style={{
                                        backgroundColor: `var(--${groupColors[team.group]})`
                                    }}
                                ></span>
                                {team.teamName}
                                <span className="relative text-3xl flex items-center ml-2 select-none">
                                    <span
                                        className="material-icons text-3xl transition-transform duration-200 group-hover:translate-x-2"
                                    >
                                        chevron_right
                                    </span>
                                </span>
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15,
                                    },
                                },
                            }}
                        >
                            {membersByTeam[team.teamName]
                                .sort((a, b) => {
                                    if (a.privilege === "LEADER" && b.privilege !== "LEADER") return -1;
                                    if (a.privilege !== "LEADER" && b.privilege === "LEADER") return 1;
                                    if (a.privilege === "BOARD" && b.privilege !== "BOARD") return -1;
                                    if (a.privilege !== "BOARD" && b.privilege === "BOARD") return 1;
                                    return a.name.localeCompare(b.name);
                                })
                                .map((member) => (
                                    <motion.div
                                        key={member.name}
                                        variants={{
                                            hidden: { y: 120, opacity: 0 },
                                            visible: {
                                                y: 0,
                                                opacity: 1,
                                                transition: {
                                                    duration: 0.6,
                                                    delay: Math.random() * 0.6,
                                                },
                                            },
                                        }}
                                    >
                                        <MemberCard
                                            image={member.image}
                                            memberName={member.name}
                                            bio={member.mail}
                                            additionalInformation={member.title}
                                            teamGroup={member.group}
                                            phoneNumber={member.phoneNumber}
                                            linkedin={member.linkedin}
                                        />
                                    </motion.div>
                                ))}
                        </motion.div>
                    </div>
                ))}
        </div>
    );
};

export default MemberView;


"use client";
import { motion } from "framer-motion";
import MemberCard from "../../MemberCard";
import { Team } from "@/app/team/page";

interface GalleryViewProps {
    teamsData: Team[];
    searchTerm: string;
    selectedFilters: { [key: string]: string[] };
}

const GalleryView = ({
    teamsData,
    searchTerm,
    selectedFilters,
}: GalleryViewProps) => {

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

    return (
        <div className="mb-40 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
            {searchedAndFiltered
                .filter((member, index, self) =>
                    index === self.findIndex((m) => m.name === member.name)
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((member) => (
                    <motion.div
                        key={member.name + member.teamName}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MemberCard
                            image={member.image}
                            memberName={member.name}
                            bio={member.mail}
                            phoneNumber={member.phoneNumber}
                            linkedin={member.linkedin}
                        />
                    </motion.div>
                ))}
        </div>
    );
};

export default GalleryView;


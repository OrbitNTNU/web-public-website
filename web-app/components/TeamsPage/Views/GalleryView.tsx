"use client";

import { motion } from "framer-motion";
import MemberCard from "../../General/MemberCard";
import { Team } from "@/components/TeamsPage/lib/teams";
import { useEffect, useMemo, useState } from "react";

interface GalleryViewProps {
  teamsData: Team[];
  searchTerm: string;
}

const GalleryView = ({
  teamsData,
  searchTerm,
}: GalleryViewProps) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Precompute flattened member list
  const filteredMembers = useMemo(
    () =>
      teamsData.flatMap((team) =>
        team.members.map((member) => ({
          ...member,
          teamName: team.teamName,
          group: team.group,
          teamDescription: team.description,
        })),
      ),
    [teamsData],
  );

  // Only filter when debounced term updates
  const searchedAndFiltered = useMemo(
    () =>
      filteredMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          member.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          member.teamName?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          member.mail?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
    [filteredMembers, debouncedSearchTerm],
  );

  return (
    <div className="mb-40 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 px-4 md:px-12">
      {searchedAndFiltered
        .filter(
          (member, index, self) =>
            index === self.findIndex((m) => m.name === member.name),
        )
        .sort((a, b) => a.name.localeCompare(b.name, "en"))
        .map((member) => (
          <motion.div
            key={`${member.name}-${member.teamName}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
    </div>
  );
};

export default GalleryView;

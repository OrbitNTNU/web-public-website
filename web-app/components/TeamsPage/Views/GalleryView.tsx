"use client";

import { motion } from "framer-motion";
import MemberCard from "../../General/MemberCard";
import { Team } from "@/lib/teams";
import { useEffect, useMemo, useState } from "react";

interface GalleryViewProps {
  teamsData: Team[];
  searchTerm: string;
}

const GalleryView = ({ teamsData, searchTerm }: GalleryViewProps) => {
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

  const searchedFilteredAndSorted = useMemo(
    () =>
      filteredMembers
        .filter(
          (member) =>
            member.name
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            member.title
              ?.toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            member.teamName
              ?.toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            member.mail
              ?.toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()),
        )
        .filter(
          (member, index, self) =>
            index === self.findIndex((m) => m.name === member.name),
        )
        .sort((a, b) => a.name.localeCompare(b.name, "en")),
    [filteredMembers, debouncedSearchTerm],
  );

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 px-4 md:px-12">
      {searchedFilteredAndSorted.length > 0 ? (
        searchedFilteredAndSorted.map((member) => (
          <motion.div
            key={`${member.name}-${member.teamName}`}
            initial={{ opacity: 0, y: 20 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 + Math.random() * 0.6 }}
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
        ))
      ) : (
        <p className="text-center text-charcoal-light italic col-span-full">
          No members found
        </p>
      )}
    </div>
  );
};

export default GalleryView;

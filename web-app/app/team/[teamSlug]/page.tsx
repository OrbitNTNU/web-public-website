"use client";

import { Loading } from "@/components/Loading";
import { SectionRenderer } from "@/components/TeamsPage/Sections/SectionRenderer";
import { fetchTeamPage } from "@/sanity/queries/teams";
import { TeamDocument } from "@/sanity/types/teams";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TeamPage = () => {
  const pathname = usePathname();
  const teamSlug = pathname.split("/").pop() as string;
  const [teamDocument, setTeamDocument] = useState<TeamDocument | null>(null);

  useEffect(() => {
    if (teamSlug) {
      void fetchTeamPage(teamSlug).then((data) => {
        setTeamDocument(data || null);
      });
    }
  }, [teamSlug]);

  if (!teamDocument) {
    return (
      <Loading />
    );
  }

  if (!teamDocument.content) {
    return (
          <div className="w-full relative flex flex-col">
            No content available
          </div>
    );
  }

  return (
    <div className="w-full relative flex flex-col">
      {teamDocument.content.map((section) => (
        <SectionRenderer key={section._key} section={section} />
      ))}
    </div>
  );
};

export default TeamPage;

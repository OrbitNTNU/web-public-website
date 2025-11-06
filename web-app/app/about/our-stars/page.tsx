'use client';
import { useEffect, useState } from "react";
import { Team, Member } from "@/app/team/TeamsClientPage";

interface StarProps {
  x: number;
  y: number;
  member: Member;
}

const StarsView = ({ teamsData }: { teamsData: Team[] }) => {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    const allMembers = teamsData.flatMap(team => team.members);
    const starCount = 150; // number of stars

    const generatedStars: StarProps[] = Array.from({ length: starCount }, () => {
      const member = allMembers[Math.floor(Math.random() * allMembers.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * 3000, // long scrollable area
        member,
      };
    });

    setStars(generatedStars);


  }, [teamsData]);

  return (
    <div className="relative w-screen min-h-[3000px] bg-charcoal overflow-x-hidden">
      {stars.map((star, idx) => (
        <div
          key={idx}
          className="absolute w-2 h-2 bg-white rounded-full cursor-pointer group"
          style={{ left: star.x, top: star.y }}
        >
          <span className="absolute bottom-full mb-1 hidden group-hover:block px-2 py-1 rounded bg-white text-black text-xs whitespace-nowrap z-50">
            {star.member.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StarsView;
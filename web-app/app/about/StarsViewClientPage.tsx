"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Team, Member } from "@/app/team/TeamsClientPage";
import { motion } from "framer-motion";
import MemberCard from "@/components/General/MemberCard";
import { useNavbar } from "@/components/General/Layout/NavbarContext";
import { useRouter } from "next/navigation";

interface StarProps {
  x: number;
  y: number;
  member: Member;
  team: Team;
  size: number;
}

const StarsView = ({ teamsData }: { teamsData: Team[] }) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const router = useRouter();

  const [hoveredStarIndex, setHoveredStarIndex] = useState<number | null>(null);
  const { setInfo, resetInfo } = useNavbar();

  function hashStringToNumber(str: string, max: number) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // convert to 32-bit int
    }
    return Math.abs(hash) % max;
  }

  function getMemberPosition(seed: string) {
    return {
      x: hashStringToNumber(seed, window.innerWidth - 40),
      y: hashStringToNumber(seed + "_y", 3000),
    };
  }

  useEffect(() => {
    const allMembersWithTeam = teamsData.flatMap(
      (team) => team.members.map((member) => ({ member, team })), // pair each member with their team
    );

    // One star per member
    const generatedStars: StarProps[] = allMembersWithTeam.map(
      ({ member, team }) => {
        const { x, y } = getMemberPosition(member.name);

        return {
          x,
          y,
          size: Math.random() * 4 + 2, // keep random if you want variation
          member,
          team,
        };
      },
    );

    setStars(generatedStars);
  }, [teamsData]);

  useEffect(() => {
    const fromWhere = new URLSearchParams(window.location.search).get("from");

    // Set the navbar info based on the article
    setInfo({
      baseHref: fromWhere === "about" ? "/about" : "/team",
      detailedLocation: "Our Stars",
    });

    // Reset navbar info when leaving
    return () => resetInfo();
  }, [teamsData]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.pageX, y: e.pageY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let foundIndex: number | null = null;

    stars.forEach((star, idx) => {
      const dx = star.x - mousePos.x;
      const dy = star.y - mousePos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= 20) {
        foundIndex = idx;
      }
    });

    setHoveredStarIndex(foundIndex);
  }, [mousePos]);

  return (
    <div className="relative w-screen min-h-[3000px] bg-charcoal">
      <section className="w-full max-w-5xl items-center text-center mx-auto my-20 px-4 md:px-12 flex flex-col gap-4 pt-20 md:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Stars
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hover over the stars to learn more about our team members making a
          difference.
        </motion.span>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-row gap-2 text-pink-blast"
        >
          <span className="material-icons">favorite</span>&nbsp;
          <span>You are the heart and soul of Orbit</span>
        </motion.section>
      </section>

      {stars.map((star, idx) => {
        const dx = star.x - mousePos.x;
        const dy = star.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = distance < 200 ? 1 + (200 - distance) / 25 : 1; // closer → bigger

        // Determine tooltip side
        const tooltipSide = star.x > window.innerWidth / 2 ? "left" : "right";

        return (
          <Fragment key={idx}>
            <motion.div
              key={idx}
              className="absolute bg-cloud-white rounded-full cursor-pointer"
              style={{
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
              }}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            {hoveredStarIndex === idx && (
              <motion.div
                className="absolute z-50"
                style={{
                  left: star.x + star.size / 2, // center of the star
                  top: star.y + star.size / 2, // center of the star
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className="w-[200px]"
                  style={{
                    transform:
                      tooltipSide === "left"
                        ? "translateX(-100%) translateX(-8px)" // slightly offset left
                        : "translateX(8px)", // slightly offset right
                  }}
                >
                  <MemberCard
                    image={star.member.image}
                    position={star.member.title}
                    memberName={star.member.name}
                  />
                </motion.div>
              </motion.div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default StarsView;

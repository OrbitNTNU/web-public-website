'use client';

import React, { Fragment, useEffect, useState } from "react";
import { Team, Member } from "@/app/team/TeamsClientPage";
import { motion } from "framer-motion";
import MemberCard from "@/components/MemberCard";
import { useNavbar } from "@/components/General/Layout/NavbarContext";

interface StarProps {
    x: number;
    y: number;
    member: Member;
    team: Team;
    size: number;
}

const StarsView = ({ teamsData }: { teamsData: Team[] }) => {
    const [stars, setStars] = useState<StarProps[]>([]);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [hoveredStarIndex, setHoveredStarIndex] = useState<number | null>(null);
    const { setInfo, resetInfo } = useNavbar();

    useEffect(() => {
        const allMembersWithTeam = teamsData.flatMap(team =>
            team.members.map(member => ({ member, team })) // pair each member with their team
        );

        const starCount = 150;

        const generatedStars: StarProps[] = Array.from({ length: starCount }, () => {
            const { member, team } = allMembersWithTeam[Math.floor(Math.random() * allMembersWithTeam.length)];
            return {
                x: Math.random() * (window.innerWidth - 40),
                y: Math.random() * 3000,
                size: Math.random() * 4 + 2,
                member,
                team, // include team
            };
        });

        setStars(generatedStars);
    }, [teamsData]);


    useEffect(() => {
        // Set the navbar info based on the article
        setInfo({
            baseHref: "/about",
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
            if (distance <= 50) {
                foundIndex = idx;
            }
        });

        setHoveredStarIndex(foundIndex);
    }, [mousePos]);

    return (
        <div className="relative w-screen min-h-[3000px] bg-charcoal">
            <section className="w-full max-w-5xl items-center text-center mx-auto my-20 px-4 md:px-12 flex flex-col gap-4 pt-20 md:pt-40">
                <h1>Explore Our Stars</h1>
                <span>Hover over the stars to learn more about our team members making a difference.</span>
                <section className="flex flex-row gap-2 text-pink-blast">
                    <span className="material-icons">favorite</span>&nbsp;
                    <span>You are the heart and soul of Orbit</span>
                </section>
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
                            style={{ left: star.x, top: star.y, width: star.size, height: star.size }}
                            animate={{ scale }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />

                        {hoveredStarIndex === idx && (
                            <motion.div
                                className="absolute z-50"
                                style={{
                                    left: star.x + star.size / 2, // center of the star
                                    top: star.y + star.size / 2,  // center of the star
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div
                                    className="w-[200px]"
                                    style={{
                                        transform: tooltipSide === 'left'
                                            ? 'translateX(-100%) translateX(-8px)' // slightly offset left
                                            : 'translateX(8px)', // slightly offset right
                                    }}
                                >
                                    <MemberCard
                                        image={star.member.image}
                                        position={star.member.title}
                                        memberName={star.member.name}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default StarsView;

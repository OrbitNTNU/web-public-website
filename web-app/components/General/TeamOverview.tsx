"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loading } from "./Layout/Loading";
import { getSlug } from "@/lib/teams";

interface Team {
  teamID: number;
  teamName: string;
  description: string;
}

const TeamOverview = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slugs, setSlugs] = useState<Record<number, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Controls how fast you scroll between teams (lower = faster)
  const scrollSpeed = 0.2;

  /** Fetch teams */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/teams");
        const data = await res.json();
        setTeams(data.teams);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  /** Load slugs for each team */
  useEffect(() => {
    const loadSlugs = async () => {
      const slugEntries = await Promise.all(
        teams.map(async (team) => [team.teamID, await getSlug(team.teamID)]),
      );
      setSlugs(Object.fromEntries(slugEntries));
    };
    if (teams.length) void loadSlugs();
  }, [teams]);

  /** Scroll-based active index */
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || teams.length === 0) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop + window.innerHeight / 3;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const relativeScroll = scrollY + viewportHeight / 3 - containerTop;
      const chunkHeight = viewportHeight * scrollSpeed;

      // Include extra chunk for CTA
      const totalItems = teams.length + 1;
      const totalScrollable =
        (totalItems - 1) * chunkHeight + viewportHeight * 0.4;

      const progress = Math.min(
        Math.max(relativeScroll / totalScrollable, 0),
        1,
      );

      const index = Math.floor(progress * totalItems);
      if (index !== activeIndex) {
        setActiveIndex(Math.min(Math.max(index, 0), totalItems - 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [teams, activeIndex, scrollSpeed]);

  if (!teams.length) return <Loading />;

  const totalItems = teams.length + 3; 

  return (
    <section className="hidden lg:block px-4 md:px-12 w-full mx-auto">
      <div
        ref={containerRef}
        className="flex relative"
        style={{
          height: `${totalItems * 100 * scrollSpeed + 100}vh`, // add buffer at end
        }}
      >
        {/* Left column */}
        <div
          className="flex flex-col gap-2 2xl:gap-4 w-1/2 md:w-1/4 sticky h-screen justify-center top-0"
        >
          {teams.map((team, idx) => (
            <motion.span
              key={team.teamID}
              animate={{
                x: Math.max(
                  0,
                  20 * Math.exp(-Math.pow(activeIndex - idx, 2) / 0.8),
                ),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`cursor-pointer ${
                idx === activeIndex
                  ? "text-cloud-white font-bold"
                  : "text-charcoal-light"
              }`}
              onClick={() => {
                if (!containerRef.current) return;

                const container = containerRef.current;
                const viewportHeight = window.innerHeight;
                const chunkHeight = viewportHeight * scrollSpeed;

                const targetScroll =
                  container.offsetTop +
                  (idx + 1) * chunkHeight

                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }}
            >
              {team.teamName}
            </motion.span>
          ))}

          {/* CTA indicator */}
          <motion.span
            animate={{
              x: Math.max(
                0,
                20 * Math.exp(-Math.pow(activeIndex - teams.length, 2) / 0.8),
              ),
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`cursor-pointer ${
              activeIndex === teams.length
                ? "text-cloud-white font-bold"
                : "text-charcoal-light"
            }`}
            onClick={() => {
              if (!containerRef.current) return;

              const container = containerRef.current;
              const viewportHeight = window.innerHeight;
              const chunkHeight = viewportHeight * scrollSpeed;

              const targetScroll =
                container.offsetTop +
                (teams.length + 1) * chunkHeight;

              window.scrollTo({ top: targetScroll, behavior: "smooth" });
            }}
          >
            Join Us
          </motion.span>
        </div>

        {/* Right column */}
        <div
          className="flex-1 sticky h-screen flex items-center text-left top-0"
        >
          {teams
            .sort((a, b) => a.teamName.localeCompare(b.teamName))
            .map(
              (team, idx) =>
                  <motion.section
                    key={team.teamID}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex flex-col w-2/3 ${
                      idx === activeIndex ? "block" : "hidden"
                    }`}
                  >
                    <h2 className="mb-4">{team.teamName}</h2>
                    <p className="mb-4 text-charcoal-light">
                      {team.description}
                    </p>
                    <Link
                      className="flex items-center gap-2 group"
                      href={`/team/${slugs[team.teamID] || ""}`}
                    >
                      <span>Read about {team.teamName}</span>
                      <span className="material-icons text-3xl transition-transform duration-200 group-hover:translate-x-2">
                        chevron_right
                      </span>
                    </Link>
                  </motion.section>
            )}

          {/* CTA Screen */}
          {activeIndex === teams.length && (
            <motion.section
              key="cta"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center text-right w-full"
            >
              <h1
                className="mb-6 leading-[1.1] text-cloud-white"
                style={{ fontSize: "5rem" }}
              >
                Where will you be?
              </h1>

              <Link
                href="/join"
                className="flex items-center justify-end gap-2 group text-charcoal-light hover:text-cloud-white transition-colors"
              >
                <span>Become a part of our team</span>
                <span className="material-icons text-3xl transition-transform duration-200 group-hover:translate-x-2">
                  chevron_right
                </span>
              </Link>
            </motion.section>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamOverview;

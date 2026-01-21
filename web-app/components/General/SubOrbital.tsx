"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SubOrbitalProject } from "@/sanity/types/project";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { Loading } from "@/components/General/Layout/Loading";
import { useState } from "react";

interface ProjectsProps {
  projects: SubOrbitalProject[];
}

export default function SubOrbital({ projects }: ProjectsProps) {
  const [inView, setInView] = useState(false);
  const router = useRouter();

  if (!projects || projects.length === 0) {
    return <Loading />;
  }

  return (
    <section className="w-full mx-auto max-w-[2000px]">
      <motion.h3
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "tween", stiffness: 200 }}
        className="mb-8 tracking-wider text-center mx-auto px-4 md:px-12"
      >
        SubOrbital Projects
      </motion.h3>

      <motion.div
        onViewportEnter={() => setInView(true)}
        className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-none py-4 flex gap-6 md:gap-12 px-4 md:px-12"
        style={{ scrollbarWidth: "none" }}
      >
        {projects
          .sort((a, b) => b.year - a.year)
          .map((proj, idx) => (
            <motion.div
              key={proj._id}
              className="flex-shrink-0 flex flex-col items-center group w-32 md:w-48"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "tween",
                stiffness: 200,
                delay: inView ? 0.1 * idx : 0,
              }}
              // onClick={() => void router.push(`/projects/${proj.slug.current}`)}
            >
              <div className="relative w-full flex justify-center mb-4">
                {proj.patch?.asset?._ref ? (
                  <Image
                    src={imageBuilder(proj.patch.asset._ref, { width: 192 })}
                    alt={`${proj.title} patch`}
                    className="w-32 md:w-48 h-32 md:h-48 object-contain shadow-md shadow-charcoal rounded-full group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-2 transition duration-500"
                    width={192}
                    height={192}
                    priority
                  />
                ) : (
                  <div className="w-32 md:w-48 h-32 md:h-48 bg-charcoal flex items-center justify-center rounded-full shadow-md border-cloud-white border shadow-charcoal group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-2 transition duration-500">
                    <small className="text-cloud-white text-center">
                      No Patch
                    </small>
                  </div>
                )}
              </div>
              <span className="text-center font-black">
                {proj.title.toUpperCase()}
              </span>
              <p className="italic text-center text-charcoal-light">
                {proj.year}
              </p>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}

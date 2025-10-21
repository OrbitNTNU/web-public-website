'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// SubOrbital project data
const subOrbitalProjects = [
    {
        name: "Project 19",
        year: "2019",
        link: "/projects/suborbital-2019"
    },
    {
        name: "Project 20",
        year: "2020",
        link: "/projects/suborbital-2020"
    },
    {
        name: "Cansat",
        year: "2021",
        img: "/patches/sub-orbital/SO_22.png",
        link: "/projects/suborbital-2022"
    },
    {
        name: "Ledzep",
        year: "2022",
        link: "/projects/suborbital-2022"
    },
    {
        name: "Barosat",
        year: "2023",
        img: "/patches/sub-orbital/SO_23.png",
        link: "/projects/suborbital-2023"
    },
    {
        name: "Magsat",
        year: "2024",
        img: "/patches/sub-orbital/SO_24.png",
        link: "/projects/suborbital-2024"
    },
    {
        name: "Raysat",
        year: "2025",
        img: "/patches/sub-orbital/SO_25.png",
        link: "/projects/suborbital-2025"
    },
    {
        name: "MutantSat",
        year: "2026",
        link: "/projects/suborbital-2026"
    },
];

export default function SubOrbital() {
    const router = useRouter();

    return (
        <section className="py-8 w-full max-w-7xl mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, filter: "blur(16px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mx-auto mb-2"
            >
                SUBORBITAL PROJECTS
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, filter: "blur(16px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mx-auto mb-12"
            >
                <p className="w-full md:max-w-1/2 mx-auto">
                    Suborbital projects are small-scale satellite missions designed for research and technology demonstration in the suborbital environment.
                </p>
            </motion.div>

            <div className="flex flex-row flex-wrap gap-4 md:gap-12 w-full items-center justify-center">
                {subOrbitalProjects.map((proj, idx) => (
                    <motion.div
                        key={proj.name}
                        className="cursor-pointer flex flex-col items-center group"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                            delay: idx * 0.15 + 0.2,
                        }}
                        onClick={() => void router.push(proj.link)}
                    >
                        <div className="relative w-full flex justify-center mb-4">
                            {proj.img ? (
                                <Image
                                    src={proj.img}
                                    alt={proj.name + " patch"}
                                    className="object-contain group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500"
                                    width={180}
                                    height={180}
                                    priority
                                />
                            ) : (
                                <svg
                                    width={180}
                                    height={180}
                                    viewBox="0 0 180 180"
                                    className="bg-night-sky rounded-full flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500"
                                >
                                    <circle cx="90" cy="90" r="85" fill="var(--color-charcoal)" stroke="var(--color-cloud-white)" strokeWidth="2" />
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="20"
                                        fill="var(--color-slate)"
                                        fontFamily="sans-serif"
                                    >
                                        Patch Coming
                                    </text>
                                </svg>
                            )}
                        </div>
                        <h3 className="font-black text-center">{proj.name.toUpperCase()}</h3>
                        <p className="italic text-center">{proj.year}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
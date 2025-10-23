'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// SubOrbital project data
const subOrbitalProjects = [
    { name: "OrbitxPropulse", year: "2019", link: "/projects/suborbital-2019" },
    { name: "H.A.B.T.", year: "2020", link: "/projects/suborbital-2020" },
    { name: "Cansat", year: "2021", img: "/patches/sub-orbital/SO_21.png", link: "/projects/suborbital-2022" },
    { name: "Ledzep", year: "2022", img: "/patches/sub-orbital/SO_22.png", link: "/projects/suborbital-2022" },
    { name: "Barosat", year: "2023", img: "/patches/sub-orbital/SO_23.png", link: "/projects/suborbital-2023" },
    { name: "Magsat", year: "2024", img: "/patches/sub-orbital/SO_24.png", link: "/projects/suborbital-2024" },
    { name: "Raysat", year: "2025", img: "/patches/sub-orbital/SO_25.png", link: "/projects/suborbital-2025" },
    { name: "MutantSat", year: "2026", link: "/projects/suborbital-2026" },
];

export default function SubOrbital() {
    const router = useRouter();

    return (
        <section className="py-8 w-full mx-auto max-w-[2000px]">
            <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "tween", stiffness: 200 }}
                className="mb-8 tracking-wider text-center mx-auto px-4 md:px-12"
            >
                SubOrbital Projects
            </motion.h3>

            {/* Horizontal scroll container */}
            <div
                className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-none py-4 flex gap-6 md:gap-12 px-4 md:px-12"
                style={{ scrollbarWidth: "none" }}
            >
                {subOrbitalProjects.sort((a, b) => b.year.localeCompare(a.year)).map((proj, idx) => (
                    <motion.div
                        key={`${proj.name}-${idx}`}
                        className="flex-shrink-0 cursor-pointer flex flex-col items-center group w-32 md:w-48"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ type: "tween", stiffness: 200, delay: 0.2 }}
                        onClick={() => void router.push(proj.link)}
                        style={{
                            transform: `translateY(${idx % 2 === 1 ? '3rem' : '0'})`,
                        }}
                    >
                        <div className="relative w-full flex justify-center mb-4">
                            {proj.img ? (
                                <Image
                                    src={proj.img}
                                    alt={proj.name + " patch"}
                                    className="w-32 md:w-48 h-32 md:h-48 object-contain shadow-md shadow-charcoal rounded-full group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-2 transition duration-500"
                                    width={192}
                                    height={192}
                                    priority
                                />
                            ) : (
                                <div className="w-32 md:w-48 h-32 md:h-48 bg-charcoal flex items-center justify-center rounded-full shadow-md border-cloud-white border shadow-charcoal group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-2 transition duration-500">
                                    <span className="text-cloud-white text-sm text-center">No Patch</span>
                                </div>
                            )}
                        </div>
                        <h3 className="font-black text-center text-sm md:text-base">{proj.name.toUpperCase()}</h3>
                        <p className="italic text-center text-xs md:text-sm">{proj.year}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

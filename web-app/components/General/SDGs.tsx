'use client';
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export const sdgs = [
    {
        id: 4,
        title: "Quality Education",
        description: "Orbit NTNU offers hands-on learning experiences through programs like SubOrbital, where first-year students design and build satellites under mentorship. This initiative provides practical engineering skills and fosters a deep understanding of space technology.",
        image: "/sdgs/E-WEB-Goal-04.png"
    },
    {
        id: 5,
        title: "Gender Equality",
        description: "Orbit NTNU actively promotes gender balance in STEM by encouraging female participation in satellite engineering projects. Initiatives like the SubOrbital program and collaborations with NTNU's gender equality measures support this commitment.",
        image: "/sdgs/E-WEB-Goal-05.png"
    },
    {
        id: 8,
        title: "Decent Work and Economic Growth",
        description: "Through projects like BioSat and SelfieSat, Orbit NTNU provides students with opportunities to engage in real-world space missions, enhancing their employability and contributing to the growth of the space industry.",
        image: "/sdgs/E-WEB-Goal-08.png"
    },
    {
        id: 9,
        title: "Industry, Innovation, and Infrastructure",
        description: "Orbit NTNU develops small satellites with in-house subsystems, demonstrating innovation in space technology. Collaborations with industry partners like KONGSBERG further strengthen the infrastructure for student-led space initiatives.",
        image: "/sdgs/E-WEB-Goal-09.png"
    },
    {
        id: 12,
        title: "Responsible Consumption and Production",
        description: "Orbit NTNU's projects, such as BioSat, focus on sustainable space missions. By designing satellites that can support plant life in space, they explore responsible use of resources in extraterrestrial environments.",
        image: "/sdgs/E-WEB-Goal-12.png"
    },
    {
        id: 13,
        title: "Climate Action",
        description: "Orbit NTNU's BioSat project aims to develop systems that can sustain plant life in space, contributing to research on climate resilience and the potential for sustainable life support systems in space exploration.",
        image: "/sdgs/E-WEB-Goal-13.png"
    },
    {
        id: 17,
        title: "Partnerships for the Goals",
        description: "Orbit NTNU collaborates with NTNU, KONGSBERG, and other organizations to advance space technology education and research. These partnerships enhance the impact of their projects and contribute to achieving the SDGs.",
        image: "/sdgs/E-WEB-Goal-17.png"
    }
];

const SDGs = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // Scroll controller
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const xs = [
        useTransform(scrollYProgress, [0, 0.6], [0, -600]),
        useTransform(scrollYProgress, [0, 0.6], [0, -400]),
        useTransform(scrollYProgress, [0, 0.6], [0, -200]),
        useTransform(scrollYProgress, [0, 0.6], [0, 0]),
        useTransform(scrollYProgress, [0, 0.6], [0, 200]),
        useTransform(scrollYProgress, [0, 0.6], [0, 400]),
        useTransform(scrollYProgress, [0, 0.6], [0, 600]),
    ];

    const ys = [
        useTransform(scrollYProgress, [0, 0.3], [0, 90]),
        useTransform(scrollYProgress, [0, 0.3], [0, 45]),
        useTransform(scrollYProgress, [0, 0.3], [0, 15]),
        useTransform(scrollYProgress, [0, 0.3], [0, 0]),
        useTransform(scrollYProgress, [0, 0.3], [0, 15]),
        useTransform(scrollYProgress, [0, 0.3], [0, 45]),
        useTransform(scrollYProgress, [0, 0.3], [0, 90]),
    ];

    const rotates = [
        useTransform(scrollYProgress, [0, 0.3], [0, -12]),
        useTransform(scrollYProgress, [0, 0.3], [0, -8]),
        useTransform(scrollYProgress, [0, 0.3], [0, -4]),
        useTransform(scrollYProgress, [0, 0.3], [0, 0]),
        useTransform(scrollYProgress, [0, 0.3], [0, 4]),
        useTransform(scrollYProgress, [0, 0.3], [0, 8]),
        useTransform(scrollYProgress, [0, 0.3], [0, 12]),
    ];

    return (
        <section className="relative h-[80vh] w-full">
            <div className="flex flex-col justify-center items-center overflow-visible">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-16 pt-24"
                >
                    Sustainability is a central pillar of Orbit&apos;s mission.
                </motion.h2>

                <div ref={ref} className="relative w-full max-w-[1200px] h-96 flex justify-center items-center">
                    {sdgs.map((sdg, idx) => (
                        <motion.div
                            className={`absolute w-56 h-56 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${hoveredId === sdgs[idx].id
                                ? "z-50 scale-110 shadow-2xl"
                                : `z-[${50 - Math.abs(idx - Math.floor(sdgs.length / 2)) * 10}] shadow-lg`
                                }`}
                            style={{ x: xs[idx], y: ys[idx], rotate: rotates[idx] }}
                            onMouseEnter={() => setHoveredId(sdgs[idx].id)}
                            onMouseLeave={() => setHoveredId(null)}
                            key={sdg.id}
                        >
                            <Image
                                src={sdgs[idx].image}
                                alt={sdgs[idx].title}
                                width={320}
                                height={320}
                                className={`w-full h-full object-cover rounded-xl transition-all duration-300 ${hoveredId === sdgs[idx].id ? "brightness-110" : "brightness-90"
                                    }`}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-8 max-w-2xl text-center px-4"
                    animate={{ opacity: 1, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    {hoveredId ? (
                        <div>
                            <h3 className="mb-4">{sdgs.find((sdg) => sdg.id === hoveredId)?.title}</h3>
                            <p className="text-slate">{sdgs.find((sdg) => sdg.id === hoveredId)?.description}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <h3>Sustainability at Orbit</h3>
                            <p className="text-slate">Hover over an SDG to learn more about how Orbit NTNU contributes to achieving the Sustainable Development Goals.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default SDGs;

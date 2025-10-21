'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { BigProject } from "@/sanity/types/landingPage";
import { useRouter } from "next/navigation";

function getGradient(colors: string[]) {
    return `linear-gradient(135deg, ${colors.join(", ")})`;
}

interface ProjectsProps {
    projects: BigProject[];
}

export default function Projects({ projects }: ProjectsProps) {
    const router = useRouter();

    return (
        <section className="py-8 w-full max-w-7xl mx-auto px-4">
            {/* <div
                className="absolute -translate-y-20 left-0 w-4/5 h-128 bg-slate opacity-10 rounded-r-2xl"
            /> */}
            <motion.h2
                initial={{ opacity: 0, filter: "blur(16px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mx-auto mb-12"
            >
                OUR FLAGSHIPS
            </motion.h2>

            <div className="grid gap-8 max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects.map((bigProject, idx) => (
                    <motion.div
                        key={bigProject._id}
                        className="z-5 cursor-pointer rounded-2xl overflow-hidden flex flex-col items-center p-8 min-h-[340px] transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
                        style={{
                            background: getGradient(bigProject.gradientColors),
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                            delay: idx * 0.2 + 0.2,
                        }}
                        onClick={() => void router.push(`projects/${bigProject.slug.current}`)}
                    >
                        <div className="relative w-full flex justify-center mb-4">
                            <Image
                                src={imageBuilder(bigProject.patch)}
                                alt={bigProject.title + " patch"}
                                className="object-contain"
                                width={250}
                                height={250}
                                priority
                            />
                        </div>
                        <h3 className="mb-4 font-black">{bigProject.title.toUpperCase()}</h3>
                        <p className="mt-2 italic text-center font-semibold">{bigProject.teaser}</p>
                        <Link href={`/projects/${bigProject.slug.current}`} className="mt-auto">
                            <button className="px-4 py-2 flex flex-row gap-2 items-center">
                                Explore
                                <span className="material-icons">arrow_forward</span>
                            </button>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

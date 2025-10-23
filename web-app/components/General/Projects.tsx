'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { useRouter } from "next/navigation";
import { BigProject } from "@/sanity/types/project";

function getGradient(colors: string[], opacity = 0.6) {
    // rgba version for overlay
    const rgbaColors = colors.map(c => c + Math.floor(opacity * 255).toString(16));
    return `linear-gradient(135deg, ${rgbaColors.join(", ")})`;
}

interface ProjectsProps {
    projects: BigProject[];
}

export default function Projects({ projects }: ProjectsProps) {
    const router = useRouter();

    return (
        <section className="py-8 w-full mx-auto px-4 md:px-12 max-w-[2000px]">
            <motion.h3
                 initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                        }}
                className="mb-8 tracking-wider"
            >
                Our flagship projects
            </motion.h3>

            <div className="grid gap-4 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projects.map((project, idx) => (
                    <motion.div
                        key={project._id}
                        className="relative cursor-pointer overflow-hidden shadow-lg group"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                            delay: 0.2 * idx,
                        }}
                        onClick={() => void router.push(`projects/${project.slug.current}`)}
                    >
                        {/* Background image */}
                        <Image
                            src={imageBuilder(project.image)}
                            alt={project.title + " background"}
                            className="object-cover w-full h-72 md:h-128 group-hover:scale-110 transition-all duration-500 brightness-75 group-hover:brightness-100"
                            width={400}
                            height={320}
                            priority
                        />

                        {/* Content overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-cloud-white">
                            <h3 className="uppercase tracking-wider">{project.title}</h3>
                            <p className="italic">{project.teaser}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

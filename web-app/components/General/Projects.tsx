'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { useRouter } from "next/navigation";
import { BigProject } from "@/sanity/types/project";

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
                {projects.map((bigProject) => (
                    <motion.div
                        key={bigProject._id}
                        className="z-5 cursor-pointer rounded-2xl overflow-hidden flex flex-row md:flex-col items-center gap-4 md:gap-0 p-4 md:p-8 md:min-h-[340px] transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
                        style={{
                            background: getGradient(bigProject.gradientColors),
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                        }}
                        onClick={() => void router.push(`projects/${bigProject.slug.current}`)}
                    >
                        <div className="relative flex justify-center w-2/5 md:w-full">
                            <Image
                                src={imageBuilder(bigProject.patch)}
                                alt={bigProject.title + " patch"}
                                className="object-contain"
                                width={250}
                                height={250}
                                priority
                            />
                        </div>
                        <span className="flex flex-col items-start md:items-center md:text-left gap-2 md:mt-4 w-3/5 md:w-full">
                            <h3 className="font-black">{bigProject.title.toUpperCase()}</h3>
                            <p className="italic md:text-center font-semibold">{bigProject.teaser}</p>
                            <Link href={`/projects/${bigProject.slug.current}`} className="mt-auto">
                                <button className="md:px-4 py-2 flex flex-row gap-2 items-center">
                                Explore
                                <span className="material-icons">arrow_forward</span>
                            </button>
                        </Link>

                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

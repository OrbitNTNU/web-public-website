'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Patch image paths (adjust if needed)
const patches = [
    {
        name: "SelfieSat",
        img: "/patches/SS.png",
        colors: [
            "var(--color-selfiesat-blue)",
            "var(--color-selfiesat-dark-blue)",
            "var(--color-selfiesat-green)",
        ],
        teaser: "Norway's first student satellite.",
        link: "/projects/selfiesat"
    },
    {
        name: "FramSat-1",
        img: "/patches/FS_1.png",
        colors: [
            "var(--color-framsat-blue)",
            "var(--color-framsat-yellow)",
            "var(--color-framsat-red)",
        ],
        teaser: "The first satellite from continental Europe.",
        link: "/projects/framsat-1"
    },
    {
        name: "FramSat-1.5",
        img: "/patches/FS_1.5.png",
        colors: [
            "var(--color-framsat-pink)",
            "var(--color-framsat-red)",
            "var(--color-framsat-blue)",

        ],
        teaser: "Picking up where FramSat-1 left off.",
        link: "/projects/framsat-1.5"
    },
    {
        name: "BioSat",
        img: "/patches/BS.png",
        colors: [
            "var(--color-biosat-green)",
            "var(--color-biosat-dark-green)",
        ],
        teaser: "Growing a plant in space.",
        link: "/projects/biosat"
    },
];

function getGradient(colors: string[]) {
    return `linear-gradient(135deg, ${colors.join(", ")})`;
}

export default function Projects() {

    const router = useRouter();

    return (
        <section className="py-8 w-full max-w-7xl mx-auto px-4">

            <motion.h2
                initial={{ opacity: 0, filter: "blur(16px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mx-auto mb-12"
            >
                OUR FLAGSHIPS
            </motion.h2>

            <div className="grid gap-8 max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {patches.map((patch, idx) => (
                    <motion.div
                        key={patch.name}
                        className="z-5 cursor-pointer rounded-2xl overflow-hidden flex flex-col items-center p-8 min-h-[340px] transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
                        style={{
                            background: getGradient(patch.colors),
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                            delay: idx * 0.2 + 0.2,
                        }}
                        onClick={() => void router.push(patch.link)}
                    >
                        <div className="relative w-full flex justify-center mb-4">
                            <Image
                                src={patch.img}
                                alt={patch.name + " patch"}
                                className="object-contain"
                                width={250}
                                height={250}
                                priority
                            />
                        </div>
                        <h3 className="mb-4 font-black">{patch.name.toUpperCase()}</h3>
                        <p className="mt-2 italic text-center font-semibold">{patch.teaser}</p>
                        <Link href={`/projects/${patch.name.toLowerCase()}`} className="mt-auto">
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

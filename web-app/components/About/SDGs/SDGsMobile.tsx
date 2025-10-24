'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { sdgs } from "./SDGs";

const SDGsMobile = () => {
    return (
        <section className="relative w-full px-4 py-12 md:px-12 max-w-[2000px] mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center mb-12"
            >
                Sustainability is a central pillar of Orbit&apos;s mission.
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sdgs.map((sdg) => (
                    <motion.div
                        key={sdg.id}
                        className="flex flex-col sm:flex-row items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="flex-shrink-0">
                            <Image
                                src={sdg.image}
                                alt={sdg.title}
                                width={160}
                                height={160}
                                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl"
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-lg md:text-xl font-semibold mb-2">{sdg.title}</h3>
                            <p className="text-sm md:text-base text-slate">{sdg.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SDGsMobile;

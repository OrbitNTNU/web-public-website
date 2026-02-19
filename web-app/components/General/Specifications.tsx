"use client";
import Image from "next/image";
import {motion, useInView, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";

interface SpecificationsProps {
    title: string,
    specifications: {label: string, value: string}[],
    image?: string,
}

const tableVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {staggerChildren: 0.08}},
};

const rowVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {opacity: 1, y: 0},
};

const Specifications = ({
                            title,
                            specifications,
                            image,
                        }: SpecificationsProps) => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    const inView = useInView(sectionRef, {once: true});

    // Parallax effect — track scroll relative to the graphic container, not the whole section
    const {scrollYProgress} = useScroll({
        target: imageRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section
            ref={sectionRef}
            className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16"
        >
            <motion.h2
                className="tracking-tight mb-6 text-2xl md:text-3xl font-semibold"
                initial={{opacity: 0, y: -10}}
                animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: -10}}
                transition={{duration: 0.5}}
            >
                {title.toUpperCase()}
            </motion.h2>

            <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10">
                {/* Table */}
                <motion.div
                    className="flex-1 h-auto w-full"
                    variants={tableVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <div className="divide-y divide-moonlight border border-moonlight overflow-hidden rounded-xl">
                        {specifications.map(({label, value}, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center justify-between px-4 py-3"
                                variants={rowVariants}
                            >
                <span className="text-charcoal-light tracking-wide uppercase text-sm md:text-base">
                  {label}
                </span>
                                <span className="text-cloud-white tracking-tight text-lg md:text-xl font-medium">
                  {value}
                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Graphic + Parallax */}
                <motion.div
                    ref={imageRef}
                    className="relative flex items-start justify-center lg:w-1/2"
                    initial={{opacity: 0}}
                    animate={inView ? {opacity: 1} : {opacity: 0}}
                    transition={{duration: 0.6}}
                >
                    {image && (
                        <motion.div
                            className="flex items-center justify-center"
                        >
                            <Image
                                src={image}
                                alt="Additional Specification Image"
                                width={350}
                                height={350}
                                className="object-fit w-full h-full"
                            />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Specifications;

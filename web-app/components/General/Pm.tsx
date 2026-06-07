"use client"
import Image from "next/image";
import {motion, useInView } from "framer-motion"
import {useRef} from "react"
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import type { Image as SanityImage } from "@/sanity/types/image";

interface PmProps {
    title: string,
    body: string,
    pmCards: {
        pmImage: SanityImage;
        pmName: string;
        pmPeriodStart: string;
        pmPeriodEnd?: string | null;
    }[],
}

const toDate = (value: string): Date | null => {
    if (!value) return null;

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
});

const formatPeriod = (start: string, end: string | undefined | null): string => {
    const startDate = toDate(start);
    const endDate = end ? toDate(end) : null;

    const startLabel = startDate ? dateFormatter.format(startDate) : null;
    const endLabel = endDate ? dateFormatter.format(endDate) : "d.d.";

    if (!startLabel) return endLabel;
    return `${startLabel} - ${endLabel}`;
};

const pmVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {staggerChildren: 0.1}},
}

const Pm = ({title, body, pmCards}: PmProps) => {
    const sectionRef = useRef(null);
    const pmCardRef = useRef(null);

    const inView = useInView(sectionRef, {once: true});

    // @ts-ignore
    return (
      <section
        ref={sectionRef}
        className="w-full max-w-7xl mx-auto px-4 md:px-12"
      >
        <motion.div
            className="flex flex-col lg:flex-row justify-center items-center gap-10"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="flex-[2px] h-auto w-full">
                <motion.h2
                    className="tracking-tight mb-6 text-2xl md:text-3xl font-semibold"
                    initial={{opacity: 0, y: -10}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: -10}}
                    transition={{duration: 0.5}}
                >
                    {title.toUpperCase()}
                </motion.h2>
                <motion.div
                    className=""
                    initial={{opacity: 0, y: -10}}
                    animate={inView ? "visible" : "hidden"}
                    transition={{duration: 0.5, delay: 0.1}}
                >
                    {body}
                </motion.div>
            </div>
            <motion.div
                ref={pmCardRef}
                className="flex-[1px] h-auto w-full flex flex-col gap-6"
                initial={{opacity: 0, y: 20}}
                animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                {pmCards.map(({pmImage, pmName, pmPeriodStart, pmPeriodEnd}, i) => {
                    const pmImageSrc = imageBuilder(pmImage, {
                        width: 400,
                        height: 400,
                        quality: 80,
                        format: "webp",
                        fit: "crop",
                    });

                    return (
                        <motion.div
                            key={i}
                            className={ pmPeriodEnd ? "flex items-bottom justify-center px-4 py-4"
                                : "flex items-bottom justify-center px-4 py-4 scale-125"}
                            variants={pmVariants}
                        >
                            {pmImageSrc ? (
                                <Image
                                    src={pmImageSrc}
                                    alt={`${pmName}'s image`}
                                    width={150}
                                    height={150}
                                    className="object-cover w-full h-full"
                                />
                            ) : null}
                            <span aria-label="PM name">
                                {pmName}
                            </span>
                            <span aria-label="PM lead period">
                                {formatPeriod(pmPeriodStart, pmPeriodEnd)}
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
      </section>
    );
};

export default Pm;
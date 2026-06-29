"use client"
import Image from "next/image";
import {motion, useInView } from "framer-motion"
import {useRef} from "react"
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import type { Image as SanityImage } from "@/sanity/types/image";
import { PortableText } from "@portabletext/react";

interface PmProps {
    title: string,
    body: any,
    pmCards: {
        pmImage: SanityImage;
        pmName: string;
        pmPeriodStart: string;
        pmPeriodEnd?: string | null;
    }[],
    combined?: boolean;
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

const Pm = ({title, body, pmCards, combined = false}: PmProps) => {
    const sectionRef = useRef(null);
    const pmCardRef = useRef(null);

    const inView = useInView(sectionRef, {once: true});

    // @ts-ignore
    return (
      <section
        ref={sectionRef}
        className={`w-full h-full flex items-center px-8 md:px-20 lg:px-32 xl:px-40 ${
            combined ? "py-4 lg:py-2" : "py-16"
        }`}
      >
        <motion.div
            className="flex flex-col lg:flex-row justify-center items-center gap-10"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="flex-[2px] h-auto w-full">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-strong mb-[16px] lg:mb-6"
                    initial={{opacity: 0, y: -10}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: -10}}
                    transition={{duration: 0.5}}
                >
                    {title.toUpperCase()}
                </motion.h2>
                <motion.div
                    className="text-charcoal-light leading-relaxed max-w-lg text-sm md:text-base"
                    initial={{opacity: 0, y: -10}}
                    animate={inView ? "visible" : "hidden"}
                    transition={{duration: 0.5, delay: 0.1}}
                >
                    <PortableText value={body} />
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

                    let current = false;
                    if (typeof(pmPeriodEnd) === "undefined") {
                        current = true;
                    }

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
                                    fill
                                    sizes={
                                        current
                                            ? "(min-width: 64rem) 420px, 45vw"
                                            : "(min-width: 64rem) 200px, 22vw"
                                    }
                                    loading="lazy"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
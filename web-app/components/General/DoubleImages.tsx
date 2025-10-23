'use client';
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface DoubleImagesProps {
    src1: string;
    alt1: string;
    title1?: string;
    caption1?: string;
    link1?: string;
    src2: string;
    alt2: string;
    title2?: string;
    caption2?: string;
    link2?: string;
    variant?: "half-half" 
    | "one-third-two-third" 
    | "two-third-one-third"
    | "half-half-long-left"
    | "half-half-long-right";
}

const getGridCols = (variant: DoubleImagesProps["variant"]) => {
    switch (variant) {
        case "one-third-two-third":
            return "grid-cols-1 md:grid-cols-3";
        case "two-third-one-third":
            return "grid-cols-1 md:grid-cols-3";
        case "half-half-long-left":
        case "half-half-long-right":
            return "grid-cols-1 md:grid-cols-2";
        default:
            return "grid-cols-1 md:grid-cols-2";
    }
};

const getColSpan = (variant: DoubleImagesProps["variant"], index: number) => {
    if (variant === "one-third-two-third") {
        return index === 0 ? "col-span-1" : "md:col-span-2";
    }
    if (variant === "two-third-one-third") {
        return index === 0 ? "md:col-span-2" : "col-span-1";
    }
    return "";   
};

const getRowSpan = (variant: DoubleImagesProps["variant"], index: number) => {
    if (variant === "half-half-long-left" && index === 0) {
        return "md:row-span-2";
    }
    if (variant === "half-half-long-right" && index === 1) {
        return "md:row-span-2";
    }
    return "";
};

const getImageAspect = (variant: DoubleImagesProps["variant"], index: number) => {
    if (variant === "half-half-long-left" && index === 0) {
        return "aspect-[9/12]";
    }
    if (variant === "half-half-long-right" && index === 1) {
        return "aspect-[9/12]";
    }
    return "aspect-[9/6]";
};

const imageVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(16px)" },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: custom,
        },
    }),
};

const textVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: "easeOut",
            delay: 0.6,
        },
    },
};

const DoubleImages = ({
    src1,
    alt1,
    title1,
    caption1,
    link1,
    src2,
    alt2,
    title2,
    caption2,
    link2,
    variant = "half-half",
}: DoubleImagesProps) => {
    const gridCols = getGridCols(variant);

    // Generate random delays for each image (between 0.15 and 0.35 seconds)
    const delay1 = 0.15 + Math.random();
    const delay2 = 0.21 + Math.random();

    const isLarge = (variant: DoubleImagesProps["variant"], index: number) =>
        (variant === "one-third-two-third" && index === 1) ||
        (variant === "two-third-one-third" && index === 0);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const renderImage = (
        src: string,
        alt: string,
        delay: number,
        link?: string,
        aspectClass?: string
    ) => {
       
        const image = (
            <motion.div
                ref={ref}
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={delay}
                whileHover={link ? "hover" : undefined}
                className="overflow-hidden mb-4"
            >
                <Image
                    src={src}
                    alt={alt}
                    className={`w-full h-auto shadow-lg ${aspectClass} object-cover ${link ? "cursor-pointer hover:scale-105 transition-transform duration-500 ease-in-out" : ""}`}
                    width={1600}
                    height={600}
                    style={{
                        objectFit: "cover",
                    }}
                />
            </motion.div>
        );
        return link ? (
            <Link href={link} tabIndex={0} aria-label={alt}>
                {image}
            </Link>
        ) : (
            image
        );
    };

    return (
        <div className={`w-full px-4 md:px-12 mx-auto grid ${gridCols} gap-8 md:auto-rows-fr max-w-[2000px]`}>
            <motion.div
                className={`relative ${getColSpan(variant, 0)} ${getRowSpan(variant, 0)}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {renderImage(src1, alt1, delay1, link1, getImageAspect(variant, 0))}
                {title1 && (
                    <motion.h3
                        className="font-black w-full sm:w-auto md:px-4"
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.7 }}
                    >
                        {title1.toUpperCase()}
                    </motion.h3>
                )}
                {caption1 && (
                    <motion.span
                        className={`block w-full ${isLarge(variant, 0) ? "md:max-w-2/3" : ""} md:px-4`}
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.7 }}
                    >
                        <p>{caption1}</p>
                    </motion.span>
                )}
            </motion.div>
            <motion.div
                className={`relative ${getColSpan(variant, 1)} ${getRowSpan(variant, 1)}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {renderImage(src2, alt2, delay2, link2, getImageAspect(variant, 1))}
                {title2 && (
                    <motion.h3
                        className="font-black w-full sm:w-auto md:px-4"
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.7 }}
                    >
                        {title2.toUpperCase()}
                    </motion.h3>
                )}
                {caption2 && (
                    <motion.span
                        className={`block w-full ${isLarge(variant, 1) ? "md:max-w-2/3" : ""} md:px-4`}
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.7 }}
                    >
                        <p>{caption2}</p>
                    </motion.span>
                )}
            </motion.div>
        </div>
    );
};

export default DoubleImages;

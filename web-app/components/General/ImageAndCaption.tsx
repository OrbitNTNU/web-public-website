'use client';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageAndCaptionProps {
    src: string;
    alt: string;
    title?: string;
    caption?: string;
    wideCaption?: boolean;
    link?: string;
    variant?: "standard" | "large-left" | "large-right";
}

const variantStyles = {
    "standard": "flex-col md:flex-row gap-8 items-start",
    "large-left": "flex-col md:flex-row gap-12 items-start",
    "large-right": "flex-col md:flex-row-reverse gap-12 items-start",
};

const imageSizes = {
    "standard": { width: 800, height: 600 },
    "large-left": { width: 1000, height: 700 },
    "large-right": { width: 1000, height: 700 },
};

const imageWidthClass = {
    "standard": "w-full md:w-1/2",
    "large-left": "w-full md:w-2/3",
    "large-right": "w-full md:w-2/3",
};

const ImageAndCaption = ({
    src,
    alt,
    title,
    caption,
    wideCaption = false,
    link,
    variant = "standard",
}: ImageAndCaptionProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Create a strong parallax transform (move image slower than scroll)
    const y = useTransform(scrollYProgress, [0, 1.0], [-50, 50]);
    const { width, height } = imageSizes[variant];

    return (
        <section
            className="w-full mx-auto px-4 md:px-12 max-w-7xl overflow-hidden"
            ref={ref}
        >
            <motion.div
                className={`flex ${variantStyles[variant]}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {/* Parallax Image */}
                <motion.div
                    className={`flex-shrink-0 relative overflow-hidden ${imageWidthClass[variant]}`}
                    style={{ y }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                    {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={src}
                                alt={alt}
                                width={width}
                                height={height}
                                className="w-full h-auto shadow-lg hover:opacity-90 transition-opacity duration-300"
                            />
                        </a>
                    ) : (
                        <Image
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            className="w-full h-auto shadow-lg scale-150"
                            style={{ transformOrigin: "top center" }    }
                        />
                    )}
                </motion.div>

                {/* Text Content */}
                {(title || caption) && (
                    <motion.div
                        className={`flex flex-col justify-start ${wideCaption ? "flex-1" : ""}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    >
                        {title && (
                            <h3 className="font-black mb-4 tracking-tight">
                                {title.toUpperCase()}
                            </h3>
                        )}
                        {caption && (
                            <p className="text-charcoal-light leading-relaxed whitespace-pre-wrap">
                                {caption}
                            </p>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default ImageAndCaption;

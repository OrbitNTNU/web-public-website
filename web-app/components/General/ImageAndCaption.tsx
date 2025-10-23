'use client';
import Image from "next/image";
import { motion } from "framer-motion";

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
    const { width, height } = imageSizes[variant];

    return (
        <section className="w-full mx-auto px-4 sm:px-8">
            <motion.div
                className={`flex ${variantStyles[variant]}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {/* Image */}
                <motion.div
                    className={`flex-shrink-0 ${imageWidthClass[variant]}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={src}
                                alt={alt}
                                width={width}
                                height={height}
                                className="w-full h-auto rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
                                style={{ objectFit: "cover" }}
                            />
                        </a>
                    ) : (
                        <Image
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            className="w-full h-auto rounded-lg shadow-lg"
                            style={{ objectFit: "cover" }}
                        />
                    )}
                </motion.div>
                {/* Text */}
                {(title || caption) && (
                    <motion.div
                        className={`flex flex-col justify-start ${wideCaption ? "flex-1" : ""}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    >
                        {title && <h3 className="font-black mb-4">{title.toUpperCase()}</h3>}
                        {caption && <p className="text-slate leading-relaxed">{caption}</p>}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}

export default ImageAndCaption;

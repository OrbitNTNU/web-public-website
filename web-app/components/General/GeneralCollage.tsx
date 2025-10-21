'use client';
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GeneralCollageProps {
    images: Array<{ src: string; alt: string }>;
    title?: string;
    caption?: string;
    wideCaption?: boolean;
    variant?: "large-left" | "large-right";
}

// Deterministic pseudo-random based on index
function pseudoRandom(i: number, min: number, max: number) {
    // Improved randomness using bitwise and math operations
    let seed = ((i + 1) * 9301 + 49107) ^ (i << 3) ^ (i >> 2);
    seed = Math.abs(Math.sin(seed) * 10000);
    const rnd = seed - Math.floor(seed);
    return Math.floor(rnd * (max - min + 1)) + min;
}

const GeneralCollage = ({
    images,
    title,
    caption,
    wideCaption = false,
    variant = "large-left",
}: GeneralCollageProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <section
            ref={ref}
            className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 relative overflow-hidden"
        >
            {title && (
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                    {title.toUpperCase()}
                </h1>
            )}
            {caption && (
                <p className={`text-slate-400 mb-8 ${wideCaption ? "max-w-4xl" : "max-w-xl"}`}>
                    {caption}
                </p>
            )}

            <div className="flex flex-col gap-20 md:gap-28">
                {images.filter((_, i) => i % 2 === 0).map((img, i) => {
                    // Deterministic widths and positions based on index
                    const largeWidth = pseudoRandom(i, 60, 70); // percent
                    const smallWidth = pseudoRandom(i, 50, 80); // percent
                    const overlapTop = pseudoRandom(i, 10, 60); // percent
                    const overlapSide = pseudoRandom(i, 10, 50); // percent

                    const isEven = i % 2 === 0;
                    const direction =
                        variant === "large-left"
                            ? isEven
                                ? "left"
                                : "right"
                            : isEven
                            ? "right"
                            : "left";

                    return (
                        <div
                            key={i}
                            className={`relative flex flex-col md:flex-row items-center ${
                                direction === "left"
                                    ? "md:justify-start"
                                    : "md:justify-end"
                            } gap-8`}
                        >
                            {/* Large image */}
                            <motion.div
                                className={`relative w-full`}
                                style={{
                                    width: `100%`,
                                    maxWidth: `${largeWidth}%`,
                                    zIndex: 20,
                                    order: direction === "left" ? 0 : 2,
                                }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={1000}
                                    height={700}
                                    className="w-full h-auto rounded-xl shadow-2xl object-cover"
                                />
                                {/* Smaller floating offset image, always overlapping large */}
                                {images[i + 1] && (
                                    <motion.div
                                        className="absolute hidden md:block"
                                        style={{
                                            top: `${overlapTop}%`,
                                            [direction === "left" ? "right" : "left"]: `-${overlapSide}%`,
                                            width: `${smallWidth}%`,
                                            zIndex: 30,
                                        }}
                                    >
                                        <Image
                                            src={images[i + 1].src}
                                            alt={images[i + 1].alt}
                                            width={600}
                                            height={400}
                                            className="w-full h-auto rounded-lg shadow-[0_12px_48px_rgba(0,0,0,0.5)] object-cover"
                                        />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default GeneralCollage;

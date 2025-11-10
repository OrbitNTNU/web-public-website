'use client';

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface JoinClientPageProps {
    content: {
        title: string;
        text: string;
        buttons: {
            buttonLink: string;
            buttonText: string;
            icon: string;
        }[];
        images: string[];
    };
}

const JoinClientPage = ({ content }: JoinClientPageProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"], // when section enters/exits viewport
    });

    // Subtle parallax effect for images
    const y1 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

    return (
        <section
            ref={sectionRef}
            className="w-full mx-auto px-4 md:px-12 max-w-[1600px] md:flex-row my-32 md:my-40 flex flex-col gap-8 md:gap-20"
        >
            <div
                className="w-full xl:w-2/5 h-auto relative"
            >
                <h1 className="mb-4">
                    {content.title}
                </h1>

                <span className="flex whitespace-pre-wrap mb-10 md:mb-20 text-charcoal-light leading-relaxed">
                    {content.text}
                </span>
                <section className="flex flex-col gap-4">
                    {content.buttons.map((button, index) => (
                        <Link
                            key={index}
                            className="flex flex-row gap-2 cursor-pointer items-center border bg-charcoal border-charcoal-light hover:border-cloud-white px-4 py-2 rounded-lg w-fit text-cloud-white transition duration-200"
                            href={button.buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="material-icons text-3xl">
                                {button.icon}
                            </span>
                            <span>{button.buttonText}</span>
                        </Link>
                    ))}
                </section>
            </div>

            <div className="w-full xl:w-3/5 h-auto columns-2 gap-4 relative">
                {content.images.map((image, index) => {
                    const parallaxY = index % 2 === 0 ? y1 : y2;
                    return (
                        <motion.div
                            key={index}
                            className={`relative break-inside-avoid rounded-2xl overflow-hidden ${index === 1 || index === 3 ? "mt-4" : ""
                                }`}
                            style={{
                                height:
                                    index === 0 || index === 3
                                        ? "600px"
                                        : index === 1 || index === 2
                                            ? "200px"
                                            : "200px",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                style={{ y: parallaxY }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    fill
                                    className="object-cover scale-110"
                                />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default JoinClientPage;

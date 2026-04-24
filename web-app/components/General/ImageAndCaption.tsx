"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface ImageAndCaptionProps {
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  link?: string;
  variant?: "standard" | "large-left" | "large-right";
}

const variantStyles = {
  standard: "flex-col md:flex-row gap-8 items-start",
  "large-left": "flex-col md:flex-row gap-12 items-start",
  "large-right": "flex-col md:flex-row-reverse gap-12 items-start",
};

const imageWidthClass = {
  standard: "w-full md:w-1/2",
  "large-left": "w-full md:w-2/3",
  "large-right": "w-full md:w-2/3",
};

const captionWidthClass = {
  standard: "w-full md:w-1/2",
  "large-left": "w-full md:w-1/3",
  "large-right": "w-full md:w-1/3",
};

const aspectClass = {
  standard: "aspect-[4/3]",
  "large-left": "aspect-[3/2]",
  "large-right": "aspect-[3/2]",
};

const ImageAndCaption = ({
  src,
  alt,
  title,
  caption,
  link,
  variant = "standard",
}: ImageAndCaptionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1.0], [-50, 50]);

  return (
    <section
      ref={ref}
      className="w-full mx-auto px-4 md:px-12 max-w-7xl overflow-hidden"
    >
      <motion.div
        className={`flex ${variantStyles[variant]}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Image */}
        {src && alt && (
          <div className={`relative overflow-hidden shrink-0 ${imageWidthClass[variant]}`}>
            <motion.div style={{ y }} className={`relative w-full ${aspectClass[variant]}`}>
              {link ? (
                <Link href={link} rel="noopener noreferrer">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              ) : (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover shadow-lg"
                />
              )}
            </motion.div>
          </div>
        )}

        {/* Text */}
        {(title || caption) && (
          <motion.div
            className={`flex flex-col justify-center shrink-0 ${captionWidthClass[variant]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {title && <h3 className="tracking-wider mb-4">{title}</h3>}
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
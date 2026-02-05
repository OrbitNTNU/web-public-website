"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface LargeImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const LargeImage = ({ src, alt, caption }: LargeImageProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
      <div
          ref={ref}
          className="relative w-full mx-auto max-w-7xl px-4 md:px-12 overflow-hidden">
        <div className="relative w-full overflow-hidden aspect-[16/9] shadow-lg">
          <motion.div
              style={{ y }}
              className="absolute inset-0 will-change-transform"
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover scale-110"
                style={{ filter: "brightness(0.85)" }}
            />
          </motion.div>
        </div>

        {caption && (
            <h3 className="absolute bottom-6 left-8 md:left-16 text-cloud-white font-black italic drop-shadow-md">
              {caption}
            </h3>
        )}
      </div>
  );
};

export default LargeImage;

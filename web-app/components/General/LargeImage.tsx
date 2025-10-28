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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Strong but smooth parallax — moves image within container
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="relative w-full mx-auto max-w-7xl px-4 md:px-12 overflow-hidden"
    >
      {/* Static height container to avoid layout shift */}
      <div className="relative w-full overflow-hidden aspect-[16/9] shadow-lg">
        <motion.div
          style={{ y }}
          className="absolute inset-0 will-change-transform"
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={900}
            className="w-full h-full object-cover scale-110" // slightly larger to avoid edge cropping
            style={{
              filter: "brightness(0.85)",
            }}
            priority
          />
        </motion.div>
      </div>

      {/* Caption */}
      {caption && (
        <h3 className="absolute bottom-6 left-8 md:left-16 text-white font-black italic drop-shadow-md text-lg md:text-xl">
          {caption.toUpperCase()}
        </h3>
      )}
    </div>
  );
};

export default LargeImage;

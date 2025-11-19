"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

interface DoubleImageWideProps {
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
  variant?:
    | "half-half"
    | "one-third-two-third"
    | "two-third-one-third"
    | "half-half-long-left"
    | "half-half-long-right";
}

const getGridCols = (variant: DoubleImageWideProps["variant"]) => {
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

const getColSpan = (
  variant: DoubleImageWideProps["variant"],
  index: number,
) => {
  if (variant === "one-third-two-third") {
    return index === 0 ? "col-span-1" : "md:col-span-2";
  }
  if (variant === "two-third-one-third") {
    return index === 0 ? "md:col-span-2" : "col-span-1";
  }
  return "";
};

const getRowSpan = (
  variant: DoubleImageWideProps["variant"],
  index: number,
) => {
  if (variant === "half-half-long-left" && index === 0) {
    return "md:row-span-2";
  }
  if (variant === "half-half-long-right" && index === 1) {
    return "md:row-span-2";
  }
  return "";
};

const getImageAspect = (
  variant: DoubleImageWideProps["variant"],
  index: number,
) => {
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
      duration: 0.4,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const DoubleImageWide = ({
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
}: DoubleImageWideProps) => {
  const gridCols = getGridCols(variant);

  // Generate random delays for each image (between 0.15 and 0.35 seconds)
  const delay1 = 0.15 * Math.random();
  const delay2 = 0.21 * Math.random();

  const isLarge = (variant: DoubleImageWideProps["variant"], index: number) =>
    (variant === "one-third-two-third" && index === 1) ||
    (variant === "two-third-one-third" && index === 0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const renderImage = (
    src: string,
    alt: string,
    delay: number,
    link?: string,
    aspectClass?: string,
  ) => {
    const image = (
      <motion.div
        ref={ref}
        variants={imageVariants}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "tween", stiffness: 200, delay: 0.1 }}
        custom={delay}
        whileHover={link ? "hover" : undefined}
        className="overflow-hidden"
      >
        <motion.div style={{ y: y }}>
          <Image
            src={src}
            alt={alt}
            className={`scale-115 w-full h-auto shadow-lg ${aspectClass} object-cover ${link ? "cursor-pointer hover:scale-120 transition-transform duration-500 ease-in-out" : ""}`}
            width={1600}
            height={600}
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
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
    <div className={`w-full mx-auto grid ${gridCols} gap-8 md:auto-rows-fr`}>
      <motion.div
        className={`relative ${getColSpan(variant, 0)} ${getRowSpan(variant, 0)}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {renderImage(src1, alt1, delay1, link1, getImageAspect(variant, 0))}
        {title1 && (
          <motion.h3
            className={`tracking-wider mt-4 ${caption1 ? "mb-2" : ""}`}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {title1}
          </motion.h3>
        )}
        {caption1 && (
          <motion.span
            className={`block w-full ${isLarge(variant, 0) ? "md:max-w-3/4" : ""} ${title1 ? "" : "mt-4"}`}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-charcoal-light whitespace-pre-wrap">
              {caption1}
            </p>
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
            className={`tracking-wider mt-4 ${caption2 ? "mb-2" : ""}`}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {title2}
          </motion.h3>
        )}
        {caption2 && (
          <motion.span
            className={`block w-full ${isLarge(variant, 1) ? "md:max-w-3/4" : ""} ${title2 ? "" : "mt-4"}`}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-charcoal-light whitespace-pre-wrap">
              {caption2}
            </p>
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

export default DoubleImageWide;

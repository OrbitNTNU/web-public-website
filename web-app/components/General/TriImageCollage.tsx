"use client";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

interface TriImageCollageProps {
  title?: string;
  caption?: string;
  src1: string;
  alt1: string;
  src2: string;
  alt2: string;
  src3: string;
  alt3: string;
  variant?: "large-left" | "large-right";
  wideCaption?: boolean;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};
const TriImageCollage = ({
  title,
  caption,
  src1,
  alt1,
  src2,
  alt2,
  src3,
  alt3,
  variant = "large-left",
  wideCaption = false,
}: TriImageCollageProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll animation bound to this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Floating small image (top) moves strongly
  const yTop = useTransform(scrollYProgress, [0, 1], ["-80%", "-320%"]);

  // Lower image parallax (subtle)
  const yBottom = useTransform(scrollYProgress, [0, 1], ["-40%", "20%"]);

  const { gridClasses, imageLayouts } = useMemo(() => {
    let gridClasses = "relative grid gap-4";
    let imageLayouts: Array<{
      className: string;
      style?: React.CSSProperties;
    }> = [];

    if (variant === "large-left") {
      gridClasses += " md:grid-cols-3 md:grid-rows-2";
      imageLayouts = [
        { className: "md:col-span-2 md:row-span-1 h-full" }, // largest, made longer
        {
          className:
            "md:col-start-2 md:row-start-2 md:col-span-2 md:row-span-1 flex h-2/3 md:mr-12 relative z-20 mt-12 shadow-2xl",
        }, // lower, tailwind shadow
        {
          className:
            "absolute hidden md:block md:w-2/5 w-1/2 md:right-0 md:bottom-0 z-10 shadow-3xl",
        }, // top floating, tailwind shadow
      ];
    } else {
      gridClasses += " md:grid-cols-3 md:grid-rows-2";
      imageLayouts = [
        {
          className:
            "md:col-start-1 md:row-start-2 md:col-span-2 md:row-span-1 flex h-2/3 md:ml-12 relative z-20 mt-12 shadow-2xl",
        }, // lower, tailwind shadow
        { className: "md:col-start-2 md:col-span-2 md:row-span-1 h-full" }, // largest, made longer
        {
          className:
            "absolute hidden md:block md:w-2/5 w-1/2 md:left-0 md:bottom-0 z-10 shadow-3xl",
        }, // top floating, tailwind shadow
      ];
    }

    return { gridClasses, imageLayouts };
  }, [variant]);

  const images = [
    { src: src1, alt: alt1 },
    { src: src2, alt: alt2 },
    { src: src3, alt: alt3 },
  ];

  return (
    <section
      ref={ref}
      className="mx-auto w-full px-4 sm:px-12 relative overflow-hidden"
    >
      {title && (
        <motion.h3
          className="tracking-wider mb-4"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          {title}
        </motion.h3>
      )}
      {caption && (
        <motion.p
          className={`text-charcoal-light mb-6 ${wideCaption ? "max-w-4xl" : "max-w-xl"}`}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          {caption}
        </motion.p>
      )}

      <div className={gridClasses + " md:relative"}>
        {/* Mobile stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {images.map((img, index) => (
            <div key={index} className="w-full">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                className="w-full h-auto shadow-md object-cover"
              />
            </div>
          ))}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:contents">
          {images.map((img, index) => {
            const layout = imageLayouts[index];

            // Top floating image (animated)
            if (index === 2) {
              return (
                <motion.div
                  key={index}
                  className={layout.className}
                  style={{ ...layout.style, y: yTop }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover shadow-xl"
                  />
                </motion.div>
              );
            }

            // Lower image with subtle parallax
            if (
              (index === 1 && variant === "large-left") ||
              (index === 0 && variant === "large-right")
            ) {
              return (
                <motion.div
                  key={index}
                  className={layout.className}
                  style={{ ...layout.style, y: yBottom }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover shadow-lg"
                  />
                </motion.div>
              );
            }

            // Largest image (static)
            return (
              <motion.div
                key={index}
                className={layout.className}
                style={layout.style}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover shadow-lg"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TriImageCollage;

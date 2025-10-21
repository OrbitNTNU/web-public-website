'use client';
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SpecificationsProps {
  title: string;
  specifications: Record<string, string>;
  graphic: string;
  additionalGraphic?: string;
}

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Specifications = ({
  title,
  specifications,
  graphic,
  additionalGraphic,
}: SpecificationsProps) => {
  const sectionRef = useRef(null);
  const graphicRef = useRef(null);

  const inView = useInView(sectionRef, { once: true });

  // Parallax effect — track scroll relative to the graphic container, not the whole section
  const { scrollYProgress } = useScroll({
    target: graphicRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16"
    >
      <motion.h2
        className="tracking-tight mb-6 text-2xl md:text-3xl font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {title.toUpperCase()}
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-10">
        {/* Table */}
        <motion.div
          className="flex-1"
          variants={tableVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="divide-y divide-moonlight border border-moonlight overflow-hidden rounded-xl">
            {Object.entries(specifications).map(([label, value], i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between px-4 py-3"
                variants={rowVariants}
              >
                <span className="text-slate tracking-wide uppercase text-sm md:text-base">
                  {label}
                </span>
                <span className="text-cloud-white tracking-tight text-lg md:text-xl font-medium">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Graphic + Parallax */}
        <motion.div
          ref={graphicRef}
          className="relative flex items-center justify-center w-full lg:w-1/2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {additionalGraphic && (
            <motion.div
              style={{ y }}
              className="hidden md:block absolute -top-24 -right-20 z-10 drop-shadow-2xl"
            >
              <Image
                src={additionalGraphic}
                alt="Additional Specification Graphic"
                width={350}
                height={350}
                className="rounded-xl object-contain"
              />
            </motion.div>
          )}

          <Image
            src={graphic}
            alt="Specification Graphic"
            width={500}
            height={500}
            className="rounded-xl object-contain w-full h-auto relative z-0"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Specifications;

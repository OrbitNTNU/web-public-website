"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { sdgs } from "./SDGs";

const SDGsDesktopSmall = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Scroll controller
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xs = [
    useTransform(scrollYProgress, [0.2, 0.3], [0, -380]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, -250]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, -120]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 0]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 120]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 250]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 380]),
  ];

  const ys = [
    useTransform(scrollYProgress, [0.2, 0.3], [0, 60]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 30]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 10]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 0]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 10]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 30]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 60]),
  ];

  const rotates = [
    useTransform(scrollYProgress, [0.2, 0.3], [0, -12]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, -8]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, -4]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 0]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 4]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 8]),
    useTransform(scrollYProgress, [0.2, 0.3], [0, 12]),
  ];

  return (
    <section className="relative w-full px-4 md:px-12">
      <div className="flex flex-col justify-center items-center overflow-visible">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Sustainability is a central pillar of Orbit&apos;s mission.
        </motion.h2>

        <div
          ref={ref}
          className="relative w-full h-96 flex justify-center items-center"
        >
          {sdgs.map((sdg, idx) => (
            <motion.div
              className={`absolute w-42 h-42 rounded-xl overflow-hidden cursor-pointer transition-all duration-400 ${
                hoveredId === sdgs[idx].id
                  ? "scale-110 -translate-y-10 shadow-3xl"
                  : ""
              }`}
              style={{
                x: xs[idx],
                y: ys[idx],
                rotate: rotates[idx],
                zIndex:
                  hoveredId === sdgs[idx].id
                    ? 100
                    : 50 - Math.abs(idx - Math.floor(sdgs.length / 2)) * 10,
              }}
              onMouseEnter={() => {
                setHoveredId(sdgs[idx].id);
              }}
              onMouseLeave={() => setHoveredId(null)}
              key={sdg.id}
            >
              <Image
                src={sdgs[idx].image}
                alt={sdgs[idx].title}
                width={320}
                height={320}
                className={`w-full h-full object-cover rounded-xl transition-all duration-300 ${
                  hoveredId === sdgs[idx].id
                    ? "brightness-110"
                    : "brightness-90"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 max-w-2xl text-center px-4 h-[150px]"
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {hoveredId ? (
            <div>
              <h3 className="mb-4">
                {sdgs.find((sdg) => sdg.id === hoveredId)?.title}
              </h3>
              <p className="text-charcoal-light">
                {sdgs.find((sdg) => sdg.id === hoveredId)?.description}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <h3 className="material-icons">keyboard_arrow_up</h3>
              <p className="text-charcoal-light">
                Hover over an SDG to learn more about how Orbit NTNU contributes
                to achieving the Sustainable Development Goals.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SDGsDesktopSmall;

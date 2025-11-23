"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { sdgs } from "./SDGs";
import { useEffect, useRef, useState } from "react";

export default function SDGsCarousel() {
  const [displayedSdg, setDisplayedSdg] = useState(sdgs[0]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const heights = sdgs.map(s =>
      (() => {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.visibility = "hidden";
        div.style.width = "100%";
        div.innerHTML = `<h3>${s.title}</h3><p>${s.description}</p>`;
        document.body.appendChild(div);
        const h = div.offsetHeight;
        document.body.removeChild(div);
        return h;
      })()
    );
    setMaxHeight(Math.max(...heights));
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    let closest = children[0];
    let closestDistance = Infinity;

    children.forEach((child) => {
      const rect = child.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = child;
      }
    });

    const sdgId = closest.getAttribute("data-sdg-id");
    const newSdg = sdgs.find((s) => s.id.toString() === sdgId);
    if (newSdg) setDisplayedSdg(newSdg);
  };

  return (
    <section className="relative w-full px-4 py-12 md:px-12 max-w-[2000px] mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12"
      >
        {"Sustainability is a central pillar of Orbit's mission."}
      </motion.h2>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-scroll snap-x snap-mandatory gap-8 pb-8 no-scrollbar px-24"
      >
        {sdgs.map((sdg) => (
          <motion.div
            key={sdg.id}
            data-sdg-id={sdg.id}
            className="min-w-[100%] flex flex-col items-center snap-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image
              src={sdg.image}
              alt={sdg.title}
              width={200}
              height={200}
              className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-xl mb-4"
            />
          </motion.div>
        ))}
      </div>

      <div style={{ height: maxHeight }}>

        {displayedSdg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center px-4 absolute left-0 right-0"
          >
            <h3 className="mb-2">{displayedSdg.title}</h3>
            <p className="text-charcoal-light max-w-xl mx-auto">{displayedSdg.description}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

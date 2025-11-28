"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SmoothHeight({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useLayoutEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      animate={{ height }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

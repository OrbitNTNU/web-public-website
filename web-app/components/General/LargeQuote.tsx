"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

interface LargeQuotesProps {
  text: string;
  author: string;
}

export default function LargeQuote({ text, author }: LargeQuotesProps) {
  const ref = useRef(null);

  return (
    <div className="w-full mx-auto px-4 md:px-12 max-w-[2000px]">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "tween",
          stiffness: 200,
          delay: 0.2,
        }}
        className="text-3xl md:text-4xl lg:text-6xl text-center mx-auto"
      >
        {text}
      </motion.h2>
      <motion.p
        className="text-center mx-auto mt-4 text-charcoal-light"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "tween",
          stiffness: 200,
          delay: 0.4,
        }}
      >
        {author}
      </motion.p>
    </div>
  );
}

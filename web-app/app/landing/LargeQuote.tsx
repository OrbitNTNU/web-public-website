'use client';
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface LargeQuotesProps {
    text: string;
}

export default function LargeQuote({ text }: LargeQuotesProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <motion.h2
                ref={ref}
                initial={{ filter: "blur(16px)", opacity: 0 }}
                animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
                transition={{ duration: 1 }}
                className="text-3xl md:text-4xl lg:text-6xl font-light text-center max-w-7xl mx-auto font-merriweather italic"
            >
                {text}
            </motion.h2>
        </div>
    );
}
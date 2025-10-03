'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
        <nav className="
  fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 px-8 py-2 flex justify-between items-center
  backdrop-blur-xs rounded-xl
"
            >
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, type: "spring"}}
                className="font-bold text-lg tracking-wider text-white select-none"
            >
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="drop-shadow-[0_0_3px_rgba(0,0,0,1)]"
                />

            </motion.div>

            <motion.button
                onClick={() => setOpen((v) => !v)}
                initial={false}
                animate={{rotate: open ? 90 : 0}}
                transition={{type: "spring", stiffness: 300, damping: 20}}
                className="bg-none border-none outline-none cursor-pointer p-0 flex flex-col gap-1.5 z-[105]"
                aria-label="Toggle menu"
            >
                <motion.span
                    className="block w-7 h-0.5 bg-cloud-white rounded"
                    animate={{
                        rotate: open ? 45 : 0,
                        y: open ? 8 : 0,
                    }}
                />
                <motion.span
                    className="block w-5 h-0.5 bg-cloud-white rounded"
                    animate={{
                        opacity: open ? 0 : 1,
                    }}
                />
                <motion.span
                    className="block w-7 h-0.5 bg-cloud-white rounded"
                    animate={{
                        rotate: open ? -45 : 0,
                        y: open ? -8 : 0,
                    }}
                />
            </motion.button>
        </nav>
    <AnimatePresence>
        {open && (
            <motion.div
                key="menu"
                initial={{opacity: 0, scale: 0.98, y: -20}}
                animate={{opacity: 1, scale: 1, y: 0}}
                exit={{opacity: 0, scale: 0.98, y: -20}}
                transition={{duration: 0.35, type: "spring"}}
                className="fixed top-0 left-0 w-screen h-screen bg-[rgba(10,10,10,0.96)] flex flex-col items-center justify-center gap-10 z-[100]"
            >
                {navItems.map((item, i) => (
                    <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -50}}
                        transition={{
                            delay: 0.1 + i * 0.08,
                            type: "spring",
                            stiffness: 200,
                        }}
                        whileHover={{
                            scale: 1.08,
                            color: "var(--color-berry-blast)",
                        }}
                        className="text-cloud-white text-4xl font-medium no-underline uppercase tracking-wider bg-none border-none outline-none cursor-pointer transition-colors duration-200"
                    >
                        {item.label}
                    </motion.a>
                ))}
            </motion.div>
        )}
    </AnimatePresence>
            </>
    );
}

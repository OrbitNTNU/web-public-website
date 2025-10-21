'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Team", href: "/team" },
    { label: "About", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Projects", href: "/projects" },
    { label: "Sponsors", href: "/sponsors" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const navigate = (path: string) => {
        setOpen(false);
        router.push(path);
    };

    return (
        <nav className="fixed top-0 left-0 w-screen z-50 px-4 md:px-8 py-4 flex justify-between items-center pb-8"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="font-bold text-lg tracking-wider text-white select-none cursor-pointer"
                onClick={() => navigate("/")}
            >
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </motion.div>

            {/* Menu toggle (crisp) */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                initial={false}
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-[101] cursor-pointer p-0 flex flex-col gap-1.5"
                aria-label="Toggle menu"
            >
                <motion.span
                    className="block w-7 h-0.5 bg-cloud-white rounded"
                    animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
                />
                <motion.span
                    className="block w-5 h-0.5 bg-cloud-white rounded"
                    animate={{ opacity: open ? 0 : 1 }}
                />
                <motion.span
                    className="block w-7 h-0.5 bg-cloud-white rounded"
                    animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
                />
            </motion.button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, scale: 0.98, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -20 }}
                        transition={{ duration: 0.35, type: "spring" }}
                        className="fixed top-0 left-0 w-screen h-screen bg-charcoal/90 backdrop-blur-md
                       flex flex-col items-center justify-center gap-10 z-[100]"
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={() => navigate(item.href)}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{
                                    type: "tween",
                                    stiffness: 200,
                                    delay: i * 0.1 + 0.2,
                                }}
                                className="text-cloud-white hover:scale-105 duration-200 text-4xl
                           font-medium no-underline uppercase tracking-wider transition-transform"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useNavbar } from "./NavbarContext";
import Link from "next/link";
import NavbarItem from "./NavbarItem";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Join Us", href: "/join" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoClicked, setLogoClicked] = useState<number>(0);
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null);
  const [animateLogoFall, setAnimateLogoFall] = useState(false);
  const [isLogoHidden, setIsLogoHidden] = useState(false);

  const detailRef = useRef<HTMLDivElement>(null);
  const [detailWidth, setDetailWidth] = useState(0);

  const { info } = useNavbar();
  const baseHref = info?.baseHref || "/";
  const detailedLocation = info?.detailedLocation || "";

  useLayoutEffect(() => {
    if (detailRef.current) {
      setDetailWidth(detailRef.current.offsetWidth + 16); // +16 for gap/margin
    } else {
      setDetailWidth(0);
    }
  }, [detailedLocation]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fell = localStorage.getItem("logoFell") === "true";
      setIsLogoHidden(fell);
    }
  }, []);

  // Measure the width of the detailed item when shown
  useLayoutEffect(() => {
    if (detailRef.current) {
      setDetailWidth(detailRef.current.offsetWidth + 16); // +16 for gap/margin
    } else {
      setDetailWidth(0);
    }
  }, [detailedLocation]);

  const router = useRouter();

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const pathname = usePathname();

  const handleLogoFall = () => {
    localStorage.setItem("logoFell", "true");
    setAnimateLogoFall(true);
  };

  const handleClick = () => {
    setLogoClicked((prev) => prev + 1);

    if (logoClicked === 25) {
      handleLogoFall();
    }

    if (resetTimer) clearTimeout(resetTimer);

    const newTimer = setTimeout(() => {
      setLogoClicked(0);
    }, 1500);

    setResetTimer(newTimer);
  };

  return (
    <nav className="fixed top-0 left-0 w-screen z-50 py-4 px-4 md:px-8 flex justify-between items-center pb-8">
      <div
        className="absolute inset-0 w-full h-[150px] pointer-events-none z-[-1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={
          animateLogoFall
            ? {
              y: 800, // falls off screen
              rotate: 720, // spins as it falls
              opacity: 0,
            }
            : {
              opacity: 1,
              y: 0,
              rotate:
                logoClicked > 10
                  ? Math.sin(logoClicked / 2) * Math.min(logoClicked / 2, 20)
                  : 0,
              x:
                logoClicked > 10
                  ? Math.sin(logoClicked * 4) * Math.min(logoClicked / 2, 15)
                  : 0,
            }
        }
        transition={{
          duration: animateLogoFall ? 1.8 : 0.2,
          type: animateLogoFall ? "tween" : "spring",
          ease: animateLogoFall ? "easeIn" : undefined,
          stiffness: 200,
          damping: 10,
        }}
        onClick={() => (pathname !== "/" ? navigate("/") : handleClick())}
        className="cursor-pointer select-none z-10"
      >
        {!isLogoHidden && (
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        )}
      </motion.div>

      <motion.div>
        <div className="hidden md:flex gap-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const isBaseWithDetail = Boolean(detailedLocation && baseHref === item.href);
            const activeIndex = navItems.findIndex(
              (nav) => nav.href === baseHref,
            );

            return (
              <NavbarItem
                key={item.label}
                item={item}
                index={index}
                activeIndex={activeIndex}
                detailedLocation={detailedLocation}
                isBaseWithDetail={isBaseWithDetail}
                isActive={isActive}
                mounted={mounted}
                detailWidth={detailWidth}
                detailRef={detailRef}
              />
            );
          })}
        </div>
      </motion.div>
      {/* Menu toggle (crisp) */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={false}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex md:hidden relative z-[101] cursor-pointer p-0  flex-col gap-1.5"
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

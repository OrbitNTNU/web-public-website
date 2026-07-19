"use client";
import { useEffect, useMemo, useRef, useState } from "react";

async function getMembers() {
  try {
    const res = await fetch("/api/members");
    if (!res.ok) throw new Error("Failed to fetch members");
    const json = await res.json();
    return json.totalMembers || 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

/**
 * Starfield overlay. One star per Orbit member, positioned randomly
 * and rendered once — no re-renders on scroll. Scroll parallax is
 * driven imperatively on a single wrapper transform so the GPU does
 * the heavy lifting and React never sees the scroll events.
 *
 * PARALLAX_STRENGTH < 1 means the stars drift slower than the page,
 * giving a subtle depth cue without pulling focus. The handler runs
 * passive and coalesces writes into a single rAF tick.
 */
const PARALLAX_STRENGTH = 0.28;

export default function StarBackground() {
  const [memberCount, setMemberCount] = useState(0);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const total = await getMembers();
      setMemberCount(total);
    })();
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: memberCount }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      const topPercent = Math.random() * 100;
      const opacity = Math.max(1 - topPercent / 100, 0.6);

      return {
        id: i,
        size,
        top: `${topPercent}%`,
        left: `${Math.random() * 100}%`,
        opacity: opacity,
      };
    });
  }, [memberCount]);

  useEffect(() => {
    if (memberCount === 0) return;
    if (typeof window === "undefined") return;

    const layer = layerRef.current;
    if (!layer) return;

    // Respect the user's reduced-motion preference — skip parallax
    // entirely for those users to avoid any scroll-linked animation.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let rafId: number | null = null;
    let latestY = window.scrollY || window.pageYOffset || 0;

    // Seed the initial transform so the stars start in the right
    // position (important when the user lands on a page mid-scroll).
    layer.style.transform = `translate3d(0, ${latestY * PARALLAX_STRENGTH}px, 0)`;

    const write = () => {
      rafId = null;
      layer.style.transform = `translate3d(0, ${latestY * PARALLAX_STRENGTH}px, 0)`;
    };

    const onScroll = () => {
      latestY = window.scrollY || window.pageYOffset || 0;
      if (rafId == null) {
        rafId = window.requestAnimationFrame(write);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [memberCount]);

  if (memberCount === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none max-w-screen h-full overflow-hidden">
      <div
        ref={layerRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {stars.map(
          (star) =>
            star && (
              <div
                key={star.id}
                className="bg-cloud-white rounded-full absolute"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: star.top,
                  left: star.left,
                  opacity: star.opacity,
                }}
              />
            ),
        )}
      </div>
    </div>
  );
}

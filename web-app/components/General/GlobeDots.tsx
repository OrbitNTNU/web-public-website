"use client";

import { useRef, useEffect, useCallback } from "react";
import globePoints from "@/public/globe-points.json";
import { satellites } from "../LandingPage/Hero";

type Point = {
  x: number;
  y: number;
  z: number;
};

const points = globePoints as Point[];

/* ---------- coordinates ---------- */

const TRONDHEIM = {
  lat: 63.4305,
  lon: 10.3951,
};

function latLonToXYZ(lat: number, lon: number) {
  const latRad = (-lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;

  return {
    x: Math.cos(latRad) * Math.cos(lonRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.sin(lonRad),
  };
}

const trondheim = latLonToXYZ(TRONDHEIM.lat + 11, TRONDHEIM.lon - 48);

/* ---------- component ---------- */

export default function GlobeDots({ speed = 0.25 }: { speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const stateRef = useRef({
    rotationX: 0,
    rotationY: 0,
    lastTime: 0,
    paused: false,
  });

  const drawFrame = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const scale = 4; 
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);

      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;

      const s = stateRef.current;
      if (!s.lastTime) s.lastTime = time;
      const dt = (time - s.lastTime) / 1000;
      s.lastTime = time;

      if (!s.paused) {
        s.rotationY += speed * dt;
      }

      const cosY = Math.cos(s.rotationY);
      const sinY = Math.sin(s.rotationY);
      const cosX = Math.cos(s.rotationX);
      const sinX = Math.sin(s.rotationX);

      /* ---------- globe points ---------- */

      for (const p of points) {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const perspective = 1.6 / (1.6 + z2);
        const sx = cx + x1 * radius * perspective;
        const sy = cy + y1 * radius * perspective;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.7, perspective * 0.25)})`;
        ctx.arc(sx, sy, Math.max(0.4, perspective * 1.2), 0, Math.PI * 2);
        ctx.fill();
      }

      /* ---------- trondheim ---------- */

      const blink = 0.3 + 0.7 * Math.sin(time * 0.006);

      const xt = trondheim.x * cosY - trondheim.z * sinY;
      const zt = trondheim.x * sinY + trondheim.z * cosY;
      const yt = trondheim.y * cosX - zt * sinX;
      const zt2 = trondheim.y * sinX + zt * cosX;

      if (zt2 > -0.15) {
        const p = 1.6 / (1.6 + zt2);
        const sx = cx + xt * radius * p;
        const sy = cy + yt * radius * p;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${blink})`;
        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ---------- satellites ---------- */

      const t = time * 0.001;

      for (const sat of satellites) {
        const a = t * sat.speed + sat.phase;

        const x = Math.cos(a) * sat.radius;
        const z = Math.sin(a) * sat.radius;
        const y = 0.15 * Math.sin(a * 0.7);

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const p = 1.6 / (1.6 + z2);
        const sx = cx + x1 * radius * p;
        const sy = cy + y1 * radius * p;

        const r = 2.5 * p + 1;
        const root = document.documentElement;

        const color = getComputedStyle(root)
          .getPropertyValue(sat.color.replace("var(", "").replace(")", ""))
          .trim();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    },
    [speed],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.paused = !entry.isIntersecting;
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);
    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [drawFrame]);

  return (
    <div
      className="
      w-full min-h-screen bg-charcoal
      flex
      justify-center items-center
      lg:justify-end lg:items-center
      overflow-hidden
    "
    >
      <canvas
        ref={canvasRef}
        className="
        w-[250%]
        md:w-full
        h-full
        block
      "
      />
    </div>
  );
}

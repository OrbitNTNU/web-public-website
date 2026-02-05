import { useRef, useEffect, useCallback } from "react";
import globePoints from "@/public/globe-points.json";
import { satellites } from "../LandingPage/Hero";

type Point = { x: number; y: number; z: number };

const POINTS = globePoints as Point[];

const TRONDHEIM = { lat: 63.4305, lon: 10.3951 };
const PERSPECTIVE = 1.8;

function latLonToXYZ(lat: number, lon: number) {
  const latRad = (-lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  return {
    x: Math.cos(latRad) * Math.cos(lonRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.sin(lonRad),
  };
}

const trondheim = latLonToXYZ(TRONDHEIM.lat, TRONDHEIM.lon);

const packedPoints = new Float32Array(POINTS.length * 3);
for (let i = 0; i < POINTS.length; i++) {
  packedPoints[i * 3] = POINTS[i].x;
  packedPoints[i * 3 + 1] = POINTS[i].y;
  packedPoints[i * 3 + 2] = POINTS[i].z;
}

export default function GlobeDots({ speed = 0.25 }: { speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const stateRef = useRef({
    rotationX: 0,
    rotationY: 0,
    lastTime: 0,
    paused: false,
    cx: 0,
    cy: 0,
    radius: 0,
    dpr: 1,
  });

  const satelliteColorsRef = useRef<string[]>([]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const s = stateRef.current;
    s.cx = w / 2;
    s.cy = h / 2;
    s.radius = Math.min(w, h) * 0.38;
    s.dpr = dpr;
  }, []);

  const drawFrame = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const s = stateRef.current;

      if (!s.lastTime) s.lastTime = time;
      const dt = Math.min((time - s.lastTime) / 1000, 0.05);
      s.lastTime = time;

      if (!s.paused) {
        s.rotationY += speed * dt;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cosY = Math.cos(s.rotationY);
      const sinY = Math.sin(s.rotationY);
      const cosX = Math.cos(s.rotationX);
      const sinX = Math.sin(s.rotationX);

      ctx.beginPath();

      /* ---------- globe points ---------- */

      for (let i = 0; i < packedPoints.length; i += 3) {
        const x = packedPoints[i];
        const y = packedPoints[i + 1];
        const z = packedPoints[i + 2];

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const p = PERSPECTIVE / (PERSPECTIVE + z2);
        const sx = s.cx + x1 * s.radius * p;
        const sy = s.cy + y1 * s.radius * p;

        ctx.moveTo(sx + 1, sy);
        ctx.arc(sx, sy, Math.max(0.4, p * 1.2), 0, Math.PI * 2);
      }

      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();

      /* ---------- trondheim ---------- */

      const blink = 0.3 + 0.7 * Math.sin(time * 0.006);

      const xt = trondheim.x * cosY - trondheim.z * sinY;
      const zt = trondheim.x * sinY + trondheim.z * cosY;
      const yt = trondheim.y * cosX - zt * sinX;
      const zt2 = trondheim.y * sinX + zt * cosX;

      const p = PERSPECTIVE / (PERSPECTIVE + zt2);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${blink})`;
      ctx.arc(
        s.cx + xt * s.radius * p,
        s.cy + yt * s.radius * p,
        4.5,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      /* ---------- satellites ---------- */

      const t = time * 0.001;

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        const a = t * sat.speed + sat.phase;

        const x = Math.cos(a) * sat.radius;
        const z = Math.sin(a) * sat.radius;
        const y = 0.15 * Math.sin(a * 0.7);

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const p = PERSPECTIVE / (PERSPECTIVE + z2);

        ctx.beginPath();
        ctx.fillStyle = satelliteColorsRef.current[i];
        ctx.arc(
          s.cx + x1 * s.radius * p,
          s.cy + y1 * s.radius * p,
          2.5 * p + 1,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    },
    [speed],
  );

  /* ---------- setup ---------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const root = document.documentElement;
    satelliteColorsRef.current = satellites.map((sat) =>
      getComputedStyle(root)
        .getPropertyValue(sat.color.replace("var(", "").replace(")", ""))
        .trim(),
    );

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => (stateRef.current.paused = !e.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(canvas);

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [drawFrame, resize]);

  return (
    <div
      className="
      w-full h-screen bg-charcoal
      flex
      justify-center items-center
      lg:justify-end lg:items-center
      overflow-hidden
    "
    >
      <canvas
        ref={canvasRef}
        className="
        absolute inset-0 
        w-full
        h-full
        block
        pointer-events-none
        contain-strict
        will-change-transform
      "

        style={{
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </div>
  );
}

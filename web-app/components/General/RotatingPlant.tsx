"use client";

import { memo, useCallback, useEffect, useRef } from "react";

/**
 * Inline version of the PlantDots canvas — generates a succulent-like
 * point cloud and slowly rotates it. Fits any layout box.
 *
 * Performance:
 *  - Point cloud is generated once at module load (module-scoped
 *    Float32Array).
 *  - An IntersectionObserver pauses the requestAnimationFrame loop
 *    when the canvas is not visible, so the plant costs nothing
 *    while the user is on another snap section.
 *  - Wrapped in React.memo — it only re-mounts if its own props change.
 */

const PERSPECTIVE = 5;

type P = { x: number; y: number; z: number };

function generateSucculent(): Float32Array {
    const points: P[] = [];

    const layers = 6;
    const leavesPerLayer = [6, 8, 10, 12, 14, 16];

    for (let layer = 0; layer < layers; layer++) {
        const radius = 0.25 + layer * 0.18;
        const height = layer * 0.08;
        const leafCount = leavesPerLayer[layer];

        for (let i = 0; i < leafCount; i++) {
            const baseAngle = (i / leafCount) * Math.PI * 2;

            const uSeg = 16;
            const vSeg = 6;

            for (let u = 0; u <= uSeg; u++) {
                const fu = u / uSeg;

                for (let v = 0; v <= vSeg; v++) {
                    const fv = v / vSeg;

                    const leafLength = 0.55 - layer * 0.04;
                    const leafWidth = 0.18 - layer * 0.01;
                    const thickness = 0.06;

                    const curve = Math.sin(fu * Math.PI);

                    const localX = (fv - 0.5) * leafWidth * curve;
                    const localY = fu * leafLength;
                    const localZ =
                        Math.sin((fv - 0.5) * Math.PI) * thickness * curve;

                    const tilt = -0.8 + layer * 0.15;

                    const yTilt =
                        localY * Math.cos(tilt) - localZ * Math.sin(tilt);
                    const zTilt =
                        localY * Math.sin(tilt) + localZ * Math.cos(tilt);

                    const xRot =
                        localX * Math.cos(baseAngle) -
                        zTilt * Math.sin(baseAngle);
                    const zRot =
                        localX * Math.sin(baseAngle) +
                        zTilt * Math.cos(baseAngle);

                    points.push({
                        x: xRot + Math.cos(baseAngle) * radius,
                        y: yTilt + height - 0.6,
                        z: zRot + Math.sin(baseAngle) * radius,
                    });
                }
            }
        }
    }

    const packed = new Float32Array(points.length * 3);
    for (let i = 0; i < points.length; i++) {
        packed[i * 3] = points[i].x;
        packed[i * 3 + 1] = points[i].y;
        packed[i * 3 + 2] = points[i].z;
    }

    return packed;
}

const packedPoints = generateSucculent();

type Props = {
    speed?: number;
    color?: string;
    className?: string;
};

function RotatingPlantInner({
    speed = 0.35,
    color = "#3fca3f",
    className = "",
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const colorRef = useRef(color);
    // Start paused — the IntersectionObserver below flips us on the
    // first time the canvas enters the viewport. This avoids running
    // a full-screen canvas loop on mount when the hero is on screen.
    const visibleRef = useRef(false);

    const state = useRef({
        rotY: 0,
        rotX: -0.4,
        last: 0,
        cx: 0,
        cy: 0,
        scale: 0,
    });

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Cap the backing store at 1.5x CSS pixels. On a 2-3x DPR
        // display a native backing store is 4-9x the rasterization
        // cost for basically no perceivable quality gain on a
        // point-cloud canvas.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        canvas.width = Math.max(1, w * dpr);
        canvas.height = Math.max(1, h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        state.current.cx = w / 2;
        state.current.cy = h / 2;
        state.current.scale = Math.min(w, h) * 0.34;
    }, []);

    const draw = useCallback(
        (t: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const s = state.current;

            if (!s.last) s.last = t;
            const dt = Math.min((t - s.last) / 1000, 0.05);
            s.last = t;

            s.rotY += speed * dt;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cosY = Math.cos(s.rotY);
            const sinY = Math.sin(s.rotY);
            const cosX = Math.cos(s.rotX);
            const sinX = Math.sin(s.rotX);

            ctx.beginPath();

            for (let i = 0; i < packedPoints.length; i += 3) {
                const x = packedPoints[i];
                const y = packedPoints[i + 1];
                const z = packedPoints[i + 2];

                const x1 = x * cosY - z * sinY;
                const z1 = x * sinY + z * cosY;

                const y1 = y * cosX - z1 * sinX;
                const z2 = y * sinX + z1 * cosX;

                const p = PERSPECTIVE / (PERSPECTIVE + z2);

                const sx = s.cx + x1 * s.scale * p;
                const sy = s.cy - y1 * s.scale * p;

                ctx.moveTo(sx + 1, sy);
                ctx.arc(sx, sy, Math.max(0.8, 1.5 * p), 0, Math.PI * 2);
            }

            ctx.fillStyle = colorRef.current;
            ctx.fill();

            if (visibleRef.current) {
                rafRef.current = requestAnimationFrame(draw);
            } else {
                rafRef.current = null;
            }
        },
        [speed]
    );

    useEffect(() => {
        const root = document.documentElement;
        const resolved =
            getComputedStyle(root)
                .getPropertyValue("--color-biosat-green")
                .trim() || color;
        colorRef.current = resolved;

        resize();
        window.addEventListener("resize", resize);

        // Visibility-gated RAF loop
        const canvas = canvasRef.current;
        let observer: IntersectionObserver | null = null;
        if (canvas && "IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    const becameVisible = entry.isIntersecting;
                    visibleRef.current = becameVisible;
                    if (becameVisible && rafRef.current == null) {
                        state.current.last = 0;
                        rafRef.current = requestAnimationFrame(draw);
                    }
                },
                { threshold: 0.05 }
            );
            observer.observe(canvas);
        } else {
            // Legacy fallback — no IO means we can't gate the loop.
            visibleRef.current = true;
            rafRef.current = requestAnimationFrame(draw);
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            observer?.disconnect();
        };
    }, [draw, resize, color]);

    return (
        <canvas
            ref={canvasRef}
            className={`block w-full h-full ${className}`}
            aria-hidden
        />
    );
}

const RotatingPlant = memo(RotatingPlantInner);
RotatingPlant.displayName = "RotatingPlant";

export default RotatingPlant;

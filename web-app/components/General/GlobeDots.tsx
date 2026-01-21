"use client";

import React, { useRef, useEffect, useCallback } from "react";
import globePoints from "@/public/globe-points.json";

type GlobePoint = {
    x: number;
    y: number;
    z: number;
};

interface GlobeDotsProps {
    speed?: number;
}

const points = globePoints as GlobePoint[];

export default function GlobeDots({ speed = 0.25 }: GlobeDotsProps) {
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

            const dpr = Math.max(1, window.devicePixelRatio || 1);
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;

            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            ctx.clearRect(0, 0, w, h);

            const cx = w / 2;
            const cy = h / 2;
            const radius = Math.min(w, h) * 0.38;

            const s = stateRef.current;
            if (!s.lastTime) s.lastTime = time;
            const dt = (time - s.lastTime) / 1000;
            s.lastTime = time;

            if (!s.paused) {
                s.rotationY += speed * dt;
                s.rotationX += speed * dt * 0.15;
            }

            const cosY = Math.cos(s.rotationY);
            const sinY = Math.sin(s.rotationY);
            const cosX = Math.cos(s.rotationX);
            const sinX = Math.sin(s.rotationX);

            for (let i = 0; i < points.length; i++) {
                const p = points[i];

                const x1 = p.x * cosY - p.z * sinY;
                const z1 = p.x * sinY + p.z * cosY;
                const y1 = p.y * cosX - z1 * sinX;
                const z2 = p.y * sinX + z1 * cosX;

                const fov = 1.6;
                const perspective = fov / (fov + z2);

                const sx = cx + x1 * radius * perspective;
                const sy = cy + y1 * radius * perspective;

                const size = Math.max(0.25, perspective);
                const alpha = Math.min(1, perspective * 0.25);

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.arc(sx, sy, size, 0, Math.PI * 2);
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
        <div className="w-full h-full bg-black">
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}

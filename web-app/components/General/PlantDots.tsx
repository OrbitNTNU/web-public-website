"use client";

import { useRef, useEffect, useCallback } from "react";
import RemoveBeforeLaunch from "@/components/General/Textboxes/RemoveBeforeLaunch";

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
                        Math.sin((fv - 0.5) * Math.PI) *
                        thickness *
                        curve;

                    const tilt = -0.8 + layer * 0.15;

                    const yTilt = localY * Math.cos(tilt) - localZ * Math.sin(tilt);
                    const zTilt = localY * Math.sin(tilt) + localZ * Math.cos(tilt);

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

export default function PlantDots({ speed = 0.6 }: { speed?: number }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const colorRef = useRef("#3fca3f");

    const state = useRef({
        rotY: 0,
        rotX: -0.4, // slight forward tilt
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

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        state.current.cx = w / 2;
        state.current.cy = h / 2;
        state.current.scale = Math.min(w, h) * 0.32; // slightly smaller
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
                ctx.arc(sx, sy, Math.max(0.9, 1.6 * p), 0, Math.PI * 2);
            }

            ctx.fillStyle = colorRef.current;
            ctx.fill();

            rafRef.current = requestAnimationFrame(draw);
        },
        [speed]
    );

    useEffect(() => {
        const root = document.documentElement;
        colorRef.current =
            getComputedStyle(root)
                .getPropertyValue("--color-biosat-green")
                .trim() || "#3fca3f";

        resize();
        rafRef.current = requestAnimationFrame(draw);
        window.addEventListener("resize", resize);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [draw, resize]);

    return (
        <div className="w-full h-screen flex items-center px-10">
            <div className="w-1/2 pr-16 text-white">
                <RemoveBeforeLaunch></RemoveBeforeLaunch>
            </div>

            <div className="w-1/2 h-full flex justify-center items-center pointer-events-none">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

        </div>
    );
}
'use client';

import React, { useRef, useEffect, useState } from "react";

// Utility to get random integer between min and max (inclusive)
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// CubeSat dimensions (in "units")
const UNIT_SIZE = 60; // px per 1U
const ANIMATION_SPEED = 300; // ms per line
const FLYAWAY_SPEED = 1200; // ms for flyaway

// Color
const CLOUD_WHITE = "#F8F9FA";

// CubeSat line definitions for 1U, 2U, 3U
const getCubeSatLines = (units: number) => {
    const w = UNIT_SIZE;
    const h = units * UNIT_SIZE;
    // 3D box points
    const front = [
        { x: 40, y: 40 },
        { x: 40 + w, y: 40 },
        { x: 40 + w, y: 40 + h },
        { x: 40, y: 40 + h },
    ];
    const depth = 30;
    const back = front.map((p) => ({ x: p.x + depth, y: p.y - depth }));

    // Lines: front face, back face, connecting edges
    return [
        // Front face
        [front[0], front[1]],
        [front[1], front[2]],
        [front[2], front[3]],
        [front[3], front[0]],
        // Back face
        [back[0], back[1]],
        [back[1], back[2]],
        [back[2], back[3]],
        [back[3], back[0]],
        // Connectors
        [front[0], back[0]],
        [front[1], back[1]],
        [front[2], back[2]],
        [front[3], back[3]],
    ];
};

const CubeSatAnimation: React.FC = () => {
    const [units, setUnits] = useState(getRandomInt(1, 3));
    const [drawnLines, setDrawnLines] = useState(0);
    const [flyaway, setFlyaway] = useState(false);

    // Animate line drawing
    useEffect(() => {
        if (drawnLines < 12 && !flyaway) {
            const timer = setTimeout(() => setDrawnLines(drawnLines + 1), ANIMATION_SPEED);
            return () => clearTimeout(timer);
        } else if (drawnLines === 12 && !flyaway) {
            // Pause, then fly away
            const timer = setTimeout(() => setFlyaway(true), 500);
            return () => clearTimeout(timer);
        } else if (flyaway) {
            // After flyaway, reset
            const timer = setTimeout(() => {
                setUnits(getRandomInt(1, 3));
                setDrawnLines(0);
                setFlyaway(false);
            }, FLYAWAY_SPEED);
            return () => clearTimeout(timer);
        }
    }, [drawnLines, flyaway]);

    const lines = getCubeSatLines(units);

    // Flyaway transform
    const flyawayTransform = flyaway
        ? "translate(300px, -120px) scale(0.5) rotateZ(30deg)"
        : "none";

    return (
        <div style={{ width: 220, height: 220, background: "transparent", position: "relative" }}>
            <svg
                width={220}
                height={220}
                style={{
                    overflow: "visible",
                    transition: `transform ${FLYAWAY_SPEED}ms cubic-bezier(.6,-0.28,.74,.05)`,
                    transform: flyawayTransform,
                }}
            >
                {lines.slice(0, drawnLines).map(([p1, p2], idx) => (
                    <line
                        key={idx}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={CLOUD_WHITE}
                        strokeWidth={3}
                        strokeLinecap="round"
                        style={{
                            opacity: 1,
                            transition: "opacity 0.2s",
                            filter: "drop-shadow(0 0 4px #fff)",
                        }}
                    />
                ))}
            </svg>
            {/* Optional: label for units */}
            <div
                style={{
                    position: "absolute",
                    left: 10,
                    top: 10,
                    color: CLOUD_WHITE,
                    fontWeight: 600,
                    fontSize: 18,
                    textShadow: "0 0 8px #fff",
                    pointerEvents: "none",
                    opacity: drawnLines === 12 && !flyaway ? 1 : 0,
                    transition: "opacity 0.3s",
                }}
            >
                {units}U CubeSat
            </div>
        </div>
    );
};

export default CubeSatAnimation;
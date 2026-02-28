import fs from "fs";

type Point = { x: number; y: number; z: number };

// ── geometry helpers ──────────────────────────────────────────────────────────

/** Signed distance to a line-segment (2-D in the XY plane, z independent) */
function distToSeg2D(
    px: number, py: number,
    ax: number, ay: number,
    bx: number, by: number
): number {
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - ax, py - ay);
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Axis-aligned (before tilt) ellipsoid test */
function inEllipsoid(
    px: number, py: number, pz: number,
    cx: number, cy: number, cz: number,
    rx: number, ry: number, rz: number,
    /** tilt around Z axis */ tiltZ: number
): boolean {
    const dx = px - cx, dy = py - cy, dz = pz - cz;
    const c = Math.cos(tiltZ), s = Math.sin(tiltZ);
    const lx = dx * c + dy * s;   // rotate point into ellipsoid frame
    const ly = -dx * s + dy * c;
    return (lx * lx) / (rx * rx) + (ly * ly) / (ry * ry) + (dz * dz) / (rz * rz) < 1;
}

// ── plant volume ──────────────────────────────────────────────────────────────
// Coordinate system: X = right, Y = up, Z = toward viewer
// Plant spans roughly Y ∈ [-1, +0.55], X ∈ [-0.75, +0.75]

function isPlantVolume(x: number, y: number, z: number): boolean {
    const thickness = 0.07;   // stem / branch radius

    // 1. Main vertical stem: bottom → fork point
    const inMainStem =
        distToSeg2D(x, y, 0, -1.0, 0, -0.45) < thickness &&
        Math.abs(z) < thickness;

    // 2. Left branch: fork → left-leaf base
    const inLeftBranch =
        distToSeg2D(x, y, 0, -0.45, -0.38, -0.05) < thickness * 0.85 &&
        Math.abs(z) < thickness * 0.85;

    // 3. Right branch: fork → right-leaf base
    const inRightBranch =
        distToSeg2D(x, y, 0, -0.45, 0.38, -0.05) < thickness * 0.85 &&
        Math.abs(z) < thickness * 0.85;

    // 4. Left leaf: wide rounded ellipsoid, tilted ~35° counter-clockwise
    //    centre to the upper-left, matching the emoji
    const leftLeaf = inEllipsoid(
        x, y, z,
        -0.38, 0.18, 0,   // centre
        0.40, 0.28, 0.16, // radii (wide, tall, thin)
        Math.PI / 5       // tilt: top leans left
    );

    // 5. Right leaf: mirror of left
    const rightLeaf = inEllipsoid(
        x, y, z,
        0.38, 0.18, 0,
        0.40, 0.28, 0.16,
        -Math.PI / 5
    );

    return inMainStem || inLeftBranch || inRightBranch || leftLeaf || rightLeaf;
}

// ── point sampling ────────────────────────────────────────────────────────────
// Fibonacci sphere gives evenly spaced surface points on the unit sphere.
// We keep only those that fall inside the plant volume.

function generatePoints(total: number): Point[] {
    const pts: Point[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < total; i++) {
        const y = 1 - (i / (total - 1)) * 2;         // y ∈ [-1, 1]
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = phi * i;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        if (isPlantVolume(x, y, z)) {
            pts.push({ x, y, z });
        }
    }

    return pts;
}


const SAMPLE_COUNT = 2000;
const points = generatePoints(SAMPLE_COUNT);

console.log(`Generated ${points.length} plant points from ${SAMPLE_COUNT} samples`);

fs.writeFileSync(
    "web-app/public/plant-points.json",
    JSON.stringify(points)
);
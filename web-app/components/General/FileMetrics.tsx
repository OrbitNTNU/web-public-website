import React, { useMemo } from "react";

type TreeNode = {
    label: string;
    children?: TreeNode[];
};

type PositionedNode = {
    id: string;
    node: TreeNode;
    x: number;
    y: number;
    depth: number;
    children?: PositionedNode[];
};

type Edge = {
    id: string;
    fromId: string;
    toId: string;
    d: string;
    length: number;
};

type Timeline = {
    edgeDelay?: number;
    dotDelay: number;
    textDelay: number;
    doneAt: number;
};

const tree: TreeNode = {
    label: "Satellite",
    children: [
        { label: "Status", children: [{ label: "Deorbited" }] },
        { label: "Weight", children: [{ label: "1.8 kg" }] },
        { label: "Size", children: [{ label: "10 × 10 × 20 cm" }] },
        { label: "Orbit", children: [{ label: "SSO – 540 km" }] },
        { label: "Cameras", children: [{ label: "4" }] },
        { label: "Power", children: [{ label: "1.2 W" }] },
        {
            label: "Radio",
            children: [
                { label: "Band: UHF" },
                { label: "Frequency: 437.5 MHz ± Doppler" },
                { label: "Modulation: 2-FSK" },
                { label: "Baudrate: 9600" },
            ],
        },
        { label: "Telemetry", children: [{ label: "AX.25 (G3RUH)" }] },
        { label: "Launch vehicle", children: [{ label: "SpaceX Falcon 9" }] },
    ],
};

/* Tuning knobs */

const ROW_H = 18;
const INDENT = 70;
const START_X = 10;
const START_Y = 40;

const TEXT_GAP = 16;
const FONT_SIZE = 12;
const CHAR_W = 10;

const DOT_R = 1;
const STROKE_W = 2;

const EDGE_DUR = 0.55;
const DOT_DUR = 0.18;
const TEXT_DUR = 0.45;
const GAP = 0.08;

/* Layout */

function layoutTree(node: TreeNode, id: string, depth: number, yRef: { y: number }): PositionedNode {
    const y = yRef.y;
    yRef.y += ROW_H;

    const positioned: PositionedNode = {
        id,
        node,
        depth,
        x: START_X + depth * INDENT,
        y,
    };

    if (node.children?.length) {
        positioned.children = node.children.map((child, i) =>
            layoutTree(child, `${id}.${i}`, depth + 1, yRef)
        );
    }

    return positioned;
}

function collectNodes(root: PositionedNode): PositionedNode[] {
    const out: PositionedNode[] = [];
    const walk = (n: PositionedNode) => {
        out.push(n);
        n.children?.forEach(walk);
    };
    walk(root);
    return out;
}

function collectEdges(root: PositionedNode): Edge[] {
    const edges: Edge[] = [];
    const walk = (parent: PositionedNode) => {
        parent.children?.forEach((child) => {
            const x1 = parent.x;
            const y1 = parent.y;
            const x2 = child.x;
            const y2 = child.y;

            const d = `M ${x1} ${y1} V ${y2} H ${x2}`;
            const length = Math.abs(y2 - y1) + Math.abs(x2 - x1);

            edges.push({
                id: `${parent.id}=>${child.id}`,
                fromId: parent.id,
                toId: child.id,
                d,
                length,
            });

            walk(child);
        });
    };
    walk(root);
    return edges;
}

/* Siblings animate concurrently */

function buildTimelineConcurrent(root: PositionedNode): Record<string, Timeline> {
    const tl: Record<string, Timeline> = {};

    const visit = (node: PositionedNode, start: number, hasIncomingEdge: boolean): void => {
        const edgeDelay = hasIncomingEdge ? start : undefined;

        const dotDelay = (edgeDelay ?? start) + (hasIncomingEdge ? EDGE_DUR * 0.85 : 0);
        const textDelay = dotDelay + DOT_DUR * 0.6;

        const doneAt = textDelay + TEXT_DUR;

        tl[node.id] = { edgeDelay, dotDelay, textDelay, doneAt };

        const childStart = doneAt + GAP;
        node.children?.forEach((child) => {
            visit(child, childStart, true);
        });
    };

    visit(root, 0, false);
    return tl;
}

/* Bounds for viewBox */

function measureBounds(nodes: PositionedNode[]) {
    let maxX = 0;
    let maxY = 0;

    for (const n of nodes) {
        const textW = n.node.label.length * CHAR_W;
        const right = n.x + TEXT_GAP + textW + 20;
        maxX = Math.max(maxX, right);
        maxY = Math.max(maxY, n.y + ROW_H);
    }

    return { width: maxX + 40, height: maxY + 40 };
}

function safeId(id: string) {
    return id.replace(/\./g, "_");
}

/* ============================
   Page Component
============================ */

export default function SatelliteTreeSvgRightSide() {
    const { nodes, edges, timeline, bounds } = useMemo(() => {
        const root = layoutTree(tree, "0", 0, { y: START_Y });
        const nodes = collectNodes(root);
        const edges = collectEdges(root);
        const timeline = buildTimelineConcurrent(root); // <- concurrent by parent
        const bounds = measureBounds(nodes);
        return { nodes, edges, timeline, bounds };
    }, []);

    return (
        <div className="w-screen h-screen bg-transparent flex">
            {/* LEFT SIDE:  */}
            <div className="w-[42%] h-full flex items-center justify-center p-6">
                <div className="w-full h-[100%] border border-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white/50 font-mono text-sm">Image area</span>
                </div>
            </div>

            {/* RIGHT SIDE: SVG area */}
            <div className="w-[58%] h-full flex items-start justify-end p-6">
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${bounds.width} ${bounds.height}`}
                    preserveAspectRatio="xMaxYMin meet"
                >
                    {/* EDGES */}
                    <g>
                        {edges.map((e) => {
                            const t = timeline[e.toId];
                            const delay = t?.edgeDelay ?? 0;

                            return (
                                <path
                                    key={e.id}
                                    d={e.d}
                                    fill="none"
                                    stroke="white"
                                    strokeOpacity={0.7}
                                    strokeWidth={STROKE_W}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray={e.length}
                                    strokeDashoffset={e.length}
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        from={e.length}
                                        to={0}
                                        dur={`${EDGE_DUR}s`}
                                        begin={`${delay}s`}
                                        fill="freeze"
                                        calcMode="spline"
                                        keySplines="0.4 0 0.2 1"
                                    />
                                </path>
                            );
                        })}
                    </g>

                    {/* NODES */}
                    <g>
                        {nodes.map((n) => {
                            const t = timeline[n.id];
                            const labelX = n.x + TEXT_GAP;
                            const labelY = n.y;

                            const clipW = Math.max(1, n.node.label.length) * CHAR_W;
                            const clipId = `clip_${safeId(n.id)}`;

                            return (
                                <g key={n.id}>
                                    <circle cx={n.x} cy={n.y} r={0} fill="white" opacity={0}>
                                        <animate
                                            attributeName="opacity"
                                            from="0"
                                            to="1"
                                            dur={`${DOT_DUR}s`}
                                            begin={`${t.dotDelay}s`}
                                            fill="freeze"
                                        />
                                        <animate
                                            attributeName="r"
                                            from="0"
                                            to={DOT_R}
                                            dur={`${DOT_DUR}s`}
                                            begin={`${t.dotDelay}s`}
                                            fill="freeze"
                                            calcMode="spline"
                                            keySplines="0.4 0 0.2 1"
                                        />
                                    </circle>
                                    <defs>
                                        <clipPath id={clipId}>
                                            <rect
                                                x={labelX}
                                                y={labelY - FONT_SIZE}
                                                width="0"
                                                height={FONT_SIZE * 1.6}
                                            >
                                                <animate
                                                    attributeName="width"
                                                    from="0"
                                                    to={clipW}
                                                    dur={`${TEXT_DUR}s`}
                                                    begin={`${t.textDelay}s`}
                                                    fill="freeze"
                                                    calcMode="spline"
                                                    keySplines="0.4 0 0.2 1"
                                                />
                                            </rect>
                                        </clipPath>
                                    </defs>
                                    <text
                                        x={labelX}
                                        y={labelY}
                                        fill="white"
                                        fontSize={FONT_SIZE}
                                        fontFamily="monospace"
                                        dominantBaseline="middle"
                                        clipPath={`url(#${clipId})`}
                                    >
                                        {n.node.label}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>
        </div>
    );
}

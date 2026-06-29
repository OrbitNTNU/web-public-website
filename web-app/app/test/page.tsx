"use client";

/**
 * BioSat test page — kept for local dev reference.
 * In production, the BioSat project page at /projects/biosat
 * renders BioSatClientPage which is fed from Sanity sections.
 *
 * This page now defers to BioSatClientPage with a mock BigProject
 * so it mirrors production exactly.
 */
import BioSatClientPage from "@/components/Project/BioSat/BioSatClientPage";
import { BigProject } from "@/sanity/types/project";

// Minimal mock so the test page renders without a real Sanity fetch.
// Replace field values here to preview different content locally.
const mockProject: BigProject = {
    _key: "test",
    _id: "test",
    _type: "bigProject",
    title: "BioSat",
    teaser: "BioSat is Orbit NTNU's next-generation CubeSat mission.",
    slug: { current: "biosat" },
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    sections: [],
};

export default function TestPage() {
    return <BioSatClientPage project={mockProject} />;
}

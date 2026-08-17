/**
 * Mock data + local types for the BioSat snap-scroll page.
 *
 * This file replaces everything that used to come from Sanity:
 *  - the `@/sanity/types/...` interfaces are re-declared locally
 *  - `imageBuilder(...)` is gone — images are plain URL strings
 *  - PortableText body is now a plain string[] of paragraphs
 *
 * Images are NASA public-domain photos from images-assets.nasa.gov.
 * NOTE: I couldn't verify these URLs live (no network in this env), so if
 * any 404 just swap the string here — every image is defined in IMG below.
 * You must also allow the domain in next.config (see the note I gave you).
 */

// ---------------------------------------------------------------------------
// NASA image pool (public domain). Reused across sections — normal for mocks.
// ---------------------------------------------------------------------------
const IMG = {
    blueMarble:
        "https://images-assets.nasa.gov/image/as17-148-22727/as17-148-22727~large.jpg",
    earthrise:
        "https://images-assets.nasa.gov/image/as08-14-2383/as08-14-2383~large.jpg",
    aldrinMoon:
        "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~large.jpg",
    aldrinVisor:
        "https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~large.jpg",
} as const;

// ---------------------------------------------------------------------------
// Types (formerly @/sanity/types/components/*)
// ---------------------------------------------------------------------------
export interface HeroData {
    title: string;
    subtitle: string;
    projectImageDesktop: string;
    projectImageMobile: string;
}

export interface OtData {
    heading: string;
}

export interface PmCard {
    pmName: string;
    pmImage: string;
    /** ISO date string */
    pmPeriodStart: string;
    /** ISO date string, or null/undefined for the current PM */
    pmPeriodEnd?: string | null;
}

export interface PmData {
    title: string;
    /** was PortableText — now plain paragraphs */
    body: string[];
    pmCards: PmCard[];
}

export interface HlsItem {
    hlsHeader: string;
    hlsBody: string;
}

export interface HlsData {
    title: string;
    hls: HlsItem[];
}

export interface TimelineItem {
    _key?: string;
    imageTitle: string;
    image: string;
}

export interface TimelineData {
    heading: string;
    subheading?: string;
    timelineCollection: TimelineItem[];
}

export interface SinceLaunchData {
    /** ISO date string */
    lastLaunchDate: string;
}

// ---------------------------------------------------------------------------
// Mock content
// ---------------------------------------------------------------------------
export const heroData: HeroData = {
    title: "BioSat",
    subtitle:
        "A student-built nanosatellite growing the first plant seed in low Earth orbit.",
    projectImageDesktop: IMG.blueMarble,
    projectImageMobile: IMG.earthrise,
};

export const otData: OtData = {
    heading: "MISSION OPERATIONS",
};

export const pmData: PmData = {
    title: "Project Managers",
    body: [
        "BioSat has been carried across generations of students, each project manager handing off a growing mission to the next.",
        "The team spans mechanical, electrical, and software disciplines, all working toward a single launch window.",
    ],
    pmCards: [
        {
            pmName: "Ada Nordvik",
            pmImage: IMG.blueMarble,
            pmPeriodStart: "2021-08-01",
            pmPeriodEnd: "2022-07-31",
        },
        {
            pmName: "Jonas Feld",
            pmImage: IMG.earthrise,
            pmPeriodStart: "2022-08-01",
            pmPeriodEnd: "2023-07-31",
        },
        {
            pmName: "Mira Solheim",
            pmImage: IMG.aldrinVisor,
            pmPeriodStart: "2023-08-01",
            pmPeriodEnd: "2024-07-31",
        },
        {
            // current PM — no end date -> highlighted / col-span-2
            pmName: "Kai Berg",
            pmImage: IMG.aldrinMoon,
            pmPeriodStart: "2024-08-01",
            pmPeriodEnd: null,
        },
    ],
};

export const hlsData: HlsData = {
    title: "High-Level Specs",
    hls: [
        { hlsHeader: "FORM FACTOR", hlsBody: "2U CubeSat" },
        { hlsHeader: "MASS", hlsBody: "2.4 kg" },
        { hlsHeader: "ORBIT", hlsBody: "550 km SSO" },
        { hlsHeader: "PAYLOAD", hlsBody: "BioBox + SDR" },
        { hlsHeader: "POWER", hlsBody: "8.6 W avg" },
    ],
};

export const timelineData: TimelineData = {
    heading: "Mission Timeline",
    subheading: "Key milestones from concept to orbit.",
    timelineCollection: [
        { _key: "t1", imageTitle: "Concept Review", image: IMG.blueMarble },
        { _key: "t2", imageTitle: "Payload Design", image: IMG.earthrise },
        { _key: "t3", imageTitle: "Integration", image: IMG.aldrinMoon },
        { _key: "t4", imageTitle: "Environmental Testing", image: IMG.aldrinVisor },
        { _key: "t5", imageTitle: "Delivery", image: IMG.blueMarble },
        { _key: "t6", imageTitle: "Launch", image: IMG.earthrise },
    ],
};

export const sinceLaunchData: SinceLaunchData = {
    // A past date so the counter counts up. Swap for your real launch date.
    lastLaunchDate: "2025-03-14T09:32:00Z",
};
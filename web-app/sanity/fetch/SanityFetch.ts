import {sanityFetch} from "@/sanity/live/live";

import {LANDING_PAGE_QUERY} from "@/sanity/queries/landingPage";
import {ALL_BIG_PROJECTS_QUERY, BIG_PROJECT_BY_SLUG_QUERY} from "@/sanity/queries/projects";
import {SPONSORS_PAGE_QUERY} from "@/sanity/queries/sponsorsPage";
import {BigProject} from "@/sanity/types/project";
import {SponsorsPage} from "@/sanity/types/sponsorsPage"
import {LandingPage} from "@/sanity/types/landingPage";

//LANDING PAGE
export const getLandingPage = async (): Promise<LandingPage | null> => {
    try {
        const { data } = await sanityFetch({ query: LANDING_PAGE_QUERY });
        return (data as LandingPage) ?? null;
    } catch (e) {
        console.error("Error fetching landingpage:", e);
        return null;
    }
};
//BIG PROJECT
export const getBigProject = async (slug: string): Promise<BigProject | null> => {
    try {
        const { data } = await sanityFetch({
            query: BIG_PROJECT_BY_SLUG_QUERY,
            params: { slug },
        });
        return (data as BigProject) ?? null;
    } catch (e) {
        console.error("Error fetching big project:", e);
        return null;
    }
};

// ALL BIG PROJECTS
export const getAllBigProjects = async (): Promise<BigProject[] | null> => {
    try {
        const { data } = await sanityFetch({
            query: ALL_BIG_PROJECTS_QUERY,
        });
        return (data as BigProject[]) ?? [];
    } catch (e) {
        console.error("Error fetching all big projects:", e);
        return [];
    }
};

// SPONSOR PAGE
export const getSponsorPage = async (): Promise<SponsorsPage | null> => {
    try{
        const { data } = await sanityFetch({
            query: SPONSORS_PAGE_QUERY,
        });
        return (data as SponsorsPage) ?? null;
    }catch (e) {
        console.error("Error fetching sponsor page:", e);
        return null;
    }

}

import {LandingPage} from "@/sanity/types/landingPage";
import {LANDING_PAGE_QUERY} from "@/sanity/queries/landingPage";
import {sanityFetch} from "@/sanity/live/live";
import {BigProject} from "@/sanity/types/project";
import {BIG_PROJECT_BY_SLUG_QUERY} from "@/sanity/queries/projects";

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

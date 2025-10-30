import {LandingPage} from "@/sanity/types/landingPage";
import {LANDING_PAGE_QUERY} from "@/sanity/queries/landingPage";
import {sanityFetch} from "@/sanity/live/live";


export const getLandingPage = async (): Promise<LandingPage | null> => {
    try {
        const { data } = await sanityFetch({ query: LANDING_PAGE_QUERY });
        return (data as LandingPage) ?? null;
    } catch (e) {
        console.error("Error fetching video section:", e);
        return null;
    }
};
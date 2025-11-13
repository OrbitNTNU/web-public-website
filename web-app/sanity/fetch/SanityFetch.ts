import { sanityFetch } from "@/sanity/live/live";

import { LANDING_PAGE_QUERY } from "@/sanity/queries/landingPage";
import {
  ALL_BIG_PROJECTS_QUERY, ALL_SUBORBITAL_PROJECTS_QUERY,
  BIG_PROJECT_BY_SLUG_QUERY, SUBORBITAL_PROJECT_BY_SLUG_QUERY,
} from "@/sanity/queries/projects";
import { SPONSORS_PAGE_QUERY } from "@/sanity/queries/sponsorsPage";
import {BigProject, SubOrbitalProject} from "@/sanity/types/project";
import { SponsorsPage } from "@/sanity/types/sponsorsPage";
import { LandingPage } from "@/sanity/types/pages/landingPage";
import { AboutPage } from "../types/pages/aboutPage";
import { ABOUT_PAGE_QUERY } from "../queries/aboutPage";
import {
  ALL_ARTICLES_QUERY,
  ARTICLE_PAGE_QUERY,
} from "@/sanity/queries/articlePage";
import { Article } from "@/sanity/types/pages/articlePage";
import {TeamPage} from "@/sanity/types/pages/teamsPage";
import {TEAM_PAGE_QUERY} from "@/sanity/queries/teamPage";

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

//ABOUT PAGE
export const getAboutPage = async (): Promise<AboutPage | null> => {
  try {
    const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
    return (data as AboutPage) ?? null;
  } catch (e) {
    console.error("Error fetching about page:", e);
    return null;
  }
};

//ARTICLE SLUG PAGE

export const getArticle = async (slug: string): Promise<Article | null> => {
  try {
    const { data } = await sanityFetch({
      query: ARTICLE_PAGE_QUERY,
      params: { slug },
    });

    return (data as Article) ?? null;
  } catch (e) {
    console.error(`Error fetching article (${slug}):`, e);
    return null;
  }
};
//ALLOFEM
export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const { data } = await sanityFetch({
      query: ALL_ARTICLES_QUERY,
    });
    return (data as Article[]) ?? [];
  } catch (e) {
    console.error("Error fetching all articles:", e);
    return [];
  }
};

export const getSubOrbitalProject = async (
    slug: string
): Promise<SubOrbitalProject | null> => {
  try {
    const { data } = await sanityFetch({
      query: SUBORBITAL_PROJECT_BY_SLUG_QUERY,
      params: { slug },
    });

    return (data as SubOrbitalProject) ?? null;
  } catch (e) {
    console.error(`Error fetching sub orbital project (${slug}):`, e);
    return null;
  }
};


export const getAllSubOrbitalProjects = async (): Promise<
    SubOrbitalProject[]
> => {
  try {
    const { data } = await sanityFetch({
      query: ALL_SUBORBITAL_PROJECTS_QUERY,
    });

    return (data as SubOrbitalProject[]) ?? [];
  } catch (e) {
    console.error("Error fetching all sub orbital projects:", e);
    return [];
  }
};



//BIG PROJECT
export const getBigProject = async (
  slug: string,
): Promise<BigProject | null> => {
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
  try {
    const { data } = await sanityFetch({
      query: SPONSORS_PAGE_QUERY,
    });
    return (data as SponsorsPage) ?? null;
  } catch (e) {
    console.error("Error fetching sponsor page:", e);
    return null;
  }
};

//TEAM PAGE FULL PAGE
export const getTeamPage = async (teamId: number): Promise<TeamPage | null> => {
  try {
    const { data } = await sanityFetch({
      query: TEAM_PAGE_QUERY,
      params: { teamId },
    });

    return (data as TeamPage) ?? null;
  } catch (err) {
    console.error(`Error fetching team page (${teamId}):`, err);
    return null;
  }
};

// TEAM PAGE TIL MIN KJÆRE
export const getTeamPageForMagnus = async (): Promise<TeamPage | null> => {
  try {
    const { data } = await sanityFetch({
      query: `
        *[_type == "teamPage"][0]{
          _id,
          teams,
          sections[] {
            ...,
            _type == "membersSection" => {
              _key,
              _type
            },
            _type == "largeQuote" => {
              _key,
              _type,
              quote
            },
            _type == "largeImage" => {
              _key,
              _type,
              image{asset->},
              caption
            },
            _type == "doubleImageCollage" => {
              _key,
              _type,
              items[] {
                _key,
                _type,
                variant,
                image1{asset->},
                alt1,
                title1,
                caption1,
                link1,
                image2{asset->},
                alt2,
                title2,
                caption2,
                link2
              }
            },
            _type == "gallery" => {
              _key,
              _type,
              images[] {
                image{asset->},
                alt,
                tagline,
                link
              }
            }
          }
        }
      `,
    });

    return (data as TeamPage) ?? null;
  } catch (err) {
    console.error("Error fetching first team page (Magnus):", err);
    return null;
  }
};

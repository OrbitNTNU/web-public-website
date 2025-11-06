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

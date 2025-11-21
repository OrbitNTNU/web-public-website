import {defineDocuments, defineLocations, PresentationPluginOptions} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
    locations: {
        landingPage: defineLocations({
            select: {},
            resolve: () => ({
                locations: [
                    { title: "Home", href: "/" },
                ],
            }),
        }),

        aboutPage: defineLocations({
            select: {},
            resolve: () => ({
                locations: [
                    { title: "About", href: "/about" },
                ],
            }),
        }),

        article: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
                locations: [
                    {
                        title: doc?.title || "Article",
                        href: doc?.slug ? `/articles/${doc.slug}` : "/articles",
                    },
                ],
            }),
        }),

        bigProject: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
                locations: [
                    {
                        title: doc?.title || "Project",
                        href: doc?.slug ? `/projects/${doc.slug}` : "/projects",
                    },
                ],
            }),
        }),

        subOrbitalProject: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
                locations: [
                    {
                        title: doc?.title || "Project",
                        href: doc?.slug ? `/projects/${doc.slug}` : "/projects",
                    },
                ],
            }),
        }),

        teamPage: defineLocations({
            select: { team: "team" },
            resolve: (doc) => ({
                locations: Array.isArray(doc?.team)
                    ? doc.team.map((id: number) => ({
                        title: `Team ${id}`,
                        href: `/team/${id}`,
                    }))
                    : [],
            }),
        }),

        sponsorsPage: defineLocations({
            select: {},
            resolve: () => ({
                locations: [
                    { title: "Sponsors", href: "/sponsors" },
                ],
            }),
        }),
    },

    // “Matching documents” for a given URL in the Presentation tool
    mainDocuments: defineDocuments([
        {
            route: "/",
            type: "landingPage", // singleton – your *[_type=="landingPage"][0]
        },
        {
            route: "/about",
            type: "aboutPage",
        },
        {
            route: "/articles/:slug",
            filter: `_type == "article" && slug.current == $slug`,
        },
        {
            route: "/projects/:slug",
            filter: `_type in ["bigProject","subOrbitalProject"] && slug.current == $slug`,
        },
        {
            route: "/sponsors",
            type: "sponsorsPage",
        },

    ]),
};

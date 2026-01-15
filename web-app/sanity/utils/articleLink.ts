export type InternalArticleLink = {
    linkType: 'internal'
    link: {
        internal: {
            slug: { current: string }
        }
    }
}

export type ExternalArticleLink = {
    linkType: 'external'
    link: {
        external: string
    }
}

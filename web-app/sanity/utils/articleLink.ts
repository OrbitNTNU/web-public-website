export type ArticleLinkType = 'internal' | 'external'

export interface ArticleLink {
    internal?: {
        _type?: string
        slug: { current: string }
    }
    external?: string
}
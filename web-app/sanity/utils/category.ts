export interface CategoryLink {
    type: 'internal' | 'external'
    internal?: {
        _type: string
        slug: { current: string }
    }
    external?: string
}

export interface Category {
    _id: string
    title: string
    color: string
    link?: CategoryLink
}

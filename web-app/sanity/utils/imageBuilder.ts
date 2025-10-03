// utils/imageBuilder.ts
type ImageBuilderOptions = {
  width?: number
  height?: number
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
}

export const imageBuilder = (
  source: string | { asset: { _ref: string } },
  opts: ImageBuilderOptions = {}
) => {
  if (!source) return ''

  const ref = typeof source === 'string' ? source : source.asset?._ref

  if (!ref || !ref.startsWith('image-')) {
    console.warn('Invalid Sanity image reference:', ref)
    return ''
  }

  const parts = ref.split('-')
  const id = parts[1]
  const dimensions = parts[2] // e.g. "3840x2156"
  const format = parts[3]     // e.g. "png"

  const filename = `${id}-${dimensions}.${format}`

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  const url = new URL(
    `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`
  )

  if (opts.width) url.searchParams.set('w', String(opts.width))
  if (opts.height) url.searchParams.set('h', String(opts.height))
  if (opts.fit) url.searchParams.set('fit', opts.fit)

  return url.toString()
}

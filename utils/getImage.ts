// utils/getImage.ts
export const getImage = (src: string) => {
  if (!src) return '/placeholder.png' // image de fallback
  if (src.startsWith('http')) return src
  return src // images locales dans /public
}

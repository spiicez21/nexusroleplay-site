import heroData from '../data/hero.json'
import connectData from '../data/connect.json'
import manifestoData from '../data/manifesto.json'
import architectureData from '../data/architecture.json'
import galleryData from '../data/gallery.json'
import societyData from '../data/society.json'
import joinData from '../data/join.json'

export const getAssetManifest = () => {
  const assets: string[] = []

  // Hero
  assets.push(heroData.assets.bg)
  assets.push(heroData.assets.actor)

  // Connect
  assets.push(connectData.assets.bg)
  assets.push(connectData.assets.actor)

  // Manifesto
  assets.push(manifestoData.assets.actor)

  // Architecture 
  assets.push(architectureData.assets.bg)
  assets.push(architectureData.assets.actor)

  // Gallery
  galleryData.items.forEach((item: any) => assets.push(`/Assets/Gallery/${item.img}`))

  // Society
  assets.push(societyData.assets.bg)
  assets.push(societyData.assets.actor)

  // Join
  assets.push(joinData.assets.bg)
  assets.push(joinData.assets.actor)

  // Remove duplicates and empty strings
  return Array.from(new Set(assets.filter(url => url && url.trim() !== "")))
}

export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve()
    img.onerror = () => resolve() // Resolve anyway to not block loading forever
  })
}

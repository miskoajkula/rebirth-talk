import crypto from 'crypto'

export async function getPobjedaCategory (url) {
  try {
    const urlObj = new URL(url)
    const path = urlObj.pathname
    const pathSplit = path.split('/')
    const lastPath = pathSplit[pathSplit.length - 1]

    // console.log('requesting')
    // console.log(lastPath)
    const req = await fetch(
      `https://api.pobjeda.me/v1/articles/${lastPath}?extended_fields=image,authors.image,video_cover_image,source,category,tags,gallery.media.author,gallery.media.source,featured_gallery.media.author,featured_gallery.media.source,related.category,elements`,
    )
    const res = await req.json()
    const split = res.data.category.path.split('/')



    return {
      category: null,
      subcategory: split[1].length > 1 ? split[1] : split[0],
      shortContent: res.data.content?.length > 200 ? res.data.content.substring(0, 200) + '...' : "",
    }
  } catch (e) {
    console.log(e)
    return {
      category: '',
      subcategory: '',
      shortContent: ""
    }
  }
}

export async function extractCategoryAndSubcategory (providerName, url) {
  if (providerName === 'Pobjeda') {
    return await getPobjedaCategory(url)
  }
  try {
    const urlObj = new URL(url)

    const pathParts = urlObj.pathname.split('/').filter(part => part)

    console.log(pathParts)
    if (pathParts.length >= 2) {
      const category = pathParts[0]
      const subcategory = pathParts[1]
      return { category, subcategory, shortContent: "" }
    } else {
      return { category: '', subcategory: '', shortContent: "" }
    }
  } catch (error) {
    console.error('Error parsing URL:', error)
    return { category: '', subcategory: '', shortContent: "" }
  }
}

export function stringToMD5(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

export function getRandomNumber(min, max) {
  if (min > max) {
    throw new Error("Min value cannot be greater than Max value.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

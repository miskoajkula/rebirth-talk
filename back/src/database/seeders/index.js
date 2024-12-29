import getDbInstance from '../index.js'
import { providers } from '../schema/provider.js'

let providerList = [
  {
    name: 'Vijesti',
    siteUrl: 'https://www.vijesti.me',
    rssUrl: 'https://www.vijesti.me/rss',
    rssHasImage: true,
    slug: 'vijesti',
  },
  {
    name: 'Pobjeda',
    siteUrl: 'https://pobjeda.me',
    rssUrl: 'https://rss.pobjeda.me',
    rssHasImage: true,
    slug: 'pobjeda',
  },
  {
    name: 'CDM',
    siteUrl: 'https://www.cdm.me',
    rssUrl: 'https://www.cdm.me/wp-json/wp/v2/posts?per_page=10&_fields=id,title,link,date,date_gmt,excerpt,featured_image_url',
    rssHasImage: false,
    slug: 'cdm',
  },
  {
    name: 'Dan',
    siteUrl: 'https://www.dan.co.me',
    rssUrl: 'https://www.dan.co.me/feed',
    rssHasImage: false,
    slug: 'dan',
  },
  {
    name: 'AntenaM',
    siteUrl: 'https://www.antenam.net',
    rssUrl: 'https://www.antenam.net/api/1.0/v2/post/latest',
    rssHasImage: false,
    slug: 'antenam',
  },
]

async function seed () {
  const db = await getDbInstance()

  try {
    // Insert sample providers
    // one by one because of adding new ones...
    // console.log(providerList)
    for (const provider of providerList) {
      try {
        await db.insert(providers).values(provider)
      } catch (e) {
        console.log(e)
      }
    }

    console.log('Seed data inserted successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed()

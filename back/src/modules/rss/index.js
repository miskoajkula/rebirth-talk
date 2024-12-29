import Parser from 'rss-parser'
import { HttpProxyAgent } from 'http-proxy-agent'
import { and, desc, eq, sql } from 'drizzle-orm'

import { providers } from '#database/schema/provider.js'
import { extractCategoryAndSubcategory, getRandomNumber, stringToMD5 } from '#utils/functions.js'
import { posts } from '#database/schema/post.js'
import { categories } from '#database/schema/category.js'
import { proxy } from '#database/schema/proxy.js'
import { stripHtml } from 'string-strip-html'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'
import fs from 'fs'
import newsModule from '#modules/news/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class RSSModule {

  init (db) {
    this.db = db
    this.parser = new Parser({
      customFields: {
        item: [
          'media:content',
          'media:credit',
        ],
      },
    })
    // this.fetchVijesti()

    setInterval(() => {
      this.initFetch()
    }, 60000)

    this.initFetch()

  }

  async getProvidersWithPosts (db) {
    const providersList = await db.select({
      providerId: providers.id,
      providerName: providers.name,
      rssUrl: providers.rssUrl,
    }).from(providers).where(eq(providers.active, true))

    const providerPostsPromises = providersList.map(async (provider) => {
      const postsList = await db.select({
        postId: posts.id,
        postTitle: posts.title,
        postCreatedAt: posts.createdAt,
        linkHashed: posts.linkHashed,
      }).from(posts).where(eq(posts.providerId, provider.providerId)).orderBy(desc(posts.createdAt)).limit(100)

      return {
        providerId: provider.providerId,
        providerName: provider.providerName,
        rssUrl: provider.rssUrl,
        existingPosts: postsList,
      }
    })

    return await Promise.all(providerPostsPromises)
  }

  async getCategories () {
    return await this.db.select().from(categories)
  }

  async initFetch () {
    console.log('Fetching RSS API...')
    // console.log(this.db)
    //
    // const db = await getDbInstance()
    try {
      const providersWithPosts = await this.getProvidersWithPosts(this.db)
      const categories = await this.getCategories()

      // console.log(providersWithPosts)
      for (const provider of providersWithPosts) {
        await this.fetchVijesti(provider, categories)
      }

    } catch (e) {
      console.log('Error fetching data')
      console.log(e)
    }

    //todo fill cache
    await newsModule.getHomepage()
  }

  async getItemImage (providerName, item) {
    let imgUrl = ''
    let localImageName = ''

    switch (providerName) {
      case 'Vijesti':
      case 'Dan':
      case 'CDM':
      case 'AntenaM':
        imgUrl = item.enclosure.url
        break
      case 'Pobjeda':
        imgUrl = item['media:content']['$'].url
        break
    }

    try {
      const imageDownloaded = await fetch(imgUrl)
      localImageName = `img_${Date.now()}.jpg`
      const localImagePath = path.join(__dirname, '../../../images', localImageName)

      const arrayBuffer = await imageDownloaded.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await fs.promises.writeFile(localImagePath, buffer)

      console.log(`Image downloaded and saved to ${localImagePath}`)

      return localImageName

    } catch (e) {

      console.log('error images')
      console.log(e)
      return ''
    }

  }

  getCategoryMapping (inputCategory, inputSubcategory, categoryList) {
    let categoryId = null
    let subcategoryId = null

    console.log(`looking for -> ${inputCategory} | ${inputSubcategory}`)

    switch (inputSubcategory) {
      case 'izbori':
      case 'politika':
      case 'lokalni izbori 2024':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Politika').id
        break
      case 'drustvo':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Društvo').id
        break
      case 'ekonomija':
      case 'fintech':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Ekonomija').id
        break
      case 'crna-hronika':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Crna Hronika').id
        break
      case 'auto':
      case 'automobili':
      case 'motori':
        categoryId = categoryList.find(c => c.name === 'Automobili').id
        break
      case 'tehno':
      case 'nauka':
      case 'm-tech':
        categoryId = categoryList.find(c => c.name === 'Tehnologija').id
        subcategoryId = categoryList.find(c => c.name === 'Nauka').id
        break
      case 'cg-sportisti':
      case 'olimpijski-dnevnik':
      case 'medalje':
      case 'istorijat':
      case 'pariz-2024':
      case 'oi2024':
        categoryId = categoryList.find(c => c.name === 'Sport').id
        subcategoryId = categoryList.find(c => c.name === 'Ostali sportovi').id
        break
      case 'fudbal':
      case 'fkbudućnost':
        categoryId = categoryList.find(c => c.name === 'Sport').id
        subcategoryId = categoryList.find(c => c.name === 'Fudbal').id
        break
      case 'kosarka':
        categoryId = categoryList.find(c => c.name === 'Sport').id
        subcategoryId = categoryList.find(c => c.name === 'Košarka').id
        break
      case 'tenis':
        categoryId = categoryList.find(c => c.name === 'Sport').id
        subcategoryId = categoryList.find(c => c.name === 'Tenis').id
        break
      case 'rukomet':
        categoryId = categoryList.find(c => c.name === 'Sport').id
        subcategoryId = categoryList.find(c => c.name === 'Rukomet').id
        break
      case 'vaterpolo':
      case 'ostali-sportovi':
      case 'sportski-miks':
      case 'ostalo':
        categoryId = categoryList.find(c => c.name === 'Sport').id
        subcategoryId = categoryList.find(c => c.name === 'Ostali sportovi').id
        break
      case 'evropa':
      case 'priceizukrajine':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Evropa').id
        break
      case 'balkan':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Region').id
        break
      case 'svijet':
      case 'globus':
      case 'planeta':
      case 'rusija':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Planeta').id
        break
      case 'moda-i-ljepota':
      case 'moda':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Moda i Ljepota').id
        break
      case 'zdravlje':
      case 'ljepota-i-zdravlje':
      case 'bolesti':
      case 'bilje-i-zdravlje':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Zdravlje').id
        break
      case 'kuhinja-i-kuca':
      case 'kuzina':
      case 'ishrana':
      case 'trpeza':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Kuhinja').id
        break
      case 'ljubav-i-seks':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Seks').id
        break
      case 'muzika':
        categoryId = categoryList.find(c => c.name === 'Showbiznis').id
        subcategoryId = categoryList.find(c => c.name === 'Muzika').id
        break
      case 'film-tv':
      case 'filmovi':
      case 'serije':
      case 'kalendar':
        categoryId = categoryList.find(c => c.name === 'Showbiznis').id
        subcategoryId = categoryList.find(c => c.name === 'Film').id
        break
      case 'gaming':
      case 'igrice':
        categoryId = categoryList.find(c => c.name === 'Tehnologija').id
        subcategoryId = categoryList.find(c => c.name === 'Gaming').id
        break
      case 'telefoni':
      case 'racunari':
      case 'kosmos':
        categoryId = categoryList.find(c => c.name === 'Tehnologija').id
        break
      case 'medicina':
        categoryId = categoryList.find(c => c.name === 'Tehnologija').id
        subcategoryId = categoryList.find(c => c.name === 'Nauka').id
        break
      case 'zanimljivo':
      case 'zanimljivosti':
      case '33-obrtaja':
      case 'psihologija':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Zanimljivo').id
        break
      case 'dzuboks':
        categoryId = categoryList.find(c => c.name === 'Showbiznis').id
        subcategoryId = categoryList.find(c => c.name === 'Muzika').id
        break
      case 'lifestyle':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        break
      case 'dom-i-dizajn':
      case 'dom':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Dom i Dizajn').id
        break
      case 'preporuke':
      case 'podgoricarenje':
      case 'feljton':
      case 'grad':
        categoryId = categoryList.find(c => c.name === 'Showbiznis').id
        subcategoryId = categoryList.find(c => c.name === 'Kultura').id
        break
      case 'crnom-gorom':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Crna Gora').id
        break
      case 'kultura':
        categoryId = categoryList.find(c => c.name === 'Showbiznis').id
        subcategoryId = categoryList.find(c => c.name === 'Kultura').id
        break
      case 'region':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Region').id
        break
      case 'djeca':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Mama').id
        break
      case 'showbiz':
      case 'showbizz':
      case 'muzika-film-tv':
        categoryId = categoryList.find(c => c.name === 'Showbiznis').id
        break
      case 'love-sex':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Seks').id
        break
      case 'hronika':
      case 'penzioneri':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        subcategoryId = categoryList.find(c => c.name === 'Crna Gora').id
        break
      case 'ona':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Zanimljivo').id
        break
      case 'astro':
        categoryId = categoryList.find(c => c.name === 'Lifestyle').id
        subcategoryId = categoryList.find(c => c.name === 'Horoskop').id
        break
      case 'turizam':
        categoryId = categoryList.find(c => c.name === 'Biznis').id
        break
      case 'religija':
        categoryId = categoryList.find(c => c.name === 'Vijesti').id
        break
    }

    if (inputSubcategory === null || categoryId === null) {
      switch (inputCategory) {
        case 'oi-pariz-2024':
          categoryId = categoryList.find(c => c.name === 'Sport').id
          subcategoryId = categoryList.find(c => c.name === 'Ostali sportovi').id
          break
        case 'kultura':
        case 'zabava':
        case 'preporuke':
          categoryId = categoryList.find(c => c.name === 'Showbiznis').id
          subcategoryId = categoryList.find(c => c.name === 'Kultura').id
          break
        case 'svijet':
          categoryId = categoryList.find(c => c.name === 'Vijesti').id
          subcategoryId = categoryList.find(c => c.name === 'Planeta').id
          break
        case 'politika':
          categoryId = categoryList.find(c => c.name === 'Vijesti').id
          subcategoryId = categoryList.find(c => c.name === 'Politika').id
          break
        case 'drustvo':
          categoryId = categoryList.find(c => c.name === 'Vijesti').id
          subcategoryId = categoryList.find(c => c.name === 'Društvo').id
          break
        case 'ekonomija':
          categoryId = categoryList.find(c => c.name === 'Vijesti').id
          subcategoryId = categoryList.find(c => c.name === 'Ekonomija').id
          break
        case 'hronika':
          categoryId = categoryList.find(c => c.name === 'Vijesti').id
          subcategoryId = categoryList.find(c => c.name === 'Crna Gora').id
          break
        case 'grad':
          categoryId = categoryList.find(c => c.name === 'Showbiznis').id
          subcategoryId = categoryList.find(c => c.name === 'Kultura').id
          break
        case 'tehnologije':
          categoryId = categoryList.find(c => c.name === 'Tehnologija').id
          break
        case 'podgoricom':
        case 'crna-gora':
          categoryId = categoryList.find(c => c.name === 'Vijesti').id
          subcategoryId = categoryList.find(c => c.name === 'Crna Gora').id
          break
        case 'srbija':
          categoryId = categoryList.find(c => c.name === 'Vijesti').id
          subcategoryId = categoryList.find(c => c.name === 'Region').id
          break
        case 'turizam':
          categoryId = categoryList.find(c => c.name === 'Biznis').id
          break
        case 'sport':
          categoryId = categoryList.find(c => c.name === 'Sport').id
          break
      }
    }

    console.log('done')
    return {
      categoryId,
      subcategoryId,
    }
  }

  async getAntenaMFeed (url) {

    // auth header "Auth" - Value: 'Basic SUM2SkVtOXJNeW1uTlhld3EyY0lTUXMwWDp2MWY4dWd5RG1sbUlJeDF4bWhJZmdIdVRZ'
    return new Promise(async (resolve, reject) => {

      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth': 'Basic SUM2SkVtOXJNeW1uTlhld3EyY0lTUXMwWDp2MWY4dWd5RG1sbUlJeDF4bWhJZmdIdVRZ',
        },
      }).then(res => res.json()).then(data => {
        const formattedResponse = data.data.map(el => {
          return {
            title: el.title,
            link: el.web_link,
            contentSnippet: '',
            enclosure: {
              url: el.image,
            },
          }
        })
        resolve({ items: formattedResponse })
      }).catch(async err => {
        resolve({ items: [] })
        console.error('Error:', err)
      })
    })
  }

  async getCDMFeed (rssUrl) {

    const proxyRes = await this.db.select().from(proxy).where(and(
      eq(proxy.active, true),
    )).limit(1)

    let proxyObj = null
    let proxyAgent = null
    if (proxyRes?.length > 0) {
      proxyObj = proxyRes[0]
      proxyAgent = new HttpProxyAgent(proxyObj.address)
    }

    return new Promise(async (resolve, reject) => {

      fetch('https://www.cdm.me/wp-json/wp/v2/posts?per_page=10&_fields=id,title,link,date,date_gmt,excerpt,featured_image_url',
        { agent: proxyAgent }).then(res => res.json()).then(data => {
        const formattedResponse = data.map(el => {
          return {
            title: el.title.rendered,
            link: el.link,
            contentSnippet: el.excerpt.rendered,
            enclosure: {
              url: el.featured_image_url,
            },
          }
        })
        resolve({ items: formattedResponse })
      }).catch(async err => {
        resolve({ items: [] })
        console.error('Error:', err)
        if (proxyObj) {
          console.log('should deactivate proxy')
          await this.db.update(proxy).set({ active: false }).where(eq(proxy.id, proxyObj.id))
        }
      })
    })
  }

  async fetchVijesti ({ providerId, providerName, rssUrl, existingPosts }, categoryList) {
    console.log(providerName)

    let feed = null
    switch (providerName) {
      case 'CDM':
        feed = await this.getCDMFeed(rssUrl)
        break
      case 'AntenaM':
        feed = await this.getAntenaMFeed(rssUrl)
        break
      default:
        feed = await this.parser.parseURL(rssUrl)
    }

    try {
      await this.processData({
        feed,
        providerId,
        providerName,
        existingPosts,
        categoryList,
      })
    } catch (e) {
      console.log(e)
    }
  }

  getRandomImage ({ categoryId, subcategoryId, categoryList }) {
    const idToSearch = subcategoryId > 0 ? subcategoryId : categoryId
    const category = categoryList.find(c => c.id === idToSearch)

    const randomImageNumber = getRandomNumber(1, category.imageSize)

    return `${randomImageNumber}`
  }

  async processData ({ feed, providerId, providerName, existingPosts, categoryList }) {

    for (const item of feed.items) {
      const linkHashed = stringToMD5(item.link)
      if (existingPosts.find(el => el.linkHashed === linkHashed)) {
        // console.log(`Skipping --> ${item.title}`)
        continue
      }

      const { category, subcategory, shortContent } = await extractCategoryAndSubcategory(providerName, item.link)

      const { categoryId, subcategoryId } = this.getCategoryMapping(
        category,
        subcategory,
        categoryList,
      )

      if(categoryId === null) {
        console.log("Skipping, no category")
        continue;
      }

      let subtitle = item.contentSnippet?.length > 5 ? item.contentSnippet : shortContent
      if (subtitle.length > 300) {
        subtitle = subtitle.substring(0, 300)
      }

      // const img = await this.getItemImage(providerName, item)
      const image = this.getRandomImage({ categoryId, subcategoryId, categoryList })

      await this.db.insert(posts).values({
        link: item.link,
        title: stripHtml(item.title).result,
        subtitle: stripHtml(subtitle).result,
        providerId: providerId,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
        linkHashed: linkHashed,
        image: image,
      }).onConflictDoUpdate({
        target: posts.linkHashed,
        set: {
          createdAt: sql`now
              ()`,
        },
      })

    }
  }

}

export default new RSSModule()

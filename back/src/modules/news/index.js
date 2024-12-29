import { posts } from '#database/schema/post.js'
import { providers } from '#database/schema/provider.js'
import { and, desc, eq, gte, ilike, notInArray, sql } from 'drizzle-orm'
import { categories } from '#database/schema/category.js'

import { RedisModule } from '#modules/redis/index.js'
import { alias } from 'drizzle-orm/pg-core'

class NewsModule {

  init (db) {
    this.db = db
    this.redis = new RedisModule()
    this.num = Math.random()
  }

  async getHomepage() {
    const homepageData = await this.redis.get("homepage")
    if(homepageData) {
      return JSON.parse(homepageData)
    }

    const popularNews = await this.getPopularNews(16);
    const popularNewsIds = popularNews.map(news => news.id);


    const vijesti = await this.getCategoryNews({ slug: '/vijesti', offset: 0 }, 4, popularNewsIds);
    const sport = await this.getCategoryNews({ slug: '/sport', offset: 0 }, 4, popularNewsIds);
    const tehnologija = await this.getCategoryNews({ slug: '/tehnologija', offset: 0 }, 4, popularNewsIds);
    const lifestyle = await this.getCategoryNews({ slug: '/lifestyle', offset: 0 }, 4, popularNewsIds);
    const showbiz = await this.getCategoryNews({ slug: '/showbiznis', offset: 0 }, 4, popularNewsIds);
    const biznis = await this.getCategoryNews({ slug: '/biznis', offset: 0 }, 4, popularNewsIds);

    const excludedIds = [
      ...popularNews.map(news => news.id),
      ...vijesti.map(news => news.id),
      ...sport.map(news => news.id),
      ...tehnologija.map(news => news.id),
      ...lifestyle.map(news => news.id),
      ...showbiz.map(news => news.id),
      ...biznis.map(news => news.id),
    ];

    const otherNews = await this.getOtherNews(excludedIds, 0, 20);

    const res = {
      popularSection: popularNews,
      categories: {
        vijesti: vijesti,
        sport: sport,
        tehnologija: tehnologija,
        lifestyle: lifestyle,
        showbiz: showbiz,
        biznis: biznis,
      },
      other: otherNews
    }

    this.redis.set('homepage', JSON.stringify(res, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ), 65);

    return res
  }

  async getOtherNews(excludedIds, offset = 0, limit = 20) {
    const subcategories = alias(categories, 'subcategories');

    const otherData = await this.db.select(
      {
        ...posts,
        createdAt: sql`EXTRACT(EPOCH FROM ${posts.createdAt})`.as('createdAt'),
        providerName: providers.name,
        categoryName: categories.name,
        subCategoryName: subcategories.name,
      }
    ).from(posts)
    .innerJoin(providers, eq(providers.id, posts.providerId))
    .innerJoin(categories, eq(categories.id, posts.categoryId))
    .leftJoin(subcategories, eq(subcategories.id, posts.subcategoryId))
    .where(notInArray(posts.id, excludedIds))
    .orderBy(desc(posts.createdAt))
    .offset(offset)
    .limit(limit);

    return otherData;
  }

  async getPopularNews(limit = 16) {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const subcategories = alias(categories, 'subcategories');

    const popularData = await this.db.select(
      {
        ...posts,
        createdAt: sql`EXTRACT(EPOCH FROM ${posts.createdAt})`.as('createdAt'),
        providerName: providers.name,
        categoryName: categories.name,
        subCategoryName: subcategories.name,
        popularityScore: sql`(LOG(1 + ${posts.clickCount}) + 1) - ((EXTRACT(EPOCH FROM now() - ${posts.createdAt}) / 3600) * 0.02)`.as('popularityScore'),
      }
    ).from(posts)
    .leftJoin(providers, eq(providers.id, posts.providerId))
    .leftJoin(categories, eq(categories.id, posts.categoryId))
    .leftJoin(subcategories, eq(subcategories.id, posts.subcategoryId))
    .where(gte(posts.createdAt, oneDayAgo)) // Filter for news created in the last 24 hours
      .orderBy(desc(sql`(LOG(1 + ${posts.clickCount}) + 1) - ((EXTRACT(EPOCH FROM now() - ${posts.createdAt}) / 3600) * 0.02)`))
      .limit(limit);

    // console.log(popularData)
    return popularData;
  }

  async getProviderNews({ slug, offset}) {

    console.log('fetching')
    const postData = await this.db.select(
      {
        ...posts,
        providerName: providers.name
      }
    ).from(posts)
      .innerJoin(providers, eq(providers.id, posts.providerId))
      .where(eq(providers.slug, slug))
      .offset(offset)
      .limit(20)
      .orderBy(desc(posts.createdAt))

    return postData
  }

  async getCategoryNews ({ slug, offset}, limit = 20, excludedIds = [-1]) {
    const subcategories = alias(categories, 'subcategories');

    const postData = await this.db.select(
      {
        ...posts,
        createdAt: sql`EXTRACT(EPOCH FROM ${posts.createdAt})`.as('createdAt'),
        providerName: providers.name,
        categoryName: categories.name,
        subCategoryName: subcategories.name,
      }
    ).from(posts)
    .innerJoin(providers, eq(providers.id, posts.providerId))
    .innerJoin(categories, eq(categories.id, posts.categoryId))
    .leftJoin(subcategories, eq(subcategories.id, posts.subcategoryId))
    .where(and(
      eq(categories.slug, slug),
      notInArray(posts.id, excludedIds)
    ))
    .offset(offset)
    .limit(limit)
    .orderBy(desc(posts.createdAt))

    return postData
  }

  async getSubcategoryNews ({ slug, offset}) {
    const subcategories = alias(categories, 'subcategories');

    const postData = await this.db.select(
      {
        ...posts,
        providerName: providers.name,
        categoryName: categories.name,
        subCategoryName: subcategories.name,
      }
    ).from(posts)
    .innerJoin(providers, eq(providers.id, posts.providerId))
    .innerJoin(categories, eq(categories.id, posts.categoryId))
    .innerJoin(subcategories, eq(subcategories.id, posts.subcategoryId))
    .where(eq(subcategories.slug, slug))
    .offset(offset)
    .limit(20)
    .orderBy(desc(posts.createdAt))


    return postData
  }

  async getSearchNews ({query, offset }) {
    const postData = await this.db.select(
      {
        ...posts,
        providerName: providers.name
      }
    ).from(posts)
    .innerJoin(providers, eq(providers.id, posts.providerId))
    .innerJoin(categories, eq(categories.id, posts.categoryId))
    .where(ilike(posts.title, `%${query}%` ))
    .offset(offset)
    .limit(20)
    .orderBy(desc(posts.createdAt))

    return postData
  }

  async trackClick (id) {
    // todo refactor

    console.log(id)

    await this.db.execute(sql`UPDATE "posts" SET "clickCount" = "clickCount" + 1 WHERE id =  ${id}`)

  }

  async test() {
    console.log('test')
    console.log(this.num)
  }
}

export default new NewsModule()

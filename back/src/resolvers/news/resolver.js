import newsModule from '#modules/news/index.js'

const newsResolvers = {
  Query: {
    getProviderNews: (_, { input }) => newsModule.getProviderNews(input),
    getCategoryNews: (_, { input }) => newsModule.getCategoryNews(input),
    getSubcategoryNews: (_, { input }) => newsModule.getSubcategoryNews(input),
    searchNews: (_, { input }) => newsModule.getSearchNews(input),
    getHomepage: () => newsModule.getHomepage(),
    getHomepageMoreNews: (_, { input }) => newsModule.getOtherNews(input.excludedIds, input.offset, 20),
  },
  Mutation: {
    clickPost: (_, { id }) => newsModule.trackClick(id),
  },
}

export default newsResolvers

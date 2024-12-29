const newsSchema = `
  type Query {
    getProviderNews(input: ProviderNewsInput!): [PostType]
    getCategoryNews(input: ProviderNewsInput!): [PostType]
    getSubcategoryNews(input: ProviderNewsInput!): [PostType]
    searchNews(input: SearchInput!): [PostType]
    getHomepage: HomepageType
    getHomepageMoreNews(input: HomepageMoreNewsInput!): [PostType]
  }
  
  type Mutation {
    clickPost(id: ID): Boolean
  }
  
  input HomepageMoreNewsInput { 
    excludedIds: [Int]
    offset: Int
  }
  
  type PostType {
    id: ID
    link: String
    title: String
    subtitle: String
    createdAt: Float
    providerName: String
    categoryName: String
    subCategoryName: String
    image: String
  }
  
  input ProviderNewsInput {
    slug: String!
    offset: Int!
  }
  
  input SearchInput {
    query: String!
    offset: Int!
  }
  
  type HomepageCategory {
    vijesti: [PostType]
    sport: [PostType]
    tehnologija: [PostType]
    lifestyle: [PostType]
    showbiz: [PostType]
    biznis: [PostType]
  }
  
  type HomepageType {
    popularSection: [PostType]
    categories: HomepageCategory!
    other: [PostType]
  }
`

export default newsSchema

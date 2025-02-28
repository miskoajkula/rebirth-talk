const postsSchema = `
  extend type Query {
    getPostsByUser(username: String!, pagination: PaginationInput!): Boolean @isAuth(role: "user")
  }
  
  extend type Mutation {
   test: String
  }
  
  type PostType {
    id: ID!
    name: String!
  }
`

export default postsSchema

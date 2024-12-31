const newsSchema = `
  type Query {
    checkAccount(email: String!): CheckAccount!
  }
  
  type Mutation {
    clickPost(id: ID): Boolean
  }
  
  type CheckAccount {
    userExists: Boolean
    socialAuth: Boolean
  }
`

export default newsSchema

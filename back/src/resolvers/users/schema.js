const newsSchema = `
  type Query {
    checkAccount(email: String!): CheckAccount!
  }
  
  type Mutation {
    clickPost(id: ID): Boolean
    registerViaEmail(payload: EmailRegisterInput!): Boolean
  }
  
  type CheckAccount {
    userExists: Boolean
    socialAuth: Boolean
  }
  
  input EmailRegisterInput {
    email: String!
    password: String!
  }
`

export default newsSchema

const newsSchema = `
  type Query {
    checkAccount(email: String!): CheckAccount!
  }
  
  type Mutation {
    clickPost(id: ID): Boolean
    createAccountWithEmail(payload: EmailRegisterInput!): Boolean
    authenticateWithEmail(payload: EmailRegisterInput!): AuthUser
    authenticateWithSocial(token: String!): AuthUser
    requestPasswordReset(email: String!): Boolean
  }
  
  type CheckAccount {
    userExists: Boolean
    socialAuth: Boolean
  }
  
  input EmailRegisterInput {
    email: String!
    password: String!
  }
  
  
  type AuthUser {
    token: String!
    userInfo: UserInfo
  }
  
  type UserInfo {
    email: String!
    createdAt: String!
  }

`

export default newsSchema

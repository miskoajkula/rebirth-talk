const schema = `
  directive @isAuth(role:String) on FIELD_DEFINITION

  extend type Query {
    checkAccount(email: String!): CheckAccount!
  }
  
  extend type Mutation {
    clickPost(id: ID): Boolean
    createAccountWithEmail(payload: EmailRegisterInput!): Boolean
    authenticateWithEmail(payload: EmailRegisterInput!): AuthUser
    authenticateWithSocial(token: String!): AuthUser
    requestPasswordReset(email: String!): Boolean
    updateProfile(payload: UpdateProfileInput!): Boolean @isAuth(role: "user")
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
    avatar: AvatarType
    username: String
    socialAuth: Boolean
  }
  
  type AvatarType {
    colors: [String!]!
    name: String!
  }
  
  input AvatarInput {
    colors: [String!]!
    name: String!
  }
  
  input UpdateProfileInput {
    username: String
    avatar: AvatarInput
    communities: [String!]
  }

`

export default schema

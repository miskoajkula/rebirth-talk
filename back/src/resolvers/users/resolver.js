import userModule from '#modules/user/index.js'

const newsResolvers = {
  Query: {
    checkAccount: (_, { email }) => userModule.checkAccount(email),
  },
  Mutation: {
    clickPost: (_, { id }) => userModule.checkAccount(id),
    registerViaEmail: (_, { payload }) => userModule.registerViaEmail(payload),
  },
}

export default newsResolvers

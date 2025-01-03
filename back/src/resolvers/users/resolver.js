import userModule from '#modules/user/index.js'

const newsResolvers = {
  Query: {
    checkAccount: (_, { email }) => userModule.checkAccount(email),
  },
  Mutation: {
    createAccountWithEmail: (_, { payload }) => userModule.registerViaEmail(payload),
    authenticateWithEmail: (_, { payload }) => userModule.loginViaEmail(payload),
    authenticateWithSocial: (_, { token }) => userModule.socialLogin(token),
    requestPasswordReset: (_, { email }) => userModule.requestPasswordReset(email),
  },
}

export default newsResolvers

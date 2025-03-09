import postModule from '#modules/post/index.js'

const resolver = {
  Query: {
    getPostsByUser: (_, { username, pagination }, ___) => postModule.getPostsByUsername({ username, pagination }),
  },
  Mutation: {
    test: () => {
      console.log('k');
      return "ok"
    }
  }
}

export default resolver

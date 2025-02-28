import postModule from '#modules/post/index.js'

const resolver = {
  Query: {
    getPostsByUser: (_, { username, pagination }, ___) => {
      console.log('getPostsByUser resolver called');
      return postModule.getPostsByUsername({ username, pagination });
    },
    // getPostsByUser: (_, { username, pagination }, ___) => postsModule.getPostsByUsername({ username, pagination }),
  },
  Mutation: {
    test: () => {
      console.log('k');
      return "ok"
    }
  }
}

export default resolver

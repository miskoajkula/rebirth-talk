import commonModule from "#modules/common/index.js";

const resolvers = {
  Query: {
    _empty: () => "_",
    getConfig: (_, __, ___) => commonModule.getConfig(),
  },
  Mutation: {
    _empty: () => "_"
  },
};

export  default resolvers

import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ruruHTML } from 'ruru/server';
import { resolvers, schemas } from './resolvers/index.js';
import initializeModules from './modules/index.js'
import cors from 'cors'
import path from 'path'

import { fileURLToPath } from 'url';
import { authMiddleware } from './interceptors/middleware/index.js'
import { isAuthenticatedDirectiveTransformer } from './interceptors/directives/auth.js'

import getDbInstance from '#database/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const mergedResolvers = {
  Query: {},
  Mutation: {}
};

resolvers.forEach(resolver => {
  if (resolver.Query) {
    mergedResolvers.Query = { ...mergedResolvers.Query, ...resolver.Query };
  }
  if (resolver.Mutation) {
    mergedResolvers.Mutation = { ...mergedResolvers.Mutation, ...resolver.Mutation };
  }
});

let mergedSchema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: mergedResolvers
});

mergedSchema = isAuthenticatedDirectiveTransformer(mergedSchema);

const app = express();

async function startServer() {
  try {
    const db = await getDbInstance();
    await initializeModules(db);

    app.use(cors({
      origin: '*', // or '*' to allow any origin
    }));

    app.use('/images', express.static(path.join(__dirname,'../images')));

    app.all(
      "/graphql",
      authMiddleware(db),
      createHandler({
        schema: mergedSchema,
        context: ({ raw }) => {
          return { user: raw.user };
        },
      })
    );

    app.get("/", (_req, res) => {
      res.type("html");
      res.end(ruruHTML({ endpoint: "/graphql" }));
    });

    app.listen(4000, () => {
      console.log("Running a GraphQL API server at http://localhost:4000/graphql");
    });

  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1); // Exit the process with failure
  }
}

startServer();

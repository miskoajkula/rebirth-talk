import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ruruHTML } from 'ruru/server';
import { resolvers, schemas } from './resolvers/index.js';
import initializeModules from './modules/index.js'
import cors from 'cors'
import path from 'path'

import { fileURLToPath } from 'url';  // Import fileURLToPath from url module

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const mergedSchema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: resolvers.reduce((acc, resolver) => ({ ...acc, ...resolver }), {})
});

const app = express();

async function startServer() {
  try {
    // Connect to the database
    await initializeModules();

    app.use(cors({
      origin: '*', // or '*' to allow any origin
    }));

    app.use('/images', express.static(path.join(__dirname,'../images')));

    // Create and use the GraphQL handler.
    app.all(
      "/graphql",
      createHandler({
        schema: mergedSchema,
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

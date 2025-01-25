import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolvers = [];
const schemas = [];

const resolverDirs = fs.readdirSync(__dirname).filter(file => {
  const filePath = path.join(__dirname, file);
  return fs.statSync(filePath).isDirectory();
});

for (const dir of resolverDirs) {
  const resolverPath = path.join(__dirname, dir, 'resolver.js');
  const schemaPath = path.join(__dirname, dir, 'schema.js');

  if (fs.existsSync(resolverPath) && fs.existsSync(schemaPath)) {
    const resolverModule = await import(`./${dir}/resolver.js`);
    const schemaModule = await import(`./${dir}/schema.js`);

    resolvers.push(resolverModule.default);
    schemas.push(schemaModule.default);
  }
}

export { resolvers, schemas };

import pkg from 'pg';
const { Client } = pkg;
import { drizzle } from "drizzle-orm/node-postgres";

// Database configuration
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Create and initialize a singleton instance for the database
let dbInstancePromise = null;

const initializeDb = async () => {
  await client.connect();
  const dbInstance = drizzle(client, { logger: false });
  console.log('Database connected successfully');
  return dbInstance;
};

dbInstancePromise = initializeDb();

const getDbInstance = () => {
  return dbInstancePromise;
};

export default getDbInstance;

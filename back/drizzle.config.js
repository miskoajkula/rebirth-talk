import dotenv from 'dotenv';
dotenv.config()

import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: './src/database/schema/*.js',
  out: './src/database/migrations',
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: '5432',
    ssl: false,
  }
})


import "reflect-metadata";
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './router';
import { AppDataSource } from './database/connection';

// SETUP //

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
AppDataSource.initialize().then(() => console.log('connected')).catch((error) => console.log(error))

// API //

app.use(express.json());
app.use(routes)

// LISTEN //

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

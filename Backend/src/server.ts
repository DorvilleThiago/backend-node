import "reflect-metadata";
import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import { AppDataSource } from './database/connection';
import AppError from "./errors/AppError";
import routes from './router';

// SETUP //

const app: Express = express();
const port = process.env.PORT;
AppDataSource.initialize().then(() => console.log('connected')).catch((error) => console.log(error))

// API //

app.use(express.json());
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "Error",
      message: err.message
    })
  } 

  return response.status(500).json({
    status: "Error",
    message: "Internal Server Error",
    details: err.message
  })

})

// LISTEN //

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

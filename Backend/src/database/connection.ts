import "reflect-metadata";
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Adress } from "../entities/Adress";


dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "horton.db.elephantsql.com",
    port: 5432,
    username: "wzupdkwi",
    password: process.env.DB_PASSWORD,
    database: "wzupdkwi",
    synchronize: true,
    logging: false,
    entities: [User, Adress],
    subscribers: [],
    migrations: [],
})
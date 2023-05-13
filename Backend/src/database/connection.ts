import "reflect-metadata";
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Adress } from "../entities/Adress";
import { Pedido } from "../entities/Pedido";


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
    entities: [User, Adress, Pedido],
    subscribers: [],
    migrations: [],
})
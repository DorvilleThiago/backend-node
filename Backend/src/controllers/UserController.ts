import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";

class UserController{

    async index(req:Request, res:Response) { 
        const users = await UserRepository.index();
        res.json(users)
    }

    async create(req:Request, res:Response) {
        const { username, email, password, adress, phoneNumber } = req.body;

        //Verificando se já existe no banco de dados
        const alreadyThere = await UserRepository.findOneByEmail(email);
        if (alreadyThere) {
            res.status(400).json({ error: "User already exists" })
            return;
        }

        const id = randomUUID()
        await UserRepository.create({ id, username, email, password, adress, phoneNumber });
        res.status(201).json()
    }

    async delete(req: Request, res: Response) { 
        const { id } = req.body; 
        await UserRepository.delete(id)
        res.status(204).json()
    }

    async deleteAll(req: Request, res: Response) { 
        await UserRepository.deleteAll()
        res.status(201).json()
    }

}
export default new UserController()
import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";

class UserController{

    async index(req:Request, res:Response) { 
        const users = await UserRepository.index();
        users ? res.json(users) : res.status(401)
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
        const query = await UserRepository.create({ id, username, email, password, adress, phoneNumber });
        query ? res.status(201).json() : res.status(400).json()
    }

    async delete(req: Request, res: Response) { 
        const { id } = req.body; 
        const query = await UserRepository.delete(id)
        query ? res.status(204).json() : res.status(400).json();
    }

    async deleteAll(req: Request, res: Response) { 
        const query = await UserRepository.deleteAll()
        query ? res.status(201).json() : res.status(400).json()
    }

}
export default new UserController()
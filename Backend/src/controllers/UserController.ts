import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import AppError from "../errors/AppError";

class UserController{

    async index(req:Request, res:Response) { 
        const users = await UserRepository.index();
        users ? res.json(users) : res.status(401)
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await UserRepository.findOneByEmail(email)
        if (user) {
            if (user.password = password) {
                return res.status(200).json({
                    message: "Logado com sucesso!"
                })
            } else {
                return res.status(401).json({
                    message: "Senha inválida"
                })
            }
        } else {
            return res.status(401).json({
                message: "Email inválido"
            })
        }
     }

    async create(req:Request, res:Response) {
        const { username, email, password, adress, phoneNumber } = req.body;
        //Verificando se já existe no banco de dados
        const alreadyThere = await UserRepository.findOneByEmail(email);
        if (alreadyThere) { 
            throw new AppError('User already exists')
        }
        const id = randomUUID()
        await UserRepository.create({ id, username, email, password, adress, phoneNumber, pedidos: [] });
        return res.status(201).json()
    }

    async delete(req: Request, res: Response) { 
        const { id } = req.body; 
        await UserRepository.delete(id)
        return res.status(204).json()
    }

    async deleteAll(req: Request, res: Response) { 
        const query = await UserRepository.deleteAll()
        return res.status(201).json()
    }

}
export default UserController
import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import AppError from "../errors/AppError";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{

    async index(req:Request, res:Response) { 
        const users = await UserRepository.index();
        users ? res.json(users) : res.status(401)
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await UserRepository.findOneByEmail(email)
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { user_id: user.id, email },
                    process.env.TOKEN_KEY,
                    {
                      expiresIn: "2h",
                    }
                );
                user.token = token;
                UserRepository.update(user);
                return res.json(user)
            } else {
                return res.status(401).json({error: 'Wrong password'})
            }
        } else {
            return res.status(401).json({
                message: "Invalid email"
            })
        }
     }

    async create(req: Request, res: Response) {
        let { username, email, password, adress, phoneNumber } = req.body;
        password = await bcrypt.hash(password, 10);
        //Verificando se já existe no banco de dados
        const alreadyThere = await UserRepository.findOneByEmail(email);
        if (alreadyThere) { 
            throw new AppError('User already exists')
        }   
        const id = randomUUID()
        const token = jwt.sign(
            { user_id: id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
        );
        const newUser = await UserRepository.create({ id, username, email, password, adress, phoneNumber, token });
        return res.status(201).json({ token })
    }

    async delete(req: Request, res: Response) { 
        const { id } = req.body; 
        await UserRepository.delete(id)
        return res.status(204).json()
    }

    async deleteAll(req: Request, res: Response) { 
        await UserRepository.deleteAll()
        return res.status(201).json()
    }

}
export default UserController
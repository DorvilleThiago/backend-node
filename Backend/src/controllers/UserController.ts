import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import AppError from "../errors/AppError";
import CaptchaRepository from "../repositories/CaptchaRepository";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



class UserController{

    async index(req:Request, res:Response) { 
        const users = await UserRepository.index();
        users ? res.json(users) : res.status(401)
    }

    async login(req: Request, res: Response) {
        const { email, password, captcha } = req.body;
        if (!email || !password || !captcha) {
            return res.status(400).send("All input is required");
        }
        if (!await CaptchaRepository.verifyCaptcha(captcha)) {
            return res.status(401).json({ message: "Invalid captcha" });
        }
        const user = await UserRepository.findOneByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const token = jwt.sign({ user_id: user.id, email, employee: user.admin }, process.env.TOKEN_KEY, {
            expiresIn: "1h",
        });

        return res.status(200).json({token: token}).send();
    }

    async validate(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            return res.status(200).json({ valid: true, employee: decoded.employee });
          } catch (error) {
            return res.status(401).json({ valid: false })
          }
    }

    async create(req: Request, res: Response) {
        let { username, email, password, adress, phoneNumber, captcha } = req.body;
        if (!email || !password || !captcha || !adress || !phoneNumber) {
            return res.status(400).send("All input is required");
        }
        if (!await CaptchaRepository.verifyCaptcha(captcha)) {
            return res.status(401).json({ message: "Invalid captcha" });
        }
        password = await bcrypt.hash(password, 10);
        const alreadyThere = await UserRepository.findOneByEmail(email);
        if (alreadyThere) { 
            throw new AppError('User already exists')
        }   
        const id = randomUUID()
        const token = jwt.sign(
            { user_id: id, email, employee: false },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
        );
        const newUser = await UserRepository.create({ id, username, email, password, adress, phoneNumber});
        return res.status(201).json({token: token}).send()
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
import { Request, Response } from "express";
import PedidoRepository from "../repositories/PedidoRepository";

class PedidoController {
 
    async index(req:Request, res:Response) {
        const pedidos = await PedidoRepository.index()
        return res.status(200).json(pedidos)
    }
    async create(req: Request, res: Response) {
        const { details, time, date, userId } = req.body
        await PedidoRepository.create({
            details, time, date, userId
        })
        return res.sendStatus(201)
    }

}

export default PedidoController;
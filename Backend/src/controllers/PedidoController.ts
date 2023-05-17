import { Request, Response } from "express";
import PedidoRepository from "../repositories/PedidoRepository";

class PedidoController {
 
    async index(req:Request, res:Response) {
        const pedidos = await PedidoRepository.index()
        return res.status(200).json(pedidos)
    }
    async create(req: Request, res: Response) {
        const { details, time, date, userId } = req.body
        const status = 'pendente'
        await PedidoRepository.create({
            details, time, date, userId, status
        })
        return res.sendStatus(201)
    }
    async deleteAll(req: Request, res: Response) { 
        await PedidoRepository.deleteAll()
        return res.status(201).json()
    }

}

export default PedidoController;
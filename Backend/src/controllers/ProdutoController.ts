import { Request, Response } from "express";
import ProdutoRepository from "../repositories/ProdutoRepository";
import { randomUUID } from "node:crypto";

class ProdutoController {
    async index(req: Request, res: Response) {
        const produtos = await ProdutoRepository.index()
        return res.status(200).json(produtos)
    }
    async create(req: Request, res: Response) { 
        const { nome, descricao, preco } = req.body
        const id = randomUUID()
        await ProdutoRepository.create({ id, nome, descricao, preco })
        return res.status(201).json()
    }
}
export default ProdutoController;
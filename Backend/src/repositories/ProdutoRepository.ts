import { AppDataSource } from '../database/connection';
import { Produto } from '../entities/Produto';
import AppError from '../errors/AppError';

const produtoDataSource = AppDataSource.getRepository(Produto)

class ProdutoRepository {

    async index() {
        try {
        const Produtos = await produtoDataSource.find({
        });
            return Produtos;
        } catch (err) {
            throw new AppError("Error getting the products from the database")
        }
    }

    async create({id, nome, preco, descricao}: Produto) {
        try {
            console.log({id, nome, preco, descricao})
            const produto = produtoDataSource.create({
                id,
                nome,
                preco,
                descricao
            })
            await produtoDataSource.save(produto);
        } catch (err) { 
            console.log(err)
            throw new AppError("Error creating Produto")
        }
    }

}
export default new ProdutoRepository()
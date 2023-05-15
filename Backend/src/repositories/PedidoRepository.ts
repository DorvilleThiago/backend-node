import { AppDataSource } from '../database/connection';
import { pedidoCreateDto } from '../dtos/pedidoCreateDto';
import { Pedido } from "../entities/Pedido";
import AppError from '../errors/AppError';

const pedidoDataSource = AppDataSource.getRepository(Pedido)

class PedidoRepository {

    async index() {
        try {
            const pedidos = await pedidoDataSource.find({})
            return pedidos;
        } catch (err) {
            throw new AppError("Error gettings orders from database")
        }
    }
    
    async create({details, time, date, userId }: pedidoCreateDto) {
        try {
            const pedido = pedidoDataSource.create({
                details,
                time,
                date,
                userId
            })
            await pedidoDataSource.save(pedido);
            return pedido;
        } catch (err) { 
            console.log(err)
            throw new AppError("Error in order")
        }
    }

}

export default new PedidoRepository()
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
    
    async create({details, time, date, userId, status }: pedidoCreateDto) {
        try {
            const pedido = pedidoDataSource.create({
                details,
                time,
                date,
                userId,
                status
            })
            await pedidoDataSource.save(pedido);
            return pedido;
        } catch (err) { 
            console.log(err)
            throw new AppError("Error in order")
        }
    }
    
    async deleteAll() {
        try {
            await pedidoDataSource.delete({})
        } catch (err) {
            throw new AppError("Error in deleting all orders")
        }
    }

}

export default new PedidoRepository()
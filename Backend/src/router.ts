import { Router } from "express";
import UserController from "./controllers/UserController";
import PedidoController from "./controllers/PedidoController";

const userController = new UserController();
const pedidoController = new PedidoController();

const routes = Router()

routes.get('/user', userController.index)
routes.post('/user', userController.create)
routes.delete('/user', userController.delete)

routes.get('/pedido', pedidoController.index)
routes.post('/pedido', pedidoController.create)

routes.get('/deleteall', userController.deleteAll)


export default routes;
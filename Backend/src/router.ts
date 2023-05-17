import { Router } from "express";
import UserController from "./controllers/UserController";
import PedidoController from "./controllers/PedidoController";
import ProdutoController from "./controllers/ProdutoController";

const userController = new UserController();
const pedidoController = new PedidoController();
const produtoController = new ProdutoController();

const routes = Router()

routes.get('/user', userController.index)
routes.post('/user', userController.create)
routes.delete('/user', userController.delete)

routes.post('/login', userController.login)

routes.get('/pedido', pedidoController.index)
routes.post('/pedido', pedidoController.create)

routes.get('/produto', produtoController.index)
routes.post('/produto', produtoController.create)

routes.get('/deleteallusers', userController.deleteAll)
routes.get('/deleteallorders', pedidoController.deleteAll)

export default routes;
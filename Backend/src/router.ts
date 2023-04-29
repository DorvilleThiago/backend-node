import { Router } from "express";
import UserController from "./controllers/UserController";


const routes = Router()

routes.get('/user', UserController.index)
routes.post('/user', UserController.create)
routes.delete('/user', UserController.delete)

routes.get('/deleteall', UserController.deleteAll)


export default routes;
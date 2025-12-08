import { Router } from "express";
import { ClienteController } from "../controller/clientecontroller";

const routerCliente = Router();
const controller = new ClienteController();

routerCliente.get("/cliente", controller.list);
routerCliente.get("/cliente:id", controller.find);
routerCliente.post("/cliente", controller.create);
routerCliente.put("/cliente:id", controller.update);
routerCliente.delete("/cliente:id", controller.delete);
export default routerCliente;
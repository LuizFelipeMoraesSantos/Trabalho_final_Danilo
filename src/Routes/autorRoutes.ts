import { Router } from "express";
import { AutorController } from "../controller/autorController";

const routerAutor = Router();
const controller = new AutorController();

routerAutor.get("/autor", controller.list);
routerAutor.get("/autor:id", controller.find);
routerAutor.post("/autor", controller.create);
routerAutor.put("/autor:id", controller.update);
routerAutor.delete("/autor:id", controller.delete);
export default routerAutor;
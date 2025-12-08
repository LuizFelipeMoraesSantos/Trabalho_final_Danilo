import { Router } from "express";
import { LivroController } from "../controller/livroController";

const routerLivro = Router();
const controller = new LivroController();

routerLivro.get("/livros", controller.list);
routerLivro.get("/livros:id", controller.find);
routerLivro.post("/livros", controller.create);
routerLivro.put("/livros:id", controller.update);
routerLivro.delete("/livros:id", controller.delete);

export default routerLivro;
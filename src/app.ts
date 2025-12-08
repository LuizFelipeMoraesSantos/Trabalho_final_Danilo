import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routerAutor from "./Routes/autorRoutes";
import routerCliente from "./Routes/clienteRoutes";
import routerLivro from "./Routes/livroRoutes";

const HOST = process.env.HOST || "0.0.0.0";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/autor", routerAutor);
app.use("/api/cliente", routerCliente);
app.use("/api/livro", routerLivro);

AppDataSource.initialize().then(() => {
  console.log("Banco conectado!");

  app.listen(3000, () => {
    console.log(`Servidor rodando em http://${HOST}:3000`);
  });
});
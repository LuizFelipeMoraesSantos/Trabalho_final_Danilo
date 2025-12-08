import "reflect-metadata";
import { DataSource } from "typeorm";
import {Autor} from "./entities/Autor";
import {Livro} from "./entities/Livro";
import {Cliente} from "./entities/Cliente";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "biblioteca",
  synchronize: true,
  logging: false,
  entities: [Autor, Livro, Cliente],
}
);
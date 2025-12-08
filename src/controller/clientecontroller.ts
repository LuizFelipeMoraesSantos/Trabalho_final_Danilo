import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import {Cliente} from "../entities/Cliente";


export class ClienteController {
  private repo = AppDataSource.getRepository(Cliente);

  list = async (_req: Request, res: Response) => {
    const clientes = await this.repo.find();
    return res.json(clientes);
  };

  find = async (req: Request, res: Response) => {
    const cliente = await this.repo.findOneBy({ id: Number(req.params.id) });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente not found" });
    }

    return res.json(cliente);
  };

  create = async (req: Request, res: Response) => {
    const cliente = this.repo.create(req.body);
    await this.repo.save(cliente);
    return res.json(cliente);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const cliente = await this.repo.findOneBy({ id });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente not found" });
    }

    this.repo.merge(cliente, req.body);
    const result = await this.repo.save(cliente);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const cliente = await this.repo.findOneBy({ id });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente not found" });
    }

    await this.repo.delete(id);
    return res.json({ message: "Deleted successfully" });
  };
}
import { Autor } from './../entities/Autor';
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";



export class AutorController {
  private repo = AppDataSource.getRepository(Autor);
  list = async (_req: Request, res: Response) => {
    const autores = await this.repo.find();
    return res.json(autores);
  };

  find = async (req: Request, res: Response) => {
    const autor = await this.repo.findOneBy({ id: Number(req.params.id) });
    if (!autor) {
      return res.status(404).json({ error: "Autor not found" });
    }

    return res.json(autor);
  };

  create = async (req: Request, res: Response) => {
    const autor = this.repo.create(req.body);
    await this.repo.save(autor);
    return res.json(autor);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const autor = await this.repo.findOneBy({ id });

    if (!autor) {
      return res.status(404).json({ error: "Autor not found" });
    }

    this.repo.merge(autor, req.body);
    const result = await this.repo.save(autor);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const autor = await this.repo.findOneBy({ id });

    if (!autor) {
      return res.status(404).json({ error: "Autor not found" });
    }

    await this.repo.delete(id);
    return res.json({ message: "Deleted successfully" });
  };
}
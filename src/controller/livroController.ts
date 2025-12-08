import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import {Livro} from "../entities/Livro";


export class LivroController {
  private repo = AppDataSource.getRepository(Livro);
  list = async (_req: Request, res: Response) => {
    const livros = await this.repo.find();
    return res.json(livros);
  };

  find = async (req: Request, res: Response) => {
    const livro = await this.repo.findOneBy({ id: Number(req.params.id) });
    if (!livro) {
      return res.status(404).json({ error: "Livro not found" });
    }

    return res.json(livro);
  };

  create = async (req: Request, res: Response) => {
    const livro = this.repo.create(req.body);
    await this.repo.save(livro);
    return res.json(livro);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const livro = await this.repo.findOneBy({ id });

    if (!livro) {
      return res.status(404).json({ error: "Livro not found" });
    }

    this.repo.merge(livro, req.body);
    const result = await this.repo.save(livro);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const livro = await this.repo.findOneBy({ id });

    if (!livro) {
      return res.status(404).json({ error: "Livro not found" });
    }

    await this.repo.delete(id);
    return res.json({ message: "Deleted successfully" });
  };
}
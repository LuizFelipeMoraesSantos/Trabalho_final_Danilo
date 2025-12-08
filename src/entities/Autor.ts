import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  nacionalidade!: string;

  @Column()
  dataNascimento!: string;
}
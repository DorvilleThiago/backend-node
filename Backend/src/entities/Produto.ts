import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Produto {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nome!: string;

    @Column()
    preco!: number;

    @Column()
    descricao!: string;
}
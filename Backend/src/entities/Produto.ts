import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Produto {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nome!: number;

    @Column()
    preco!: string;

    @Column()
    descricao!: string;
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Adress {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    cep!: number;

    @Column()
    cidade!: string;

    @Column()
    bairro!: string;

    @Column()
    rua!: string;

    @Column()
    numero!: string;

    @Column()
    referência!: string;

}
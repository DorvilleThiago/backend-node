import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Adress {

    @PrimaryGeneratedColumn("uuid")
    user_id!: string;

    @Column()
    cep!: string;

    @Column()
    cidade!: string;

    @Column()
    bairro!: string;

    @Column()
    rua!: string;

    @Column()
    numero!: string;

    @Column()
    referencia!: string;

}
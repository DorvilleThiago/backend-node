import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Adress } from "./Adress";
import { User } from "./User";

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true})
    userId!: string;

    @Column()
    details!: string;
    
    @Column()
    time!: string;

    @Column()
    date!: string;

    @Column()
    status!: string;

}
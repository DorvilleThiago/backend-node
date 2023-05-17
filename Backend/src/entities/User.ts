import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, OneToMany } from "typeorm"
import { Adress } from "./Adress";
import { Pedido } from "./Pedido";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    username!: string;

    @Column({unique: true})
    email!: string;
    
    @Column()
    password!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    token!: string;
}
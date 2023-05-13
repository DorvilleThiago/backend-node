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

    @OneToOne(() => Adress)
    @JoinColumn()
    adress!: Adress;

    @OneToMany(() => Pedido, (pedido) => pedido.user)
    pedidos!: Pedido[];

    @Column()
    phoneNumber!: string;
}
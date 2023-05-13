import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Adress } from "./Adress";
import { User } from "./User";

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: string;

    @Column()
    details!: string;
    
    @Column()
    time!: string;

    @Column()
    date!: string;

    @ManyToOne(() => User, (user) => user.pedidos)
    @JoinColumn({
        name: "userId"
    })
    user!: User

}
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm"
import { Adress } from "./Adress";

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

    @Column()
    phoneNumber!: string;
}
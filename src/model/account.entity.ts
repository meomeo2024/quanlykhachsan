import { RoleID } from "../interface/account.interface";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";

@Entity({ name: 'account' })
export class Account {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    fullName: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    role: RoleID;

    @Column()
    active: boolean;

    @ManyToMany(() => Area) // Using for Le Tan (LT will work on the block of building)
    @JoinTable()
    areas?: Area[];
}
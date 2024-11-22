import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity({name: 'role'})
export class Role {
    @PrimaryColumn()
    Id: string;

    @Column()
    name: string;

}
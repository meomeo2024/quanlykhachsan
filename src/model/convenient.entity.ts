import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'convenient'})
export class Convenient {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    name: string;
}
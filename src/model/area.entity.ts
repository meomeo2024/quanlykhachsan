import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity({name: 'area'})
export class Area {
    @PrimaryColumn()
    Id: string;

    @Column()
    name: string;

    @OneToMany(type => Room, room => room.area)
    room: Room
}
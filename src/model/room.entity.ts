import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";
import { RoomType } from "./roomType.entity";

@Entity({name: 'room'})
export class Room {
    @PrimaryColumn()
    Id: string;

    @PrimaryColumn()
    room: string;

    @Column({nullable: true})
    areaId: string;

    @ManyToOne(type => Area, area => area.Id) @JoinColumn()
    area: Area;

    @Column({nullable: true})
    typeId: string;

    @ManyToOne(type => RoomType, type => type.Id) @JoinColumn()
    type: RoomType;

    @Column()
    isAvailable: boolean;
}
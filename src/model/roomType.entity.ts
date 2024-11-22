import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Convenient } from "./convenient.entity";

@Entity({ name: 'roomType' })
export class RoomType {
    @PrimaryColumn()
    Id: string;

    @Column()
    name: string;

    @ManyToMany(() => Convenient) 
    @JoinTable()
    convenients?: Convenient[];

    @Column()
    price: number;

    @Column()
    maxUser: number;

}
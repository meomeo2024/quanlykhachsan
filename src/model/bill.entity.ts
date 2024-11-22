import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Renter } from "./renter.entity";
import { Room } from "./room.entity";

@Entity({ name: 'bill' })
export class Bill {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column({ nullable: true })
    roomId: string;

    @OneToOne(() => Room, room => room.Id) @JoinColumn()
    room: Room;

    @Column()
    inDay: Date;

    @Column()
    outDay: Date;

    @ManyToMany(() => Renter) 
    @JoinTable()
    renters?: Renter[];

    @Column()
    total: Number;

    @Column({nullable: true})
    note: string;

}
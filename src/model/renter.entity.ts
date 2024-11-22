import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'renter' })
export class Renter {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    identifyCard: string;
}
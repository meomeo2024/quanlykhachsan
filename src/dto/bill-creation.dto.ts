import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BillCreationDto{
    @IsNotEmpty()
    @IsString()
    roomId: string;

    @IsNotEmpty()
    @IsString()
    inDay: string;

    @IsNotEmpty()
    @IsString()
    outDay: string;

    @IsNotEmpty()
    @IsArray()
    renters: string[];

    @IsOptional()
    @IsString()
    note: string;

    constructor(roomId: string, inDay: string, outDay: string, renters: string[], note: string){
        this.roomId = roomId;
        this.inDay = inDay;
        this.outDay = outDay;
        this.note = note;
        this.renters = renters;
    }
}
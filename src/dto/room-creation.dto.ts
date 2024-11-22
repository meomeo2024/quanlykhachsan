import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class RoomCreationDto{
    @IsNotEmpty()
    @IsEnum(['A','B','C'])
    area: string;

    @IsNotEmpty()
    @IsEnum(['VP1','VP2','VP3'])
    typeRoom: string;

    @IsNotEmpty()
    @IsString()
    room: string

    constructor(area: string, type: string, room: string){
        this.area = area;
        this.typeRoom = type;
        this.room = room;
    }
}
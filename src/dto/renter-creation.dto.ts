import { IsNotEmpty, IsString } from "class-validator";

export class RenterCreationDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    identifyCard: string;

    constructor(name: string, identifyCard: string){
        this.fullName = name;
        this.identifyCard = identifyCard;
    }
}
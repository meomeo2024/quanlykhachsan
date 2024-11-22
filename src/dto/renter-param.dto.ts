import { IsOptional, IsString } from "class-validator";

export class RenterParamDto {
    @IsOptional()
    @IsString()
    search: string;

    constructor(search: string){
        this.search = search;
    }
}
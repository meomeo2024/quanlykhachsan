import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class RoomParamsDto {
    @IsOptional()
    @IsBoolean()
    isAvailable: boolean;

    @IsOptional()
    // @IsNumberString()
    @Type(() => Number)
    @IsInt()
    people: number;

    @IsOptional()
    // @IsNumberString()
    @Type(() => Number)
    @IsInt()
    minPrice: number;

    @IsOptional()
    // @IsNumberString()
    @Type(() => Number)
    @IsInt()
    maxPrice: number;

    constructor(isAvailble: boolean, people: number, minPrice: number, maxPrice: number) {
        this.isAvailable = isAvailble;
        this.people = people;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

}
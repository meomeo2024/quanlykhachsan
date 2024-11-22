import { IsEnum, IsOptional, IsString } from "class-validator";
import { AreaDefault, BillReport } from "../interface/room.interface";

export class BillFilterDto{
    @IsOptional()
    @IsEnum(BillReport)
    filter: BillReport;

    @IsOptional()
    @IsString()
    month: string;

    @IsOptional()
    @IsString()
    year: string;

    @IsOptional()
    @IsEnum(AreaDefault)
    area: AreaDefault

    constructor(filter: BillReport, month: string, year: string, area: AreaDefault){
        this.filter = filter;
        this.month = month;
        this.year = year;
        this.area = area;
    }
}
import { Like, Or } from "typeorm";
import { AppDataSource } from "../database";
import { Renter } from "../model/renter.entity";

export class RenterService {
    static async insertRenter(payload: any): Promise<boolean> {
        try {
            console.log(`${RenterService.name} - insertRenter - started`);
            const renterRepository = await AppDataSource.getRepository(Renter);
            const renter = new Renter();
            renter.fullName = payload?.fullName;
            renter.identifyCard = payload?.identifyCard;
            await renterRepository.save(renter);
            return true;
        } catch (error) {
            console.error(`${RenterService.name} - insertRenter - Error: ${error}`);
            throw error;
        }
    }
    static async getRenters(search?: string): Promise<any[]> {
        try {
            const renterRepository = await AppDataSource.getRepository(Renter);
            const renters = search ? await renterRepository.find({
                where: [
                    {
                        fullName: Like(`%${search}%`)
                    },
                    {
                        identifyCard: Like(`%${search}%`)
                    }
                ]
            }) : await renterRepository.find();
            return renters;
        } catch (error) {
            console.error(`${RenterService.name} - getRenters - Error: ${error}`);
            throw error;
        }
    }
}
import { AppDataSource } from "../database";
import { Area } from "../model/area.entity";
import { Convenient } from "../model/convenient.entity";
import { Role } from "../model/role.entity";
import { RoomType } from "../model/roomType.entity";
import { In } from "typeorm";
import { AccountService } from "./account.service";
import { Account } from "../model/account.entity";

export class InitDefaultDataBase {
    static async initDataTable() {
        console.log(`${InitDefaultDataBase.name} - initDataTable - started`)
        // init the list of role 
        const roleRepository = await AppDataSource.getRepository(Role);
        await roleRepository.save({
            Id: 'LT',
            name: 'Le Tan'
        });
        await roleRepository.save({
            Id: 'QL',
            name: 'Quan Ly'
        });
        await roleRepository.save({
            Id: 'GD',
            name: 'Giam Doc'
        })

        // init the list of area
        const areaRepository = await AppDataSource.getRepository(Area);
        await areaRepository.save({
            Id: 'A',
            name: 'Block A'
        });
        await areaRepository.save({
            Id: 'B',
            name: 'Block B'
        });
        await areaRepository.save({
            Id: 'C',
            name: 'Block C'
        })

        // init the list of convenient
        const convenientRepository = await AppDataSource.getRepository(Convenient);
        if (!(await convenientRepository.findOne({
            where: {
                name: 'fan'
            }
        }))) {
            await convenientRepository.save({
                name: 'fan'
            });
            await convenientRepository.save({
                name: 'tv'
            });
            await convenientRepository.save({
                name: 'air conditioner'
            });
            await convenientRepository.save({
                name: 'fridge'
            });
            await convenientRepository.save({
                name: 'balcony'
            });
            await convenientRepository.save({
                name: 'hot & cold water machine'
            })
        }


        // init the list of roomType
        const roomTypeRepository = await AppDataSource.getRepository(RoomType);
        const typeVip1 = await convenientRepository.findBy({
            name: In(['fan', 'tv'])
        })
        await roomTypeRepository.save({
            Id: 'VP1',
            name: 'VIP 1',
            price: 200000,
            maxUser: 2,
            convenients: typeVip1
        })
        const typeVip2 = await convenientRepository.findBy({
            name: In(['fan', 'tv', 'air conditioner'])
        })
        await roomTypeRepository.save({
            Id: 'VP2',
            name: 'VIP 2',
            price: 400000,
            maxUser: 4,
            convenients: typeVip2
        })
        const typeVip3 = await convenientRepository.find()
        await roomTypeRepository.save({
            Id: 'VP3',
            name: 'VIP 3',
            price: 500000,
            maxUser: 5,
            convenients: typeVip3
        })

        // init QL defaul account
        const accountRepository = await AppDataSource.getRepository(Account);
        if (!(await accountRepository.findOne({
            where: {
                fullName: 'Default Admin',
                phone: '0123456',
            }
        })))
            await AccountService.createAccount({
                fullName: 'Default Admin',
                phone: '0123456',
                password: 'password',
                role: 'QL'
            })

        console.log(`${InitDefaultDataBase.name} - initDataTable - completed`)
    }
}
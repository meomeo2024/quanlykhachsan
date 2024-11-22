import { Account } from "../model/account.entity";
import { AppDataSource } from "../database";
import { encrypt } from "../common/helpers";
import { IAccount, RoleID } from "../interface/account.interface";
import { Role } from "../model/role.entity";
import { Area } from "../model/area.entity";


export class AccountService {

    static async createAccount(payload: any): Promise<{ id: string, token: string }> {
        try {
            console.log(`${AccountService.name} - createAccount - started`);
            const passwordEncrypted = await encrypt.encryptpass(payload?.password);
            const roleRepository = await AppDataSource.getRepository(Role);
            const role = await roleRepository.findOne({
                where: {
                    Id: payload?.role
                }
            });
            const account = new Account();
            account.fullName = payload?.fullName;
            account.phone = payload?.phone;
            account.password = passwordEncrypted;
            account.role = RoleID[role.Id];
            if (role.Id === RoleID.LT) {
                const areaRepository = await AppDataSource.getRepository(Area);
                const area = await areaRepository.find({
                    where: {
                        Id: payload?.areaId
                    }
                });
                account.areas = area;
            }
            const accountRepository = await AppDataSource.getRepository(Account);
            const result = await accountRepository.save(account);
            const token = await encrypt.generateToken({
                id: result.Id
            })
            return {
                id: result.Id,
                token: token
            }
        } catch (error) {
            console.error(`${AccountService.name} - createAccount - Error: ${error}`);
            throw error;
        }
    }

    static async fetchAllAcount(): Promise<IAccount[]> {
        try {
            console.log(`${AccountService.name} - fetchAllAccount - started`);
            const accountRepository = await AppDataSource.getRepository(Account);
            const accounts = await accountRepository.find({
                relations: {
                    areas: true
                }
            });
            return accounts.map(account => {
                return {
                    id: account.Id,
                    fullName: account.fullName,
                    phone: account.phone,
                    role: account?.role ?? '',
                    active: account.active,
                    areas: account?.areas
                } as IAccount
            })
        } catch (error) {
            console.error(`${AccountService.name} - fetchAllAccount - Error: ${error}`);
            throw error;
        }
    }


    static async getAccountDetail(id: string): Promise<IAccount> {
        try {
            console.log(`${AccountService.name} - getAccountDetail - started`);
            const accountRepository = await AppDataSource.getRepository(Account);
            const account = await accountRepository.findOne({
                where: {
                    Id: id
                }
            });
            return {
                id: account.Id,
                fullName: account.fullName,
                phone: account.phone,
                role: account.role
            }
        } catch (error) {
            console.error(`${AccountService.name} - getAccountDetail - Error: ${error}`);
            throw error;
        }
    }

    static async updateAccountStatus(id: string, status: boolean) {
        try {
            console.log(`${AccountService.name} - updateAccountStatus - started`);
            console.log(id, status);
            const accountRepository = await AppDataSource.getRepository(Account);
            const account = await accountRepository.update({
                Id: id
            }, {
                active: status ?? true
            });
            return account;
        } catch (error) {
            console.error(`${AccountService.name} - updateAccountStatus - Error: ${error}`);
            throw error;
        }
    }
}
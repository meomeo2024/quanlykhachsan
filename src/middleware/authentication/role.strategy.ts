import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../database";
import { Account } from "../../model/account.entity";

export const isRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const account = req['user'];
        const accountRepository = await AppDataSource.getRepository(Account);
        const role = (await accountRepository.findOne({
            where: {
                Id: account.Id
            }
        })).role;
        if (roles.includes(role))
            next();
        else {
            res.status(403).json({
                message: `Access denied`
            })
        }
    }
}

export const isLTRoleRoom = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const account = req['user'];
        const roomId = req.params['roomId'];
        // Check area from account & area in the room id
        if (account?.areas[0].Id !== roomId.split('-')[0]) {
            res.status(403).json({
                message: `Access denied`
            })
        }
        else
            next();
    }
}
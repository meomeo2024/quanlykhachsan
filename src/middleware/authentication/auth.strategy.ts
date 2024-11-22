
import * as passportStrategy from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Express, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../database";
import { Account } from "../../model/account.entity";
import { IAccount } from "src/interface/account.interface";
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


export const initPassportStrategy = async (app: Express) => {
    const accountRepository = await AppDataSource.getRepository(Account);
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new passportStrategy.Strategy(
        { usernameField: "phone" }, async (phone, password, done) => {
            try {
                if (!phone) { done(null, false) }
                const account = await accountRepository.findOne({
                    where: {
                        phone: phone
                    }
                })
                if (!account)
                    return done(null, false, { message: "Phone not found" });
                if (account && !account.active)
                    return done(null, false, { message: "Account is inactive" });

                if (account.phone === phone && await bcrypt.compare(password, (account.password).toString())) {
                    return done(null, account);
                } else {
                    return done(null, false, { message: "Password incorrect" });
                }
            } catch (e) {
                return done(e);
            }
        }));

    passport.serializeUser((req: Request, user: IAccount, done) => {
        return done(null, user);
    });


    passport.deserializeUser(async (user: IAccount, done) => {
        const account = await accountRepository.findOne({
            where: {
                phone: user.phone
            }
        });
        return done(null, account);
    });
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req['headers']?.authorization?.split(' ')[1];
        if (!token)
            res.status(401).json({
                message: 'Unauthorized'
            })
        else {
            const { JWT_SECRET = "" } = process.env;
            const verified: any = await verify(token, JWT_SECRET);
            const accountRepository = await AppDataSource.getRepository(Account);
            const account = await accountRepository.findOne({
                where: {
                    Id: verified?.id ?? null
                },
                relations: {
                    areas: true
                }
            })
            if (!account)
                // Account is deleted after login
                res.status(401).json({
                    message: 'Unauthorized'
                })
            else {
                req['user'] = account;
                next();
            }
        }

    } catch (error) {
        console.error(`isAuthenticated - error: ${error}`);
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

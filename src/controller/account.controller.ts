import { Request, Response } from "express";
import { AccountResponseDto } from "../dto/account-response.dto";
import { AccountService } from "../service/account.service";
import { validate } from 'class-validator';
import { AccountSignUpDto } from "../dto/account-signup.dto";
import { plainToClass } from 'class-transformer';
import { encrypt } from "../common/helpers";
import { RoleID } from "../interface/account.interface";


export class AccountController {
    static async signUp(req: Request, res: Response) {
        try {
            console.log(`${AccountController.name} - signUp - started`);
            const requestBody = await req.body;
            // Validate the body
            const errors = await validate(plainToClass(AccountSignUpDto, requestBody));
            if (errors.length > 0) {
                console.error(errors);
                res
                    .status(400)
                    .json({
                        errors: errors?.map((error: any) => ({
                            property: error?.property,
                            value: error?.value,
                            constraints: error?.constraints
                        })) ?? "Missing required parameters"
                    })
            } else {
                const { fullName, phone, password, role, areaId } = req.body;
                if (role === RoleID.LT && !areaId) {
                    res
                        .status(400)
                        .json({
                            errors: "Missing required areaId field"
                        })
                } else {
                    const account = await AccountService.createAccount({ fullName, phone, password, role , areaId});
                    const dataResponse = new AccountResponseDto();
                    dataResponse.fullName = fullName;
                    dataResponse.id = account.id;
                    res
                        .status(201)
                        .json(
                            {
                                message: "User created successfully",
                                token: account.token,
                                ...dataResponse
                            });
                }
            }
        } catch (error) {
            console.error(`${AccountController.name} - signUp - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async getAllAccount(req: Request, res: Response) {
        try {
            console.log(`${AccountController.name} - getAllAccount - started`);
            const accounts = await AccountService.fetchAllAcount();
            res
                .status(200)
                .json(
                    {
                        message: "Get the list account successfully",
                        accounts
                    });
        } catch (error) {
            console.error(`${AccountController.name} - getAllAcount - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async getAccountDetail(req: Request, res: Response) {
        try {
            console.log(`${AccountController.name} - getAccountDetail - started`);
            const accountId = req.params['accountId'];
            const account = await AccountService.getAccountDetail(accountId);
            res
                .status(200)
                .json(
                    {
                        message: "Get the account detail successfully",
                        account
                    });
        } catch (error) {
            console.error(`${AccountController.name} - getAccountDetail - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async signIn(req: Request, res: Response) {
        console.log(`${AccountController.name} - signIn - started`);
        const account = req['user'];
        const token = encrypt.generateToken({
            id: account.Id
        })
        res
            .status(200)
            .json(
                {
                    message: "User logged in successfully",
                    token,
                    name: account?.fullName,
                    role: account?.role
                });
    }

    static async updateAccountStatus(req: Request, res: Response) {
        try {
            console.log(`${AccountController.name} - updateAccountStatus - started`);
            const accountId = req.params['accountId'];
            const status: any = req.query['status'];
            await AccountService.updateAccountStatus(accountId, status);
            res
                .status(200)
                .json(
                    {
                        message: "Updated status of account successfully",
                        status: 'success'
                    });
        } catch (error) {
            console.error(`${AccountController.name} - updateAccountStatus - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error,
                    status: 'fail'
                })
        }
    }
}
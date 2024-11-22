import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { RenterParamDto } from "../dto/renter-param.dto";
import { RenterCreationDto } from "../dto/renter-creation.dto";
import { RenterService } from "../service/renter.service";

export class RenterController {
    static async insertRenter(req: Request, res: Response) {
        try {
            console.log(`${RenterController.name} - insertRenter - started`);
            const body = req.body;
            // Validate the body
            const errors = await validate(plainToClass(RenterCreationDto, body));
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
            }
            const { fullName, identifyCard } = req.body;
            await RenterService.insertRenter({ fullName, identifyCard });
            res.status(201).json({
                message: 'Insert renter successfully'
            })
        } catch (error) {
            console.error(`${RenterController.name} - insertRenter - error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async getRenters(req: Request, res: Response) {
        try {
            console.log(`${RenterController.name} - getRenter - started`);
            const params = await req.query;
            // Validate the params
            const errors = await validate(plainToClass(RenterParamDto, params));
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
            }
            const { search } = req.query;
            const renters = await RenterService.getRenters(search as string)
            res.status(200).json({
                renters,
                message: 'Get the list of renters successfully'
            })
        } catch (error) {
            console.error(`${RenterController.name} - getRenters - error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }
}
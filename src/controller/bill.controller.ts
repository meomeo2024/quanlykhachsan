import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { BillFilterDto } from "../dto/bill-filtering.dto";
import { BillCreationDto } from "../dto/bill-creation.dto";
import { BillService } from "../service/bill.service";

export class BillController {
    static async createBill(req: Request, res: Response) {
        try {
            console.log(`${BillController.name} - createBill - started`);
            const body = req.body;
            const errors = await validate(plainToClass(BillCreationDto, body));
            if (errors && errors.length > 0) {
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
                const { roomId, inDay, outDay, renters, note } = req.body;
                const bill = await BillService.createBill({ roomId, inDay, outDay, renters, note });
                res.status(201).json({
                    message: `Created the bill successfully`,
                    bill
                })
            }
        } catch (error) {
            console.error(`${BillController.name} - createBill - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async getAllBill(req: Request, res: Response) {
        try {
            console.log(`${BillController.name} - getAllBill - started`);
            const query = req.query;
            const errors = await validate(plainToClass(BillFilterDto, query));
            if (errors && errors.length > 0) {
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
                const { filter, month, year, area } = req.query;
                const bills = await BillService.getAllBill({ filter, month, year, area });
                res.status(200).json({
                    message: `Get all bill successfully`,
                    bills
                })
            }

        } catch (error) {
            console.error(`${BillController.name} - getAllBill - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }
}
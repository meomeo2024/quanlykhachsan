import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { RoomCreationDto } from "../dto/room-creation.dto";
import { RoomParamsDto } from "../dto/room-params.dto";
import { RoomService } from "../service/room.service";

export class RoomController {
    static async getRooms(req: Request, res: Response) {
        try {
            console.log(`${RoomController.name} - getRooms - started`);
            const params = await req.query;
            // validate params
            const errors = await validate(plainToClass(RoomParamsDto, params));
            if (errors && errors.length > 0) {
                console.error("error: ", errors);
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
            else {
                const { isAvailable, people, minPrice, maxPrice } = req.query;
                const rooms = await RoomService.getRooms({ isAvailable, people, minPrice, maxPrice });
                res
                    .status(200)
                    .json(
                        {
                            message: 'Get list rooms successfully',
                            rooms
                        }
                    )
            }

        } catch (error) {
            console.error(`${RoomController.name} - getRooms - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async insertRoom(req: Request, res: Response) {
        try {
            console.log(`${RoomController.name} - insertRoom - started`);
            const body = await req.body;
            const errors = await validate(plainToClass(RoomCreationDto, body));
            if (errors && errors.length > 0) {
                console.error("error: ", errors);
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
                const { area, typeRoom, room } = req.body;
                await RoomService.insertRoom({ area, typeRoom, room });
                res
                    .status(201)
                    .json(
                        {
                            message: 'Insert the room successfully'
                        }
                    )
            }
        } catch (error) {
            console.error(`${RoomController.name} - insertRoom - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async getRoomDetail(req: Request, res: Response) {
        try {
            console.log(`${RoomController.name} - getRoomDetail - started`);
            const roomId: string = req.params['roomId'];
            if (!roomId) {
                res
                    .status(400)
                    .json({
                        errors: "Missing the room id"
                    })
            } else {
                const room = await RoomService.getRoomDetail(roomId);
                res.status(200).json({
                    message: `Get the room detail successfully`,
                    room
                })
            }
        } catch (error) {
            console.error(`${RoomController.name} - getRoomDetail - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async getRoomType(req: Request, res: Response) {
        try {
            console.log(`${RoomController.name} - getRoomType - started`);
            const roomType = await RoomService.getRoomType();
            res.status(200).json({
                message: `Get the room detail successfully`,
                roomType
            })
        } catch (error) {
            console.error(`${RoomController.name} - getRoomType - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }

    static async changeRoomStatus(req: Request, res: Response){
        try {
            console.log(`${RoomController.name} - changeRoomStatus - started`);
            const roomId = req.params['roomId'];
            const status: any = req.query['status'] ?? false;
            await RoomService.changeRoomStatus(roomId, status);
            res.status(200).json({
                message: `Change the status of room successfully`,
                status: true
            })
        } catch (error) {
            console.error(`${RoomController.name} - changeRoomStatus - Error: ${error}`);
            res
                .status(500)
                .json({
                    message: error
                })
        }
    }
}
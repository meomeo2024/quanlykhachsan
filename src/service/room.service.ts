import { IRoom } from "../interface/room.interface";
import { AppDataSource } from "../database";
import { Room } from "../model/room.entity";
import { Area } from "../model/area.entity";
import { RoomType } from "../model/roomType.entity";
import { Between, In, LessThan, Not } from "typeorm";
import { Convenient } from "../model/convenient.entity";
export class RoomService {
    static async getRooms(params: any): Promise<IRoom[]> {
        try {
            console.log(`${RoomService.name} - getRooms - started`);
            const roomRepository = await AppDataSource.getRepository(Room);
            const areaRepository = await AppDataSource.getRepository(Area);
            const roomTypeRepository = await AppDataSource.getRepository(RoomType);
            let option = {};
            if (params?.isAvailable)
                option['isAvailable'] = params?.isAvailable;
            if ((params?.minPrice && params?.maxPrice) || params?.people) {
                const typeIds = await roomTypeRepository.findBy(
                    {
                        ...(params?.maxPrice && params?.minPrice) ? {
                            price: Between(Number(params.minPrice), Number(params.maxPrice))
                        } : {},
                        ... (params?.people) ? {
                            maxUser: Not(LessThan(Number(params.people)))
                        } : {}
                    });
                option = {
                    ...option,
                    typeId: In(typeIds.map(i => i.Id))
                }
            }

            const rooms = await roomRepository.findBy(option);
            const roomsPM = rooms.map(async i => {
                return {
                    id: i.Id,
                    isAvailable: i.isAvailable,
                    area: (await areaRepository.findOne({
                        where: {
                            Id: i.areaId
                        }
                    }))?.name,
                    roomType: (await roomTypeRepository.findOne({
                        where: {
                            Id: i.typeId
                        }
                    }))
                } as IRoom
            })
            return Promise.all(roomsPM);
        } catch (error) {
            console.error(`${RoomService.name} - getRooms - Error: ${error}`);
            throw error;
        }
    }

    static async insertRoom(payload: any): Promise<boolean> {
        try {
            console.log(`${RoomService.name} - insertRoom - started`);
            const areaRepository = await AppDataSource.getRepository(Area);
            const roomTypeRepository = await AppDataSource.getRepository(RoomType);
            const roomRepository = await AppDataSource.getRepository(Room);
            const room_ = `${payload.area}-${payload.room}`;
            if (!await roomRepository.findOne({ where: { room: room_ } })) {
                const area = await areaRepository.findOne({
                    where: {
                        Id: payload?.area
                    }
                });
                const roomType = await roomTypeRepository.findOne({
                    where: {
                        Id: payload?.typeRoom
                    }
                });

                const room = new Room();
                room.Id = `${payload.area}-${payload.typeRoom}-${payload.room}`;
                room.room = `${payload.area}-${payload.room}`;
                room.area = area;
                room.type = roomType;
                room.isAvailable = true;
                await roomRepository.save(room);
            }
            return true;

        } catch (error) {
            console.error(`${RoomService.name} - insertRoom - Error: ${error}`);
            throw error;
        }
    }

    static async getRoomDetail(id: string) {
        try {
            console.log(`${RoomService.name} - getRoomDetail - started`);
            const roomRepository = await AppDataSource.getRepository(Room);
            const room = await roomRepository.findOne({
                where: {
                    Id: id
                },
                relations: {
                    area: true
                },
                relationLoadStrategy: 'join'
            });
            const roomTypeRepository = await AppDataSource.getRepository(RoomType);
            return room ? {
                id: room.Id,
                isAvailable: room.isAvailable,
                area: room.area,
                roomType:
                    (await roomTypeRepository.findOne({
                        where: {
                            Id: room.typeId
                        },
                        relations: {
                            convenients: true
                        }
                    }))
            } : {};
        } catch (error) {
            console.error(`${RoomService.name} - getRoomDetail - Error: ${error}`);
            throw error;
        }
    }

    static async getRoomType() {
        try {
            console.log(`${RoomService.name} - getRoomType - started`);
            const roomTypeRepository = await AppDataSource.getRepository(RoomType);
            const roomType = await roomTypeRepository.find({
                relations: {
                    convenients: true
                }
            });
            return roomType;
        } catch (error) {
            console.error(`${RoomService.name} - getRoomType - Error: ${error}`);
            throw error;
        }
    }

    static async changeRoomStatus(roomId: string, status?: boolean) {
        try {
            console.log(`${RoomService.name} - changeRoomStatus - started`);
            const roomRepository = await AppDataSource.getRepository(Room);
            await roomRepository.update({
                Id: roomId
            }, {
                isAvailable: status ?? false
            })
        } catch (error) {
            console.error(`${RoomService.name} - changeRoomStatus - Error: ${error}`);
            throw error;
        }
    }
}
import { Account } from "../model/account.entity";
import { Area } from "../model/area.entity";
import { Bill } from "../model/bill.entity";
import { Convenient } from "../model/convenient.entity";
import { Renter } from "../model/renter.entity";
import { Role } from "../model/role.entity";
import { Room } from "../model/room.entity";
import { RoomType } from "../model/roomType.entity";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const { SQL_HOST, SQL_PORT, SQL_USER_NAME, SQL_PASSWORD, SQL_DATABASE } = process.env;
export const AppDataSource = new DataSource({
  type: "mysql", // "mssql"
  host: `${SQL_HOST}`,
  port: Number(SQL_PORT),
  username: SQL_USER_NAME,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
  // synchronize: true,
  //logging logs sql command on the treminal
  logging: false,
  entities: [Account, Area, Bill, Convenient, Renter, Role, Room, RoomType],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  // connectionTimeout: 100000
});
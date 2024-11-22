import * as express from "express";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";
import { RoomController } from "../controller/room.controller";
import { isLTRoleRoom, isRole } from "../middleware/authentication/role.strategy";
import { RoleID } from "../interface/account.interface";

const Router = express.Router();

/**
 * @swagger
 * /api/room:
 *   get:
 *     summary: Get list of room.
 *     description: Get list of room on all block.
 *     tags:
 *         - Room
 *     responses:
 *       200:
 *         description: Get the list successfully.
 *       500:
 *         description: Error internal server.
 */
Router.get(
    "",
    isAuthenticated
    ,
    RoomController.getRooms
)

/**
 * @swagger
 * /api/room-type:
 *   get:
 *     summary: Get list type of room.
 *     description: Get list type of room.
 *     tags:
 *         - Room
 *     responses:
 *       200:
 *         description: Get the list type of room successfully.
 *       500:
 *         description: Error internal server.
 */
Router.get(
    "/room-type",
    isAuthenticated
    ,
    RoomController.getRoomType
)

/**
 * @swagger
 * /api/room/{roomId}:
 *   get:
 *     summary: Get detail of room.
 *     description: Get detail of room.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of room.
 *         schema:
 *           type: string
 *     tags:
 *         - Room
 *     responses:
 *       200:
 *         description: Get detail of room successfully.
 *       500:
 *         description: Error internal server.
 */
Router.get(
    "/:roomId",
    isAuthenticated,
    isLTRoleRoom(),
    RoomController.getRoomDetail
)

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Insert new room.
 *     description: Insert new room.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - area
 *               - typeRoom
 *               - room
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of area.
 *               typeRoom:
 *                 type: string
 *                 description: ID of room type.
 *               room:
 *                 type: string
 *                 description: Number room.
 *     tags:
 *         - Room
 *     responses:
 *       200:
 *         description: Insert new room successfully.
 *       500:
 *         description: Error internal server.
 */
Router.post(
    "",
    isAuthenticated,
    isRole([RoleID.QL, RoleID.GD]),
    RoomController.insertRoom
)

/**
 * @swagger
 * /api/room/{roomId}/status:
 *   patch:
 *     summary: Change the status of room.
 *     description: Change the status of room.
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: Id of room.
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: true
 *         description: status of room.
 *         schema:
 *           type: boolean
 *     tags:
 *         - Room
 *     responses:
 *       200:
 *         description: Change the status of room successfully.
 *       500:
 *         description: Error internal server.
 */
Router.patch(
    "/:roomId/status",
    isAuthenticated,
    RoomController.changeRoomStatus
)



export { Router as roomRouter };
import * as express from "express";
import { BillController } from "../controller/bill.controller";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";

const Router = express.Router();

/**
 * @swagger
 * /api/bill:
 *   post:
 *     summary: Create a new bill.
 *     description: Create a new bill.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - inDay
 *               - outDay
 *               - renter
 *               - note
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: ID of room.
 *               inDay:
 *                 type: string
 *                 description: date check in.
 *               outDay:
 *                 type: string
 *                 description: day check out.
 *               renter:
 *                 type: string[]
 *                 description: list id of renters.
 *               note:
 *                 type: string
 *                 description: note for the bill.
 *     tags:
 *         - Bill
 *     responses:
 *       200:
 *         description: Created new room successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Error internal server.
 */
Router.post(
    "",
    isAuthenticated,
    BillController.createBill
)


/**
 * @swagger
 * /api/bill:
 *   get:
 *     summary: Get list of bill.
 *     description: Get list of bill.
 *     parameters:
 *         - in: query
 *           name: filter
 *           required: false
 *           description: bill statistics
 *           schema:
 *              type: string
 *              enum:
 *                 - Month
 *                 - Year
 *         - in: query
 *           name: month
 *           required: false
 *           description: month
 *           schema:
 *              type: string
 *         - in: query
 *           name: year
 *           required: false
 *           description: year
 *           schema:
 *              type: string
 *         - in: query
 *           name: area
 *           required: false
 *           description: area
 *           schema:
 *              type: string
 *              enum:
 *                 - A
 *                 - B
 *                 - C
 *     tags:
 *         - Bill
 *     responses:
 *       200:
 *         description: Get the list of bill successfully.
 *       401:
 *         description: Unauthorized.
 */
Router.get(
    "",
    isAuthenticated,
    BillController.getAllBill
)

export { Router as billRouter };

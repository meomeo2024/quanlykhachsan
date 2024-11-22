import express from "express";
import { RenterController } from "../controller/renter.controller";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";

const Router = express.Router();

/**
 * @swagger
 * /api/renter:
 *   get:
 *     summary: Get list of renter.
 *     description: Get list of renter.
 *     tags:
 *         - Renter
 *     responses:
 *       200:
 *         description: Get the list of renter successfully.
 *       401:
 *         description: Unauthorized.
 */
Router.get("", isAuthenticated, RenterController.getRenters);

/**
 * @swagger
 * /api/renter:
 *   post:
 *     summary: Create a new renter.
 *     description: Create a new renter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - identifyCard
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: full name of a renter.
 *               indentifyCard:
 *                 type: string
 *                 description: the number indentify card of renter.
 *     tags:
 *         - Renter
 *     responses:
 *       201:
 *         description: Created a new renter successfully.
 *       401:
 *         description: Unauthorized.
 */
Router.post("", isAuthenticated, RenterController.insertRenter);

export { Router as renterRouter };
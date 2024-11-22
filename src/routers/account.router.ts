import * as express from "express";
import { AccountController } from "../controller/account.controller";
import passport from "passport";
import { isAuthenticated } from "../middleware/authentication/auth.strategy";
import { isRole } from "../middleware/authentication/role.strategy";
import { RoleID } from "../interface/account.interface";
import { isOwner } from "../middleware/interceptor/isOwner.interceptor";

const Router = express.Router();

/**
 * @swagger
 * /api/account/sign-in:
 *   post:
 *     summary: Log In.
 *     description: Log in to system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 description: phone of account.
 *               password:
 *                 type: string
 *                 description: password of account.
 *     tags:
 *         - Auth
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *       401:
 *         description: Password incorrect.
 */
Router.post(
  "/sign-in", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user)
        res.status(400).json({
          message: info.message
        })
      else {
        req['user']= user;
        next();
      }
    })(req, res, next)
  },
  AccountController.signIn
)

/**
 * @swagger
 * /api/account/sign-up:
 *   post:
 *     summary: Register account.
 *     description: Register account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - password
 *               - role
 *               - areaId
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: full name of account.
 *               phone:
 *                 type: string
 *                 description: phone of account.
 *               password:
 *                 type: string
 *                 description: password of account.
 *               role:
 *                 type: string
 *                 description: role of account.
 *               areaId:
 *                 type: string
 *                 description: id of area (required if LT account).
 *     tags:
 *         - Auth
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *       401:
 *         description: Unauthorized.
 */
Router.post(
  "/sign-up",
  isAuthenticated,
  isRole([RoleID.GD, RoleID.QL]),
  AccountController.signUp
);

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Get list of account.
 *     description: Get list of account.
 *     tags:
 *         - Account
 *     responses:
 *       200:
 *         description: Get the list of account successfully.
 *       401:
 *         description: Unauthorized.
 */
Router.get(
  "",
  isAuthenticated,
  isRole([RoleID.GD, RoleID.QL]),
  AccountController.getAllAccount
)

/**
 * @swagger
 * /api/account/{accountId}:
 *   get:
 *     summary: Get detail of account.
 *     description: Get detail of account.
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID of account.
 *         schema:
 *           type: string
 *     tags:
 *         - Account
 *     responses:
 *       200:
 *         description: Get detail of account successfully.
 *       401:
 *         description: Unauthorized.
 */
Router.get(
  "/:accountId",
  isAuthenticated,
  isOwner,
  AccountController.getAccountDetail
)

/**
 * @swagger
 * /api/account/{accountId}/status:
 *   patch:
 *     summary: Change the status of account.
 *     description: Change the status of account.
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: Id of account.
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         required: true
 *         description: status of account.
 *         schema:
 *           type: boolean
 *     tags:
 *         - Account
 *     responses:
 *       200:
 *         description: Change the status of account successfully.
 *       401:
 *         description: Unauthorized.
 */
Router.patch(
  "/:accountId/status",
  isAuthenticated,
  isRole([RoleID.QL, RoleID.GD]),
  AccountController.updateAccountStatus
)

export { Router as accountRouter };
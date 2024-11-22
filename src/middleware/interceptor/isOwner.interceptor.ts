import { Request, Response, NextFunction } from "express";

export const isOwner = (req: Request, res: Response, next: NextFunction) => {
    const account = req['user'];
    const accountId = req.params['accountId'];
    if (account.Id !== accountId) {
        res.status(403).json({
            message: `Access denied`
        })
    } else
        next();
}
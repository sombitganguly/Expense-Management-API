import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const path = (errors.array()[0] as {path?: string}).path || "unknown"
        res.status(400).json({
            message: `${errors.array()[0].msg} in field ${path}`,
        });

        return;
    }

    next();
}
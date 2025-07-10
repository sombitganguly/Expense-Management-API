import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import logger from "../config/logger";

const errorHandler : ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(err)
    console.log(err)
    const status = err.status || 500
    const message = err.message || "Internal server error"
    res.status(status).json({
        message: `${message}`
    })
}

export default errorHandler
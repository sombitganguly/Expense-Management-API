import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtsecret = `Z1uY1qxWfP4t7cD9vJrLmNzx3TsQ8AeKyB6g5oMbRiUdH0VwX2qZsCnEtGJhLpKa`

export const verificationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const token : string = req.query.token as string
        console.log(token)
        const payload = jwt.verify(token, jwtsecret) as jwt.JwtPayload
        console.log(payload)
        const { id } = payload
        res.locals.id = id
        next()
    }
    catch(err){
        console.log(err)
    }
}
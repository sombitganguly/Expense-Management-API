import { Request, Response } from "express";
import User from "../models/users";
import logger from "../config/logger";
import emailServices from '../services/email'

export const sendLink = async (req: Request, res: Response) => {
    try{
        const { userId } = req.body
        const user = await User.findById(userId)
        
        if(!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        await emailServices.sendVerificationEmail({
            id: userId.toString(), 
            role: user.role, 
            email: user.email
        })

        res.json({
            message: "Verification link sent"
        })

    }
    catch(err){
        logger.error(err)
        res.status(500).json({
            message: "Failed to send link"
        })
    }
}
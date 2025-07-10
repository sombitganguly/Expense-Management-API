import { NextFunction, Request, Response } from "express";
import User from "../models/users";
import emailServices from '../services/email'

export const sendLink = async (req: Request, res: Response, next: NextFunction) => {
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
        next(err)
    }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = res.locals
        const user = await User.findById(id)
        console.log(id)
        if(!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }
        user.isEmailVerified = true
        await user.save()

        res.status(200).json({
            message:"User has been verified successfully"
        })
    }
    catch(err){
        next(err)
    }
}
import { NextFunction, Request, Response } from 'express';
import authServices from '../services/auth';

export const registerUser = async (req : Request, res : Response, next: NextFunction) => {
    try{
        const { username, email, password } = req.body
    
        const { user, accessToken, refreshToken } = await authServices.register({
            username,
            email,
            password
        })
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            accessToken
        })

    }
    catch(err){
        next(err)
    }
};

export const loginUser = async (req : Request, res : Response, next: NextFunction) => {
    try{
        const { email, password } = req.body
    
        const response = await authServices.login({
            email,
            password
        })

        const { user, accessToken, refreshToken } = response;
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            accessToken
        })

    }
    catch(err){
        next(err)
    }
};

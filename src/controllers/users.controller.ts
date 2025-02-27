import User from "../models/users.model";
import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express';

interface RegisterRequestBody {
    username: string,
    email: string,
    password: string
}

export const registerUser = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    try{

        const { username, email, password } = req.body;

        const existingUser = await User.findOne( {email} );

        if(existingUser){
            res.status(409).json({
                message: "Account with this email already exists. Please log in."
            });

            return;
        }

        const takenUsername = await User.findOne( {username} );
        
        if(takenUsername){
            res.status(400).json({
                message: "Username taken."
            });

            return;
        }

        const salt: string = await bcryptjs.genSalt(10);
        const hashedPassword: string = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        
        res.status(201).json({
            message: "User created successfully."
        });
    }
    catch(err: unknown){
        console.log(err);
        res.status(500).json({
            message: "Internal server error."
        })
    }
};
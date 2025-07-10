import User from "../models/users"
import bcryptjs from 'bcryptjs'
import token from './token'
import Token from "../models/tokens"

export class RegisterError extends Error {

    public status : number

    constructor(message : string, status : number) {
        super(message)
        this.status = status
    }
}

interface credentials {
    username: string,
    email: string,
    password: string
}

interface loginCredentials {
    email: string,
    password: string
}

const register = async ( {username, email, password }: credentials ) => {
    const existingEmail = await User.findOne({email})
    if (existingEmail) {
        throw new RegisterError("Email already in use", 409)
    }

    const existingUsername = await User.findOne({username})
    if (existingUsername) {
        throw new RegisterError("Username taken", 409)
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = new User ({
        username,
        email,
        password: hashedPassword
    })

    const user = await newUser.save()
    console.log(typeof(user._id))
    
    const refreshToken = token.generateRefreshToken({
        id: user._id.toString(), 
        role: user.role
    })

    const newToken = new Token({
        refreshToken,
        userId: user._id
    })

    await newToken.save()

    const accessToken = token.generateAccessToken({
        id: user._id.toString(), 
        role: user.role
    })

    return {
        user,
        refreshToken,
        accessToken
    }
}

const login = async ( {email, password }: loginCredentials ) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new RegisterError("User not found", 404)
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
        throw new RegisterError("Invalid password", 401)
    }

    const refreshToken = token.generateRefreshToken({
        id: user._id.toString(), 
        role: user.role
    })

    const newToken = new Token({
        refreshToken,
        userId: user._id
    })

    await newToken.save()

    const accessToken = token.generateAccessToken({
        id: user._id.toString(), 
        role: user.role
    })

    return {
        user,
        refreshToken,
        accessToken
    }
}

export default { register, login }
import jwt from 'jsonwebtoken'

const jwtsecret = `Z1uY1qxWfP4t7cD9vJrLmNzx3TsQ8AeKyB6g5oMbRiUdH0VwX2qZsCnEtGJhLpKa`

interface Payload {
    id: string,
    role: string
}

const generateRefreshToken = ({id, role} : Payload) => {
    const refreshToken = jwt.sign({
        id,
        role
    },
    jwtsecret,
    {
        expiresIn: '30d'
    })

    return refreshToken
}

const generateAccessToken = ({id, role} : Payload) => {
    const accessToken = jwt.sign({
        id,
        role
    },
    jwtsecret,
    {
        expiresIn: '30m'
    })

    return accessToken
}

const generateVerificationToken = ({id, role} : Payload) => {
    const verificationToken = jwt.sign({
        id,
        role
    },
    jwtsecret,
    {
        expiresIn: "10m"
    })

    return verificationToken
}

export default { generateRefreshToken, generateAccessToken, generateVerificationToken }
import jwt from 'jsonwebtoken'

const jwtsecret = `Z1uY1qxWfP4t7cD9vJrLmNzx3TsQ8AeKyB6g5oMbRiUdH0VwX2qZsCnEtGJhLpKa`

interface Payload {
    id: string,
    role: string
}

const generateRefreshToken = ({id, role} : Payload) => {
    const token = jwt.sign({
        id,
        role
    },
    jwtsecret,
    {
        expiresIn: '30d'
    })

    return token
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

export default { generateRefreshToken, generateAccessToken }
import nodemailer from 'nodemailer'
import tokenServices from './token'
import logger from '../config/logger';

interface UserDetails {
    id: string,
    email: string,
    role: string
}

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'karina.robel@ethereal.email',
        pass: 'FSqrWvu5bxs79Mgmfn'
    }
});

const sendVerificationEmail = async ({id, role, email} : UserDetails) => {
    try{

        console.log(email)
        const token : string = tokenServices.generateVerificationToken({id, role})
        const verificationLink : string = `http://localhost:3000/verify-email?token=${token}`

        const info = await transporter.sendMail({
            from: '"Karina Robel" <karina.robel@ethereal.email>',
            to: email,
            subject: "Hello",
            html: `<p>Click <a href = "${verificationLink}">here</a> to verify your account.</p>`
        })

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    }
    catch(err) {
        logger.error(err)
        console.log(err)
    }
}

export default { sendVerificationEmail }
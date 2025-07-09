import { Router } from "express";
import { sendLink, verifyEmail } from "../controllers/email";
import { verificationMiddleware } from "../middlewares/verify";

const emailRouter = Router();

emailRouter.post('/send-link', sendLink)
emailRouter.get('/verify-email', verificationMiddleware, verifyEmail)

export default emailRouter
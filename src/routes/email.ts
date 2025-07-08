import { Router } from "express";
import { sendLink } from "../controllers/email";

const emailRouter = Router();

emailRouter.post('/send-link', sendLink)

export default emailRouter
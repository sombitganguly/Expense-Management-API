import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";
import { body } from "express-validator";
import { validationMiddleware } from "../middlewares/validator";

const authRouter = Router();

authRouter.post('/register', [
    body("username").trim().notEmpty().isString().withMessage("Provide a valid username"),
    body("email").trim().notEmpty().isEmail().withMessage("Provide a valid email id"),
    body("password")
        .trim()
        .notEmpty().withMessage("Provide a password")
        .isLength( { min: 8 }).withMessage("Password must be 8 characters long"),
    validationMiddleware
], registerUser);

authRouter.post('/login', [
    body("email").trim().notEmpty().isEmail().withMessage("Provide a valid email id"),
    body("password")
        .trim()
        .notEmpty().withMessage("Provide a password")
        .isLength( { min: 8 }).withMessage("Password must be 8 characters long"),
    validationMiddleware
], loginUser);

export default authRouter;
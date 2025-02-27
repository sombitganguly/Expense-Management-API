import { Router } from "express";
import { registerUser } from "../controllers/users.controller";
import { body } from "express-validator";

const usersRouter = Router();

usersRouter.post('/register', [
    body("username").notEmpty().isString().withMessage("Provide a valid username"),
    body("email").notEmpty().isEmail().withMessage("Provide a valid email id"),
    body("password")
        .notEmpty().withMessage("Provide a password")
        .isLength( { min: 8 }).withMessage("Password must be 8 characters long")
], registerUser);

export default usersRouter;
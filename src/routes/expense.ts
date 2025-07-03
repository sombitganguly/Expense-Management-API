import {Router} from "express";
import { body } from "express-validator";
import { validationMiddleware } from "../middlewares/validator";
import { handlePersonalExpense } from "../controllers/expense";

const router = Router();

router.post('/add', [
    body("amount").trim().notEmpty().isFloat().withMessage("Provide a valid amount"),
    body("description").trim().notEmpty().isString().withMessage("Provide a valid description"),
    body("payerId").trim().notEmpty().isMongoId().withMessage("Provide a valid payer id"),
    body("otherId").trim().notEmpty().isMongoId().withMessage("Provide a valid other id"),
    validationMiddleware
], handlePersonalExpense)

export default router;

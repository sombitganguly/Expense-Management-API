import { NextFunction, Request, Response } from "express";
import expenseServices from "../services/expense";
import logger from "../config/logger";

export const handlePersonalExpense = async(req : Request, res : Response, next: NextFunction) => {
    try {
        const { amount, description, payerId, otherId } = req.body

        if(amount < 0) {
            res.status(400).json({
                message: "Amount cannot be negative"
            })
            return
        }

        const response = await expenseServices.createPersonalExpense({
            amount,
            payerId,
            otherId
        })

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}
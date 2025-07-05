import { Request, Response } from "express";
import expenseServices from "../services/expense";
import logger from "../config/logger";

export const handlePersonalExpense = async(req : Request, res : Response) => {
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
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
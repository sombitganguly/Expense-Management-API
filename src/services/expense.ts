import PersonalDebt from "../models/personalDebts"
import { Types } from "mongoose"

interface expense {
    payerId: string,
    otherId: string,
    amount: number,
}

const createPersonalExpense = async ({payerId, otherId, amount} : expense) => {
    try {
        const splitAmount = amount / 2

        const existing = await PersonalDebt.findOne({
            $or: [
                {creditorId: new Types.ObjectId(payerId), debitorId: new Types.ObjectId(otherId)},
                {creditorId: new Types.ObjectId(otherId), debitorId: new Types.ObjectId(payerId)}
            ]
        })

        if(!existing) {
            const newPersonalDebt = new PersonalDebt({
                creditorId: new Types.ObjectId(payerId),
                debitorId: new Types.ObjectId(otherId),
                amount: splitAmount
            })

            await newPersonalDebt.save()
            return {
                status: "created",
                message: "Personal debt created successfully"
            }
        }
        else {
            existing.amount = 
                existing.creditorId.toString() === payerId 
                  ? existing.amount + splitAmount
                  : existing.amount - splitAmount;

            if(existing.amount < 0) {
                existing.creditorId = new Types.ObjectId(otherId);
                existing.debitorId = new Types.ObjectId(payerId);
                existing.amount = Math.abs(existing.amount);
                await existing.save()
                return {
                    status: "flipped",
                    message: "Roles flipped and debt updated successfully"
                }
            }

            else if(existing.amount === 0) {
                await existing.deleteOne()
                return {
                    status: "settled",
                    message: "Personal debt settled successfully"
                }
            }

            else {
                await existing.save()
                return {
                    status: "updated",
                    message: "Personal debt updated successfully"
                }
            }
        }
    } catch (error) {
        console.log(error)
    }    
}

export default { createPersonalExpense }
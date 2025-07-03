import { Schema, model } from "mongoose";
import User from "./users";

const personalDebtSchema = new Schema({
    creditorId: {
        ref: User,
        type: Schema.Types.ObjectId,
        required: true
    },
    debitorId: {
        ref: User,
        type: Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

personalDebtSchema.index({ creditorId: 1, debitorId: 1 })

const PersonalDebt = model('PersonalDebt', personalDebtSchema)
export default PersonalDebt

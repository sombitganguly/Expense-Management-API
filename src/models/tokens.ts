import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamps: true
}
)

const Token = model('Token', tokenSchema)
export default Token
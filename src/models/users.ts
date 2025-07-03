import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type: String,
        enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        default: 'USER'
    },
    profile_pic: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'BANNED', 'DEACTIVATED'],
        default: 'ACTIVE'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
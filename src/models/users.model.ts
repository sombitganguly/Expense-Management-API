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
        type: Number,
        unique: true
    },
    role: {
        type: String,
        enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
        default: 'USER'
    },
    profile_pic: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'BANNED', 'DEACTIVATED'],
        default: 'ACTIVE'
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
        default: new Date()
    },
    otp: {
        code: {
            type: String
        },
        expires_at: {
            type: Date
        },
        no_of_attempts: {
            type: Number,
            default: 0
        },
        next_attempt: {
            type: Date
        }
    },
    email_verification: {
        code: {
            type: String
        },
        expires_at: {
            type: Date
        }
    },
    refresh_tokens: {
        type: [String]
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
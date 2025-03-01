import { Schema, model } from 'mongoose';
import { IUser } from './users.interface';
// import bcrypt from "bcrypt";

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    photoURL: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "admin"],

        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// UserSchema.pre('save', async function (next) {
//     const user = this;
//     user.password = await bcrypt.hash(
//         user.password,
//         Number(config.bcrypt_salt_rounds),

//     )
//     next();
// });
// UserSchema.post('save', function (doc, next) {
//     doc.password = ''
//     next();
// });

export const userModel = model<IUser>("User", UserSchema);